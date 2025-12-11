import json
import os
import azure.functions as func
from azure.cosmos import CosmosClient, PartitionKey, exceptions

cosmos_client = None
container = None

def get_cosmos():
    global cosmos_client, container
    
    if container is None:
        url = os.getenv("COSMOS_ENDPOINT")
        key = os.getenv("COSMOS_KEY")
        database_name = os.getenv("COSMOS_DB_NAME")
        container_name = os.getenv("COSMOS_CONTAINER")

        cosmos_client = CosmosClient(url, credential=key)
        db = cosmos_client.get_database_client(database_name)
        container = db.get_container_client(container_name)

    return container


def get_pk_value():
    return os.getenv("COUNTER_PK", "global")


def response(status, body):
    return func.HttpResponse(
        json.dumps(body),
        status_code=status,
        mimetype="application/json"
    )


def get_count():
    c = get_cosmos()
    pk = get_pk_value()

    try:
        item = c.read_item(item=pk, partition_key=pk)
        count = int(item.get("count", 0))
    except exceptions.CosmosResourceNotFoundError:
        count = 0

    return response(200, {"count": count})


def increment():
    c = get_cosmos()
    pk = get_pk_value()

    try:
        item = c.read_item(item=pk, partition_key=pk)
        count = int(item.get("count", 0)) + 1
        item["count"] = count
        c.replace_item(item=pk, body=item)
    except exceptions.CosmosResourceNotFoundError:
        # Create the counter if missing
        count = 1
        c.create_item({"id": pk, "pk": pk, "count": count})

    return response(200, {"count": count})


app = func.FunctionApp()

@app.route(route="counter", methods=["GET", "POST"], auth_level=func.AuthLevel.ANONYMOUS)
def counter(req: func.HttpRequest) -> func.HttpResponse:
    method = req.method.upper()

    if method == "GET":
        return get_count()
    elif method == "POST":
        return increment()
    else:
        return response(405, {"error": "Method Not Allowed"})