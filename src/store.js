const { spawn } = require('child_process');

const basePath = '/home/pi/Projects/pi-led-server/src'

global.isShowing = true;
global.show = spawn('python', [`${basePath}/shows/main.py`, '-b 200']);

module.exports = {
  basePath
}