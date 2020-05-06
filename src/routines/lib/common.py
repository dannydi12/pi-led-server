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

def crossFade(strip, ms=50):
    """Crossfades to different colors"""
    for i in range(360):
        rgb = colorsys.hsv_to_rgb(i/360.0, 1, 1)
        for j in range(strip.numPixels()):
            strip.setPixelColor(j, Color(int(rgb[0]*255), int(rgb[1]*255), int(rgb[2]*255)))

        strip.show()
        time.sleep(ms / 1000.0)

def colorWipe(strip, r, g, b, ms=50):
    """Wipe color across display a pixel at a time."""
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, Color(r, g, b))
        strip.show()
        time.sleep(ms / 1000.0)

def fadeIn(strip, r, g, b, l, ms=20):
    """Fade in color."""
    for i in range(255):
        hsv = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
        rgb = colorsys.hsv_to_rgb(hsv[0], hsv[1], i)

        for i in range(strip.numPixels()):
            strip.setPixelColor(i, Color(int(rgb[0]), int(rgb[1]), int(rgb[2])))
        strip.show()
        time.sleep(ms / 1000.0)

def fadeOut(strip, r, g, b, l, ms=1):
    """Fade out color."""
    for i in range(255, -1, -1):
        hsv = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
        rgb = colorsys.hsv_to_rgb(hsv[0], hsv[1], i)
        for i in range(strip.numPixels()):
            strip.setPixelColor(i, Color(int(rgb[0]), int(rgb[1]), int(rgb[2])))
        strip.show()
        time.sleep(ms / 1000.0)

def setColor(strip, r, g, b):
    """Set color of display."""
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, Color(r, g, b))

    strip.show()

def twinkle(strip, r, g, b, ms=10):
    """Twinkle twinkle little star."""
    for i in range(strip.numPixels()):
        strip.setPixelColor(randint(0, strip.numPixels()), Color(r, g, b))
        for i in range(strip.numPixels() / 2):
            rgb = randomRGB()
            strip.setPixelColor(randint(0, strip.numPixels()), Color(0, 0, 0))
        strip.show()
        time.sleep(ms / 1000.0)

def randomTwinkle(strip, ms=50):
    """Twinkle twinkle little star but with random colors!"""
    for i in range(strip.numPixels()):
        rgb = randomRGB()
        strip.setPixelColor(randint(0, strip.numPixels()), Color(rgb[0], rgb[1], rgb[2]))
        for i in range(strip.numPixels() / 2):
            rgb = randomRGB()
            strip.setPixelColor(randint(0, strip.numPixels()), Color(0, 0, 0))
        strip.show()
        time.sleep(ms / 1000.0)

def randomColorFill(strip, ms=50):
    """Randomly fills display with random colors. Truly unpredictable."""
    for i in range(strip.numPixels()):
        rgb = randomRGB()
        strip.setPixelColor(randint(0, strip.numPixels()), Color(rgb[0], rgb[1], rgb[2]))
        strip.show()
        time.sleep(ms / 1000.0)

def scanner(strip, r, g, b, ms=50, eyeSize=10):
    """Simulates the eye of Cylon"""
    setColor(strip, 0, 0, 0)
    for i in range(strip.numPixels() - eyeSize):
        strip.setPixelColor(i, Color(0, 0, 0))
        for j in range(1, eyeSize):
            strip.setPixelColor(i + j, Color(r, g, b))
        strip.show()
        time.sleep(ms / 1000.0)

def scannerBack(strip, r, g, b, ms=50, eyeSize=10):
    """Simulates the eye of Cylon but going back"""
    setColor(strip, 0, 0, 0)
    for i in range(strip.numPixels() - eyeSize, 0, -1):
        for j in range(1, eyeSize):
            strip.setPixelColor(i + j, Color(r, g, b))
        strip.setPixelColor(i + j, Color(0, 0, 0))
        strip.show()
        time.sleep(ms / 1000.0)

def colorfulScanner(strip, ms=50, eyeSize=10):
    """Simulates the eye of Cylon but as if a little kid drew it"""
    setColor(strip, 0, 0, 0)
    for i in range(strip.numPixels() - eyeSize):
        strip.setPixelColor(i, Color(0, 0, 0))
        for j in range(1, eyeSize):
            rgb = randomRGB()
            strip.setPixelColor(i + j, Color(rgb[0], rgb[1], rgb[2]))
        strip.show()
        time.sleep(ms / 1000.0)

def colorfulScannerBack(strip, ms=50, eyeSize=10):
    """Simulates the eye of Cylon but as if a little kid drew it but going back"""
    setColor(strip, 0, 0, 0)
    for i in range(strip.numPixels() - eyeSize, 0, -1):
        for j in range(1, eyeSize):
            rgb = randomRGB()
            strip.setPixelColor(i + j, Color(rgb[0], rgb[1], rgb[2]))
        strip.setPixelColor(i + j, Color(0, 0, 0))
        strip.show()
        time.sleep(ms / 1000.0)

def theaterChase(strip, r, g, b, ms=1000, iterations=10):
    """Movie theater light style chaser animation."""
    for j in range(iterations):
        for q in range(3):
            for i in range(0, strip.numPixels(), 3):
                strip.setPixelColor(i + q, Color(r, g, b))
            strip.show()
            time.sleep(ms / 1000.0)
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

def rainbow(strip, ms=20, iterations=1):
    """Draw rainbow that fades across all pixels at once."""
    for j in range(256 * iterations):
        for i in range(strip.numPixels()):
            strip.setPixelColor(i, wheel((i + j) & 255))
        strip.show()
        time.sleep(ms / 1000.0)

def rainbowCycle(strip, wait_ms=20, iterations=5):
    """Draw rainbow that uniformly distributes itself across all pixels."""
    for j in range(256 * iterations):
        for i in range(strip.numPixels()):
            strip.setPixelColor(i, wheel(
                (int(i * 256 / strip.numPixels()) + j) & 255))
        strip.show()
        time.sleep(wait_ms / 1000.0)

def theaterChaseRainbow(strip, ms=50):
    """Rainbow movie theater light style chaser animation."""
    for j in range(256):
        for q in range(3):
            for i in range(0, strip.numPixels(), 3):
                strip.setPixelColor(i + q, wheel((i + j) % 255))
            strip.show()
            time.sleep(ms / 1000.0)
            for i in range(0, strip.numPixels(), 3):
                strip.setPixelColor(i + q, 0)