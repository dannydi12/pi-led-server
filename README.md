
# Raspberry Pi LED Server

[![CodeFactor](https://www.codefactor.io/repository/github/dannydi12/pi-led-server/badge)](https://www.codefactor.io/repository/github/dannydi12/pi-led-server)

Finally, a project that provides a turn-key solution for setting up remotely-controlled LEDs on a Raspberry Pi with Express. This project allows users to get up and running with WS281x LED strips while also providing a simple API server for granular control.

## Benefits and Features

* It's RESTful
* It's modular
* Includes sound visualizers
* Abstracted but easily customizable
* Can be integrated with digital assistants or used for home automation
* Implemented in digital experiences (escape rooms, etc)
* Just plain beautiful to install in your room

## Quick Start

A separate repository for a React front end can be found [here](https://github.com/dannydi12/pi-led-client). 

### Prerequisites

For one thing, you'll need a Raspberry Pi 3 or newer and a WS281x LED strip.

Make sure you have Node installed. If not, go to [Node's download page]([https://nodejs.org/en/](https://nodejs.org/en/)). 
Or just run this to get the latest version of Node:
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install -y nodejs
```
Then, check node is working:
```
node --version
```
Also NPM:
```
npm --version
```

Ensure that you have Python 3.x running on your Raspberry Pi. You can check that by running:

```
python --version
```

Check for Python's package manager, pip.

```
pip --version
```

## Setup

### Installing

1. Clone the project: `git clone https://github.com/dannydi12/pi-led-server`
2. Enter the directory with `cd pi-led-server` 
3. Install with NPM: `npm i`
4. Install python dependencies: `sudo pip install rpi_ws281x`
5. Install the deployment tool: `sudo npm i pm2 -g`
6. Open the 'example.env' file with your favorite text editor and change the API key to something secure. I recommend using a [password generator]([https://passwordsgenerator.net/](https://passwordsgenerator.net/)) to make a strong key.
7. Rename 'example.env' to '.env' with `mv example.env .env`
8. View or edit `[name of project folder]/src/routines/lib/config.py`. Notice that `LED_COUNT` has been set to 150 but feel free to change that to whatever amount of LEDs you have (just make sure you have the proper power supply). `LED_BRIGHTNESS` represents the default brightness, you can make it brighter by setting it to 255.
9. Edit `api.sh` with the full absolute path to the `pi-led-server` folder
11. Deploy: `sudo pm2 start webserver.sh` and then `sudo pm2 save`

That should be all that's needed to get everything installed. If you are having issues with `pm2`, just run `sudo npm start` in the folder to turn on the server. 

**Note: the server startup command requires `sudo` because it needs root privileges to access the LED strip.**

## Hardware

The following instructions were pulled from the [Audio Reactive LED Strip repository](https://github.com/scottlawsonbc/audio-reactive-led-strip) by @scottlawsonbc:

*Since the Raspberry Pi is a 3.3V device, the best practice is to use a logic level converter to shift the 3.3V logic to 5V logic (WS2812 LEDs use 5V logic).*

*Although a logic level converter is the best practice, sometimes it will still work if you simply connect the LED strip directly to the Raspberry Pi.*

*You cannot power the LED strip using the Raspberry Pi GPIO pins, you need to have an external 5V power supply.*

*The connections are:*

* *Connect GND on the power supply to GND on the LED strip and GND on the Raspberry Pi (they MUST share a common GND connection)*
* *Connect +5V on the power supply to +5V on the LED strip*
* *Connect a PWM GPIO pin on the Raspberry Pi to the data pin on the LED strip. If using the Raspberry Pi 2 or 3, then try Pin 18(GPIO5).*

## Usage

Several LED routines have already been pre-programmed to set a coding structure guide and so any newcomer can get started as quickly as possible. So let's get started!

**Reminder: I built out a React front end to abstract all of this to a simple interface. That project can be found [here](https://github.com/dannydi12/pi-led-client).**

Simply send HTTP requests to the API to control the LED strip.

Get a list of available routines that can be executed:
```
curl --request GET 'http://[raspberrypi-ip]:8000/routines' \
--header 'Authorization:[your-secret-key]'
```
Execute the 'Random Color Fill' routine:
```
curl --request PUT 'http://[raspberrypi-ip]:8000/routines?name=random%20color%20fill' \
--header 'Authorization:[your-secret-key]'
```

Here are all the possible parameters that can be sent:

 - name: string (ex: `Color Flash`) **this is the only required query**
 - brightness: integer between 0 - 255 (ex: `200` )
 - delay: integer representing time in milliseconds (ex: `1000`)
 - colorType: string that can only be `hex` or `rgb` 
	 - if the user picks `rgb`, the following is required:
		 - r: integer between 0 - 255 (ex: `200` )
		 - g: integer between 0 - 255 (ex: `200` )
		 - b: integer between 0 - 255 (ex: `200` )
	 - if the user picks `hex`, the following is required:
		 - hex: hexadecimal to control color (ex: `eb4034`)

#### Example

This should set the whole strip to the color green. Here are the settings being used:
 - name: `set color`
 - brightness: `100`
 - delay: `60`
 - colorType: `rgb`
	 - r: `0`
	 - g: `255`
	 - b: `0`
```
curl --request PUT 'http://[raspberrypi-ip]:8000/routines?name=set%20color&brightness=100&delay=60&colorType=rgb&r=0&g=255&b=0' \
--header 'Authorization:[your-secret-key]'
```

Don't forget to include the `Authorization` header in your requests.

## Customize

![project file tree](screens/tree.png)

* Add a routine listing and see existing routines: `pi-led-server/src/routines/routine-manifest.js`
* Alter LED-related configurations: `pi-led-server/src/routines/lib/config.py`
* Alter API server configurations: `pi-led-server/config.js`

### Add a New Routine

1. Copy the contents of `pi-led-server/src/routines/lib/template.py`
2. Create new file in `pi-led-server/src/routines` named `[routine name].py`
3. Paste the boilerplate code the `template.py`
4. Add an entry to `pi-led-server/src/routines/routine-manifest.js`


## Enabling Sound Visualization

This repo also comes with a built-in sound visualizer (thanks to [Scott Lawson's Audio Reactive LED Strip](https://github.com/scottlawsonbc/audio-reactive-led-strip)). To enable it, simply follow the instructions [here](https://github.com/scottlawsonbc/audio-reactive-led-strip#installation-for-raspberry-pi).

Once your mic is setup and the proper python libraries are installed. Go to `pi-led-server/src/routines/routine-manifest.js` and uncomment the three visualizer routines. 

I haven't had a chance to properly integrate the code, so the visualizers still have their own config file. Go to `pi-led-server/src/routines/visualizer/config.py` and set `N_PIXELS` to however many LEDs you have. Just make sure you round down to the nearest even number (no odd numbers).


## Built With

* [rpi-ws281x-python](https://github.com/rpi-ws281x/rpi-ws281x-python) for controlling/accessing the LEDs
* [Audio Reactive LED Strip](https://github.com/scottlawsonbc/audio-reactive-led-strip) by @scottlawsonbc for sound visualization routines
* Node
* Python
* Express

## Authors

* **Daniel DiVenere** - *Initial work* - [Portfolio](https://danthebuilder.com)

## Contributing

I'm always looking for ways to better my projects. Feel free to make a pull request or submit an issue.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
