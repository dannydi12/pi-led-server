#!/usr/bin/env python3

import time
from rpi_ws281x import PixelStrip, Color
import argparse
from signal import signal, SIGINT

import common

LED_COUNT = 150
LED_PIN = 18
LED_FREQ_HZ = 800000
LED_DMA = 10
LED_BRIGHTNESS = 200
LED_INVERT = False
LED_CHANNEL = 0

def handler(signal_received, frame):
    common.colorWipe(strip, 0, 0, 0, 10)
    print('SIGINT or CTRL-C detected. Exiting gracefully')
    exit(0)

if __name__ == '__main__':
    # signal(SIGINT, handler)

    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--brightness', default = 200, help='set brightness (0-255)')
    parser.add_argument('-r', '--red', default = 0, help='set red value')
    parser.add_argument('-g', '--green', default = 0, help='set green value')
    parser.add_argument('-b', '--blue', default = 0, help='set blue value')
    args = parser.parse_args()

    red = int(args.red)
    green = int(args.green)
    blue = int(args.blue)

    print('hey')

    strip = PixelStrip(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, int(args.brightness), LED_CHANNEL)
    strip.begin()

    print('hey', red, green, blue)

    try:
        while True:
            common.setColor(strip, red, green, blue)
            time.sleep(10000)

    except KeyboardInterrupt:
        print('provided c')
        common.setColor(strip, 0, 0, 0)
