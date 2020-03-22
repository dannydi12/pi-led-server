
# Raspberry Pi LED Server

[![CodeFactor](https://www.codefactor.io/repository/github/dannydi12/pi-led-server/badge)](https://www.codefactor.io/repository/github/dannydi12/pi-led-server)

Finally, a project that provides a turn-key solution for setting up remotely-controlled LEDs on a Raspberry Pi with Express. This project allows users to get up and running with WS281x LED strips while also providing a simple API server for granular control.

## Quick Start

A separate repository for a React front-end can be found [here](https://google.com). 

### Prerequisites

For one thing, you'll need a Raspberry Pi 3 or newer. You can find one on Amazon or anywhere else on the internet, so I won't add a link for now.

Make sure you have Node installed. If not, go to [Node's download page]([https://nodejs.org/en/](https://nodejs.org/en/)). Then, check node is working:
```
node --version
```
Also NPM:
```
npm --version
```

Also ensure that you have Python 3.x running on your Raspberry Pi. You can check that by running:

```
python --version
```

Also check for Python's package manager, pip.

```
pip --version
```

## Setup

### Installing

1. Clone the project: `git clone https://github.com/dannydi12/pi-led-server`
2. Enter the directory with `cd pi-led-server` 
3. Install with NPM: `npm i`
4. Install python dependencies: `sudo pip install rpi_ws281x`
5. Open the 'example.env' file with your favorite text editor and change the API key to something secure. I recommend using a [password generator]([https://passwordsgenerator.net/](https://passwordsgenerator.net/)) to make a strong key.
6. Rename 'example.env' to '.env' with `mv example.env .env`
7. View or edit `[name of project folder]/src/routines/lib/config.py`. Notice that `LED_COUNT` has been set to 150 but feel free to change that to whatever amount of LEDs you have (just make sure you have the proper power supply). `LED_BRIGHTNESS` represents the default brightness, you can make it brighter by setting it to 255.

That should be all that's needed to get everything installed. Just run `sudo npm start` to turn on the server. 

Note: the server startup command requires the `sudo` because it needs root privileges to access the LED strip.

## Usage

Several LED routines have already been pre-programmed to set a coding structure guide and so any newcomer can get started as quickly as possible. So let's get started!

**Reminder: I built out a React front-end to abstract all of this to a simple interface. That project can be found [here](https://google.com).**

Simply send HTTP requests to the API to control the LED strip.

Get a list of available routines to execute:
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

## Built With

* [rpi-ws281x-python](https://github.com/rpi-ws281x/rpi-ws281x-python) - For controlling/accessing the LEDs
* Node
* Python
* Express

## Authors

* **Daniel DiVenere** - *Initial work* - [Portfolio](https://imdan.io)

## Contributing

I'm always looking for ways to better my projects. Feel free to make a pull request or submit an issue.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
