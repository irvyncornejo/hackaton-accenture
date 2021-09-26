import json
import boto3

from persistencia import Persistencia

client = boto3.client('dynamodb')
resource = boto3.resource('dynamodb')




def lambda_handler(event, context):
    db = Persistencia(client, resource)
    keys = event.keys()
    if('idImage' in keys):
        db.create_log_image(event)    
    
    else:
        res = db.get_elements(event['body'])
    return {
        'statusCode': 200,
        'body': res
    }
