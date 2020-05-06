#!/usr/bin/env python3

import time
import argparse
from lib import common
from lib import config

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--brightness', default = 200, help='set brightness (0-255)')
    parser.add_argument('-r', '--red', default = 0, help='set red value')
    parser.add_argument('-g', '--green', default = 0, help='set green value')
    parser.add_argument('-b', '--blue', default = 0, help='set blue value')
    parser.add_argument('-d', '--delay', default = 100, help='set delay in milliseconds')
    args = parser.parse_args()

    delay = int(args.delay)

    strip = config.setStrip(int(args.brightness))
    strip.begin()

    try:
        while True:
            common.rainbow(strip, delay)

    except KeyboardInterrupt:
        common.setColor(strip, 0, 0, 0)
