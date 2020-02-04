const { spawn } = require('child_process');

global.isShowing = true;
global.show = spawn('python', ['/home/pi/Projects/pi-led-server/src/shows/main.py'], ['-c']);