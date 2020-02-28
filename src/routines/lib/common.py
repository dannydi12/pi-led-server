#!/usr/bin/env python3

import time
from rpi_ws281x import PixelStrip, Color
import colorsys
from random import randint, random

# Helper Functions

def randomRGB():
    """Randomly generates RGB values."""
    r = randint(0, randint(0, 255))
    g = randint(0, randint(0, 255))
    b = randint(0, randint(0, 255))
    rgb = [r, g, b]
    rgb[randint(0,2)] = 255
    rgb[randint(0,2)] = 0

    return rgb

# Shows
def colorWipe(strip, r, g, b, seconds=0.05):
    """Wipe color across display a pixel at a time."""
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, Color(r, g, b))
        strip.show()
        time.sleep(seconds)

def fadeIn(strip, r, g, b, l, seconds=0.005):
    """Fade in color."""
    for i in range(255):
        hsv = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
        rgb = colorsys.hsv_to_rgb(hsv[0], hsv[1], i)

        for i in range(strip.numPixels()):
            strip.setPixelColor(i, Color(int(rgb[0]), int(rgb[1]), int(rgb[2])))
        strip.show()
        time.sleep(seconds)

def fadeOut(strip, r, g, b, l, seconds=0.001):
    """Fade out color."""
    for i in range(255, -1, -1):
        hsv = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
        rgb = colorsys.hsv_to_rgb(hsv[0], hsv[1], i)
        for i in range(strip.numPixels()):
            strip.setPixelColor(i, Color(int(rgb[0]), int(rgb[1]), int(rgb[2])))
        strip.show()
        time.sleep(seconds)

def setColor(strip, r, g, b):
    """Set color of display."""
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, Color(r, g, b))

    strip.show()

def theaterChase(strip, r, g, b, seconds=50, iterations=10):
    """Movie theater light style chaser animation."""
    for j in range(iterations):
        for q in range(3):
            for i in range(0, strip.numPixels(), 3):
                strip.setPixelColor(i + q, Color(r, g, b))
            strip.show()
            time.sleep(seconds)
            for i in range(0, strip.numPixels(), 3):
                strip.setPixelColor(i + q, 0)

def wheel(pos):
    """Generate rainbow colors across 0-255 positions."""
    if pos < 85:
        return Color(pos * 3, 255 - pos * 3, 0)
    elif pos < 170:
        pos -= 85
        return Color(255 - pos * 3, 0, pos * 3)
    else:
        pos -= 170
        return Color(0, pos * 3, 255 - pos * 3)

def rainbow(strip, seconds=20, iterations=1):
    """Draw rainbow that fades across all pixels at once."""
    for j in range(256 * iterations):
        for i in range(strip.numPixels()):
            strip.setPixelColor(i, wheel((i + j) & 255))
        strip.show()
        time.sleep(seconds)

def rainbowCycle(strip, wait_ms=20, iterations=5):
    """Draw rainbow that uniformly distributes itself across all pixels."""
    for j in range(256 * iterations):
        for i in range(strip.numPixels()):
            strip.setPixelColor(i, wheel(
                (int(i * 256 / strip.numPixels()) + j) & 255))
        strip.show()
        time.sleep(wait_ms / 1000.0)

def theaterChaseRainbow(strip, wait_ms=50):
    """Rainbow movie theater light style chaser animation."""
    for j in range(256):
        for q in range(3):
            for i in range(0, strip.numPixels(), 3):
                strip.setPixelColor(i + q, wheel((i + j) % 255))
            strip.show()
            time.sleep(wait_ms / 1000.0)
            for i in range(0, strip.numPixels(), 3):
                strip.setPixelColor(i + q, 0)
