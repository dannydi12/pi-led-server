const { spawn } = require('child_process');

const basePath = process.cwd();

global.display = spawn('python', [`${basePath}/src/routines/main.py`, '-b 20']);

module.exports = {
  basePath
}