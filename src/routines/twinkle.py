#!/usr/bin/env python3

import time
import argparse
from lib import common
from lib import config
from random import randint, random

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--brightness', default = 200, help='set brightness (0-255)')
    parser.add_argument('-r', '--red', default = 255, help='set red value')
    parser.add_argument('-g', '--green', default = 255, help='set green value')
    parser.add_argument('-b', '--blue', default = 255, help='set blue value')
    parser.add_argument('-d', '--delay', default = 50, help='set delay in milliseconds')
    args = parser.parse_args()

    red = int(args.red)
    green = int(args.green)
    blue = int(args.blue)
    delay = int(args.delay)
    brightness = int(args.brightness)

    strip = config.setStrip(brightness)
    strip.begin()

    try:
        while True:
            common.twinkle(strip, red, green, blue, delay)

    except KeyboardInterrupt:
        common.setColor(strip, 0, 0, 0)
