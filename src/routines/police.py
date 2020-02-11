#!/usr/bin/env python3

import time
from rpi_ws281x import PixelStrip, Color
import argparse
import common

LED_COUNT = 150
LED_PIN = 18
LED_FREQ_HZ = 800000
LED_DMA = 10
LED_BRIGHTNESS = 200
LED_INVERT = False
LED_CHANNEL = 0

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--brightness', default = 200, help='set brightness (0-255)')
    parser.add_argument('-r', '--red', default = 0, help='set red value')
    parser.add_argument('-g', '--green', default = 0, help='set green value')
    parser.add_argument('-b', '--blue', default = 0, help='set blue value')
    args = parser.parse_args()

    strip = PixelStrip(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, int(args.brightness), LED_CHANNEL)
    strip.begin()

    try:
        while True:
            common.setColor(strip, 255, 0, 0)
            time.sleep(0.5)
            common.setColor(strip, 0, 0, 255)
            time.sleep(0.5)

    except KeyboardInterrupt:
        common.setColor(strip, 0, 0, 0)
