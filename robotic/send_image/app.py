import base64
import requests
import json
import logging

logging.basicConfig(level=logging.INFO)

class EnvioImagen:
    def __init__(self):
        self.url = 'https://u30tldugjl.execute-api.us-east-1.amazonaws.com/prod/carga-de-imagenes'

    def __convertir_imagen(self, path):
        image = open(path, 'rb')
        image_read = image.read()
        image_64_encode = base64.encodestring(image_read)
        return image_64_encode.decode('ascii')

    def enviar_imagen(self, path):
        content = self.__convertir_imagen(path)
        
        body = {
            'autonomo': True,
            'name': path.split('/')[-1],
            'content': content
        }

        header = { 
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        }

        r = requests.post(self.url, headers=header, data=json.dumps(body))
        
        return r.json()
