#!/usr/bin/env python3

import time
import argparse
from lib import common
from lib import config

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--brightness', default = 255, help='set brightness (0-255)')
    parser.add_argument('-r', '--red', default = 0, help='set red value')
    parser.add_argument('-g', '--green', default = 0, help='set green value')
    parser.add_argument('-b', '--blue', default = 0, help='set blue value')
    parser.add_argument('-d', '--delay', default = 0, help='set delay in milliseconds')
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
          common.randomTwinkle(strip)
          common.randomColorFill(strip)
          common.randomColorFill(strip)
          common.rainbow(strip, 100)
          
          for i in range(8):
            common.rainbow(strip, 0)

          common.theaterChaseRainbow(strip)

          for i in range(8):
            common.theaterChase(strip, 255, 100, 0, 50)

          common.scanner(strip, 0, 255, 0, 50, 20)
          common.scannerBack(strip, 0, 255, 0, 50, 20)

          common.colorfulScanner(strip, 50, 20)
          common.colorfulScannerBack(strip, 50, 20)

          common.scanner(strip, 255, 0, 0, 50, 20)
          common.scannerBack(strip, 255, 0, 0, 50, 20)

          for i in range(15):
            common.setColor(strip, 255, 0, 0)
            time.sleep(0.3)
            common.setColor(strip, 0, 0, 255)
            time.sleep(0.3)

          for i in range(8):
            common.crossFade(strip, 0)

          for i in range(20):
            rgb = common.randomRGB()
            
            common.setColor(strip, rgb[0], rgb[1], rgb[2])
            time.sleep(0.5)

          for i in range(5):
            rgb = common.randomRGB()
            
            common.fadeIn(strip, rgb[0], rgb[1], rgb[2], 255)
            common.fadeOut(strip, rgb[0], rgb[1], rgb[2], 255)
            time.sleep(0.5)

    except KeyboardInterrupt:
        common.setColor(strip, 0, 0, 0)
