#!/usr/bin/env python3

import time
from rpi_ws281x import PixelStrip, Color
import argparse
from lib import common
from lib import config

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--brightness', default = 200, help='set brightness (0-255)')
    parser.add_argument('-r', '--red', default = 0, help='set red value')
    parser.add_argument('-g', '--green', default = 0, help='set green value')
    parser.add_argument('-b', '--blue', default = 0, help='set blue value')
    parser.add_argument('-d', '--delay', default = 500, help='set delay in milliseconds')
    args = parser.parse_args()

    delay = int(args.delay)

    strip = config.setStrip(int(args.brightness))
    strip.begin()

    try:
        while True:
            common.setColor(strip, 255, 0, 0)
            time.sleep(delay / 1000.0)
            common.setColor(strip, 0, 0, 255)
            time.sleep(delay / 1000.0)

    except KeyboardInterrupt:
        common.setColor(strip, 0, 0, 0)
