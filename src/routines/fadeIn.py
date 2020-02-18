#!/usr/bin/env python3

import time
import argparse
import common
import config

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--brightness', default = 200, help='set brightness (0-255)')
    parser.add_argument('-r', '--red', default = 255, help='set red value')
    parser.add_argument('-g', '--green', default = 0, help='set green value')
    parser.add_argument('-b', '--blue', default = 0, help='set blue value')
    args = parser.parse_args()

    red = int(args.red)
    green = int(args.green)
    blue = int(args.blue)
    brightness= int(args.brightness)

    strip = config.setStrip(int(args.brightness))
    strip.begin()

    try:
        while True:
          common.fadeIn(strip, red, green, blue, brightness)
          common.fadeOut(strip, red, green, blue, brightness)
        #   common.fadeIn(strip, red, green, blue, brightness)
        #   common.fadeOut(strip, red, green, blue, brightness)
          time.sleep(1)

    except KeyboardInterrupt:
        common.setColor(strip, 0, 0, 0)
