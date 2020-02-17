#!/usr/bin/env python3

import time
from rpi_ws281x import PixelStrip, Color
import colorsys

# Shows
def colorWipe(strip, r, g, b, wait_ms=50):
    """Wipe color across display a pixel at a time."""
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, Color(r, g, b))
        strip.show()
        time.sleep(wait_ms / 1000.0)

def fadeIn(strip, r, g, b, l):
    """Fade in color"""
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, Color(r, g, b))
    for i in range(l):
        strip.setBrightness(i)
        strip.show()
        time.sleep(0.001)

def fadeOut(strip, r, g, b, l):
    """Fade out color"""
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, Color(r, g, b))
    for i in range(l, -1, -1):
        strip.setBrightness(i)
        strip.show()
        time.sleep(0.001)

def setColor(strip, r, g, b):
    """Wipe color across display a pixel at a time."""
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, Color(r, g, b))

    strip.show()

def theaterChase(strip, r, g, b, wait_ms=50, iterations=10):
    """Movie theater light style chaser animation."""
    for j in range(iterations):
        for q in range(3):
            for i in range(0, strip.numPixels(), 3):
                strip.setPixelColor(i + q, Color(r, g, b))
            strip.show()
            time.sleep(wait_ms / 1000.0)
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

def rainbow(strip, wait_ms=20, iterations=1):
    """Draw rainbow that fades across all pixels at once."""
    for j in range(256 * iterations):
        for i in range(strip.numPixels()):
            strip.setPixelColor(i, wheel((i + j) & 255))
        strip.show()
        time.sleep(wait_ms / 1000.0)

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
