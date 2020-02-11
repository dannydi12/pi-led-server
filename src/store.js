const { spawn } = require('child_process');

const basePath = '/home/pi/Projects/pi-led-server/src'

global.isDisplaying = true;
global.display = spawn('python', [`${basePath}/routines/main.py`, '-b 20']);

module.exports = {
  basePath
}