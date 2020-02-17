const { spawn } = require('child_process');

const basePath = process.env.basePath

global.isDisplaying = true;
global.display = spawn('python', [`${basePath}/routines/main.py`, '-b 20']);

module.exports = {
  basePath
}