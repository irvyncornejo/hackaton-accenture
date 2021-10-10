import time

from picamera import PiCamera
from gpiozero import RGBLED, Buzzer
from datetime import date
from datetime import datetime


camera = PiCamera()

class Chimalli:
    def __init__(self):
        self.flash = RGBLED(red=21, green=20, blue=19)
        self.colores = [(0.5, 1, 1), (1, 0.5, 1), (1, 1, 0.5)]
        self.buzzer = Buzzer(18)

    def genera_flash(self):
        for color in self.colores:
            self.flash.color = color
            time.sleep(1)

    def apaga_rgb(self):
        self.flash.color = (1, 1, 1)

    def enciende_rgb(self):
        self.flash.color = (0.75, 0.75, 0.75)
    
    def crear_alerta_sonido(self, tiempo):
        self.buzzer.on()
        time.sleep(tiempo)
        self.buzzer.off()
        time.sleep(tiempo)

class Camara:
    def tomar_foto(self):
        path = lambda x: f'/home/pi/sandbox/robotic/robotic/send_image/images/image{x}.jpg'
        hora = datetime.now()
        hora_string = hora.strftime('%d%m%Y%H%M%S')
        url = path(hora_string)
        camera.capture(url)
        time.sleep(1)
        return url
