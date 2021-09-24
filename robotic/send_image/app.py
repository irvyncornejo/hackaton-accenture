import base64
import requests
import json
import logging

logging.basicConfig(level=logging.INFO)

class EnvioImagen:
    def __init__(self):
        self.url = 'https://w7a2uoj4wl.execute-api.us-west-2.amazonaws.com/test-dev/upload'

    def __convertir_imagen(self, path='1.png'):
        image = open(path, 'rb')
        image_read = image.read()
        image_64_encode = base64.encodestring(image_read)
        return image_64_encode.decode('ascii')

    def enviar_imagen(self):
        content = self.__convertir_imagen()
        
        body = {
            'autonomo': True,
            'name': 'python.png',
            'content': content
        }

        header = { 
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        }

        r = requests.post(self.url, headers=header, data=json.dumps(body))
        
        return r.json()


if __name__ == '__main__':
    respuesta = EnvioImagen().enviar_imagen()
    logging.info(respuesta['body']['elementos_encontrados'])