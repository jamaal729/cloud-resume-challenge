import json
import os
import boto3

# Initialize the DynamoDB client globally (outside the handler) for efficiency
# AWS Lambda reuses this client across invocations
@property
def dynamo():
    """Returns a memoized DynamoDB client."""
    # In a real Lambda environment, you might use a global variable or
    # a class to ensure it's initialized only once per environment spin-up.
    # For a simple function file, we can define it at module level if preferred.
    return boto3.client('dynamodb')

def table_name():
    """Fetches the table name from an environment variable."""
    return os.environ.get('TABLE_NAME')

def pk_value():
    """Fetches the primary key value from an environment variable, defaulting to 'global'."""
    # os.environ.get provides a cleaner way to fetch with a default value than ENV.fetch
    return os.environ.get('COUNTER_PK', 'global')

def response(status, body):
    """Formats the response object for API Gateway integration."""
    return {
        'statusCode': status,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps(body)
    }

def get_count():
    """Retrieves the current count from the DynamoDB table."""
    res = dynamo().get_item(
        TableName=table_name(),
        Key={'pk': {'S': pk_value()}}, # Using 'S' for String type in low-level client
        ConsistentRead=True
    )
    
    item = res.get('Item')
    # Use dictionary .get() and handle potential None/missing count with 0
    # The value is a DynamoDB Number type represented as a string when using the client
    count = int(item['count']['N']) if item and 'count' in item else 0
    return response(200, {'count': count})

def increment():
    """Increments the counter item in the DynamoDB table."""
    res = dynamo().update_item(
        TableName=table_name(),
        Key={'pk': {'S': pk_value()}},
        UpdateExpression='SET #c = if_not_exists(#c, :zero) + :incr',
        ExpressionAttributeNames={'#c': 'count'},
        ExpressionAttributeValues={
            ':incr': {'N': '1'}, # DynamoDB client requires type descriptors
            ':zero': {'N': '0'}
        },
        ReturnValues='UPDATED_NEW'
    )
    
    # Extract the new count value from the response attributes
    new_count = int(res['Attributes']['count']['N'])
    return response(200, {'count': new_count})

def lambda_handler(event, context):
    """Main AWS Lambda handler function."""
    # Handle different possible event structures from API Gateway v1 vs v2 payloads
    method = None
    if 'requestContext' in event and 'http' in event['requestContext']:
         method = event['requestContext']['http'].get('method')
    elif 'httpMethod' in event:
        method = event.get('httpMethod')
    
    if method == 'GET':
        return get_count()
    elif method == 'POST':
        return increment()
    else:
        return response(405, {'error': 'Method Not Allowed'})
