import base64
import requests
import json

class Imagen:
    def __init__(self, url):
        """
            Clase que envía la foto al endpoint que se define al inicio de la clases
        """
        self.url = url

    def __convertir_imagen(self, path):
        image = open(path, 'rb')
        image_read = image.read()
        image_64_encode = base64.encodestring(image_read)
        return image_64_encode.decode('ascii')

    def enviar(self, path):
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
