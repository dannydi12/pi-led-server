#!/usr/bin/env python3

import time
import argparse
from lib import common
from lib import config

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--brightness', default = 255, help='set brightness (0-255)')
    parser.add_argument('-r', '--red', default = 255, help='set red value')
    parser.add_argument('-g', '--green', default = 255, help='set green value')
    parser.add_argument('-b', '--blue', default = 255, help='set blue value')
    parser.add_argument('-d', '--delay', default = 50, help='set delay in milliseconds')
    args = parser.parse_args()

    red = int(args.red)
    green = int(args.green)
    blue = int(args.blue)
    delay = 50
    brightness = 255

    strip = config.setStrip(brightness)
    strip.begin()

    try:
        while True:
          common.setColor(strip, red, green, blue)
          time.sleep(delay / 1000.0)
          common.setColor(strip, 0, 0, 0)
          time.sleep(delay / 1000.0)

    except KeyboardInterrupt:
        common.setColor(strip, 0, 0, 0)
