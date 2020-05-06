#!/usr/bin/env python3

import time
import argparse
from lib import common
from lib import config

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--brightness', default = 200, help='set brightness (0-255)')
    parser.add_argument('-r', '--red', default = 245, help='set red value')
    parser.add_argument('-g', '--green', default = 50, help='set green value')
    parser.add_argument('-b', '--blue', default = 66, help='set blue value')
    parser.add_argument('-d', '--delay', default = 4, help='set delay in milliseconds')
    args = parser.parse_args()

    red = int(args.red)
    green = int(args.green)
    blue = int(args.blue)
    brightness= int(args.brightness)
    delay = int(args.delay)

    strip = config.setStrip(int(args.brightness))
    strip.begin()

    try:
        common.fadeIn(strip, red, green, blue, brightness, 0)
        time.sleep(4)
        common.fadeOut(strip, red, green, blue, brightness, 0)

    except KeyboardInterrupt:
        common.setColor(strip, 0, 0, 0)
