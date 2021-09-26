import json
import base64
import boto3
import logging
import time
import uuid

from models import Models

BUCKET_NAME = 'hackaton-images-dev'

autonomo = lambda body: True if 'autonomo' in body.keys() else False   
client = lambda name: boto3.client(name)

def lambda_handler(event, context):
    
    model = Models()
    
    file_content = base64.b64decode(event['payload']['content'])
    file_path = event['payload']['name']
    
    try:
      s3_response = client('s3').put_object(Bucket=BUCKET_NAME, Key=file_path, Body=file_content)
      response = client('lambda').invoke(
        FunctionName = 'arn:aws:lambda:us-west-2:039101246475:function:rekognition',
        InvocationType = 'RequestResponse',
        Payload = json.dumps({'fileName': file_path, 'bucket': BUCKET_NAME})
      )
      
      labels = response['Payload'].read()
      labels_dict = json.loads(labels.decode())
      
      persistence = client('lambda').invoke(
        FunctionName = 'arn:aws:lambda:us-west-2:039101246475:function:test-test-dynamo',
        InvocationType = 'RequestResponse',
        Payload = json.dumps({
          'idImage':file_path,
          'idUser': str(uuid.uuid4()),
          'ruta': file_path,
          'caracteristica':labels_dict['Parents'][0]
        })
      )
      return model.successfull(file_path, labels_dict)
    
    except Exception as e:
      print(e)
      return model.request_error()
    