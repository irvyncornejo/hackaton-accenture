import time

from picamera import PiCamera
from gpiozero import Button, RGBLED, Buzzer
from datetime import date
from datetime import datetime
from app import EnvioImagen

camera = PiCamera()
boton = Button(12, False)
flash = RGBLED(red=21, green=20, blue=19)
colores = [(0.5, 1, 1), (1, 0.5, 1), (1, 1, 0.5)]
buzzer = Buzzer(18)

def genera_flash():
    for color in colores:
        flash.color = color
        time.sleep(1)

def apaga_rgb():
    flash.color = (1, 1, 1)

def enciende_rgb():
    flash.color = (0.75, 0.75, 0.75)

def toma_foto():
    path = lambda x: f'/home/pi/sandbox/robotic/robotic/send_image/images/image{x}.jpg'
    genera_flash()
    hora = datetime.now()
    hora_string = hora.strftime('%d%m%Y%H%M%S')
    enciende_rgb()
    url = path(hora_string)
    camera.capture(url)
    time.sleep(1)
    return url

def print_print():
    print('boton')


if __name__ == '__main__': 
    while True: 
        boton.wait_for_press()
        print('foto')
        url = toma_foto()
        time.sleep(2)
        res = EnvioImagen().enviar_imagen(url)
        print(res['body'])
        if res['body']['elementos_encontrados']['Text']:
            print(res['body'])
            buzzer.on()
            time.sleep(0.5)
            buzzer.off()
            time.sleep(1)
            buzzer.on()
            time.sleep(2)
            buzzer.off()