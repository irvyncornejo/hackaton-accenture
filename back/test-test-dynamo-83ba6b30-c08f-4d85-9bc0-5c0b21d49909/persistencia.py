from boto3.dynamodb.conditions import Key

class Persistencia:
    def __init__(self, client, resource):
        self.resource = resource
    
    def create_table(self, name):
        try:
            self.resource.create_table(
                TableName = name,
                KeySchema= [
                    {
                        'AttributeName': 'caracteristica',
                        'KeyType': 'HASH'
                    },
                    {
                        'AttributeName': 'idUser',
                        'KeyType': 'RANGE'
                    }
                ],
                AttributeDefinitions= [
                    {
                        'AttributeName': 'caracteristica',
                        'AttributeType': 'S'
                    },
                    {
                        'AttributeName': 'idUser',
                        'AttributeType': 'S'
                    },
                ],
                ProvisionedThroughput={
                    'ReadCapacityUnits': 1,
                    'WriteCapacityUnits': 1
                }
            )
        except Exception as e:
            return e
    
    def create_log_image(self, data):
        table = self.resource.Table('imagenes')
        table.put_item(Item=data)
    
    
    def get_elements(self, value):
        table = self.resource.Table('imagenes')      
    
        resp = table.query(
            KeyConditionExpression=Key('caracteristica').eq(value)
        )
                    
        if 'Items' in resp:
            resp['Items'][0]
        return resp['Items']