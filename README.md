# Raspberry Pi LED Server

This controls ws2812x led strips from an express server on a simple pi.

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone this-project`
2. `cd` into the cloned repository
3. `sudo pip install rpi_ws281x`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts

Start the application `sudo npm start`

Start nodemon for the application `sudo npm run dev`

Run the tests `npm test`
