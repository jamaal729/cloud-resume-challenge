import json
import os
import boto3

dynamodb = None

def get_dynamo():
    global dynamodb
    if dynamodb is None:
        dynamodb = boto3.resource('dynamodb')
    return dynamodb

def get_table_name():
    return os.environ['TABLE_NAME']

def get_pk_value():
    return os.environ.get('COUNTER_PK', 'global')

def response(status, body):
    return {
        'statusCode': status,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps(body)
    }

def get_count():
    table = get_dynamo().Table(get_table_name())
    res = table.get_item(
        Key={'pk': get_pk_value()},
        ConsistentRead=True
    )
    
    count = res.get('Item', {}).get('count', 0)
    return response(200, {'count': int(count)})

def increment():
    table = get_dynamo().Table(get_table_name())
    res = table.update_item(
        Key={'pk': get_pk_value()},
        UpdateExpression='SET #c = if_not_exists(#c, :zero) + :incr',
        ExpressionAttributeNames={'#c': 'count'},
        ExpressionAttributeValues={':incr': 1, ':zero': 0},
        ReturnValues='UPDATED_NEW'
    )
    
    count = int(res['Attributes']['count'])
    return response(200, {'count': count})

def lambda_handler(event, context):
    method = event.get('requestContext', {}).get('http', {}).get('method') or event.get('httpMethod')
    
    if method == 'GET':
        return get_count()
    elif method == 'POST':
        return increment()
    else:
        return response(405, {'error': 'Method Not Allowed'})