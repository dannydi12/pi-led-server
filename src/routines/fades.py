#!/usr/bin/env python3

import time
import argparse
import common
import config
from random import randint, random

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--brightness', default = 200, help='set brightness (0-255)')
    parser.add_argument('-r', '--red', default = 255, help='set red value')
    parser.add_argument('-g', '--green', default = 0, help='set green value')
    parser.add_argument('-b', '--blue', default = 0, help='set blue value')
    args = parser.parse_args()

    brightness= int(args.brightness)

    strip = config.setStrip(int(args.brightness))
    strip.begin()

    try:
        while True:
            r = randint(0, randint(0, 255))
            g = randint(0, randint(0, 255))
            b = randint(0, randint(0, 255))
            rgb = [r, g, b]
            rgb[randint(0,2)] = 255
            rgb[randint(0,2)] = 0
            
            common.fadeIn(strip, rgb[0], rgb[1], rgb[2], brightness)
            common.fadeOut(strip, rgb[0], rgb[1], rgb[2], brightness)
            time.sleep(1)

    except KeyboardInterrupt:
        common.setColor(strip, 0, 0, 0)
