#!/usr/bin/env python3

from rpi_ws281x import PixelStrip, Color

import common

LED_COUNT = 150
LED_PIN = 18
LED_FREQ_HZ = 800000
LED_DMA = 10
LED_BRIGHTNESS = 255
LED_INVERT = False
LED_CHANNEL = 0

if __name__ == '__main__':
    strip = PixelStrip(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
    strip.begin()

    try:
        common.setColor(strip, 0, 0, 0)

    except KeyboardInterrupt:
        common.setColor(strip, 0, 0, 0)
