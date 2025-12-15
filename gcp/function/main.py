import functions_framework
import os
import json
from flask import Request

@functions_framework.http
def hello_http(request: Request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
    """
    name = request.args.get("name", "world")
    greeting = os.environ.get("GREETING", "Hello")
    
    return (
        json.dumps({"message": f"{greeting}, {name}!"}),
        200,
        {"Content-Type": "application/json"}
    )