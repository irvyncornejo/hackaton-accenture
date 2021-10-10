import logging

from gpiozero import Button

from modules.hardware import Chimalli
from modules.hardware import Camara
from modules.vision import Imagen

logging.basicConfig(level=logging.INFO)
boton = Button(12, False)
hw = Chimalli()
end_point = 'https://u30tldugjl.execute-api.us-east-1.amazonaws.com/prod/carga-de-imagenes'
imagen = Imagen(end_point)

if __name__=='__main__':
    while True:
        boton.wait_for_press()
        hw.enciende_rgb()
        logging.info('Tomando foto...')
        url = Camara().tomar_foto()
        res = imagen.enviar()
        hw.apaga_rgb()
        if res['body']['elementos_encontrados']['Text']:
            logging.info(res['body'])
            hw.crear_alerta_sonido()
        
        
        