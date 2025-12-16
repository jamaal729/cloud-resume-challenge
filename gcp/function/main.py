import json
import os
import functions_framework
from flask import Request
from google.cloud import firestore

# ======================
# Config (via ENV)
# ======================
# CORS:
# - If CORS_ALLOWED_ORIGINS="*"  -> always "*"
# - If CORS_ALLOWED_ORIGINS="https://a.com,https://b.com" -> reflect the request's Origin when it matches
CORS_ALLOWED_ORIGINS = os.environ.get("CORS_ALLOWED_ORIGINS", "*").strip()
CORS_ALLOW_HEADERS = os.environ.get("CORS_ALLOW_HEADERS", "Content-Type,Authorization")
CORS_ALLOW_METHODS = os.environ.get("CORS_ALLOW_METHODS", "GET,POST,OPTIONS")
CORS_MAX_AGE = os.environ.get("CORS_MAX_AGE", "3600")

FIRESTORE_COLLECTION = os.environ.get("FIRESTORE_COLLECTION", "counter")
FIRESTORE_DOC_ID = os.environ.get("COUNTER_DOC_ID", "global")

# ======================
# Firestore client (singleton)
# ======================
firestore_client = None

def get_firestore():
    global firestore_client
    if firestore_client is None:
        firestore_client = firestore.Client()
    return firestore_client

# ======================
# Helpers
# ======================
def allowed_origin_for(request_origin):
    if CORS_ALLOWED_ORIGINS == "*":
        return "*"
    
    allowed = [o.strip() for o in CORS_ALLOWED_ORIGINS.split(",") if o.strip()]
    if request_origin and request_origin in allowed:
        return request_origin
    return None

def cors_headers(request: Request):
    origin = request.headers.get("Origin")
    ao = allowed_origin_for(origin)
    
    headers = {
        "Access-Control-Allow-Methods": CORS_ALLOW_METHODS,
        "Access-Control-Allow-Headers": CORS_ALLOW_HEADERS,
        "Access-Control-Max-Age": CORS_MAX_AGE
    }
    
    if ao:
        headers["Access-Control-Allow-Origin"] = ao
        if ao != "*":
            headers["Vary"] = "Origin"
    
    return headers

def json_response(request: Request, status, body_dict):
    headers = {"Content-Type": "application/json"}
    headers.update(cors_headers(request))
    return (json.dumps(body_dict), status, headers)

def no_content_response(request: Request):
    return ("", 204, cors_headers(request))

def get_count(request: Request):
    db = get_firestore()
    doc_ref = db.collection(FIRESTORE_COLLECTION).document(FIRESTORE_DOC_ID)
    doc = doc_ref.get()
    count = 0
    if doc.exists:
        count = int(doc.to_dict().get("count", 0))
    return json_response(request, 200, {"count": count})

def increment(request: Request):
    db = get_firestore()
    doc_ref = db.collection(FIRESTORE_COLLECTION).document(FIRESTORE_DOC_ID)
    
    @firestore.transactional
    def txn_incr(transaction):
        snapshot = doc_ref.get(transaction=transaction)
        current = snapshot.to_dict().get("count", 0) if snapshot.exists else 0
        new_count = int(current) + 1
        transaction.set(doc_ref, {"count": new_count})
        return new_count
    
    transaction = db.transaction()
    count = txn_incr(transaction)
    return json_response(request, 200, {"count": count})

# ======================
# HTTP Entry Point
# ======================
@functions_framework.http
def hello_http(request: Request):
    """HTTP Cloud Function with Firestore counter.
    Args:
        request (flask.Request): The request object.
    Returns:
        The response tuple (body, status, headers)
    """
    # Handle CORS preflight early
    if request.method == "OPTIONS":
        return no_content_response(request)
    
    if request.method == "GET":
        return get_count(request)
    elif request.method == "POST":
        return increment(request)
    else:
        return json_response(request, 405, {"error": "Method Not Allowed"})
