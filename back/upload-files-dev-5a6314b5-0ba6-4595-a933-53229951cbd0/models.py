class Models:
    def request_error(self):
        return {
            'statusCode': 500,
            'body': {
                'ERROR': 'ERROR'
            }
        }
    
    def successfull(self, file_path, labels):
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'application/json',
                'Access-Control-Allow-Origin': 'https://w7a2uoj4wl.execute-api.us-west-2.amazonaws.com',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': {
                'file_path': file_path,
                'elementos_encontrados': labels
            }
        }
    
    