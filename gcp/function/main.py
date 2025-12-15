import json
import os
import functions_framework
from flask import Request

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

# ======================
# In-memory counter (resets on cold start)
# ======================
counter = {"count": 0}

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
    return json_response(request, 200, {"count": counter["count"]})

def increment(request: Request):
    counter["count"] += 1
    return json_response(request, 200, {"count": counter["count"]})

# ======================
# HTTP Entry Point
# ======================
@functions_framework.http
def hello_http(request: Request):
    """HTTP Cloud Function with in-memory counter.
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
