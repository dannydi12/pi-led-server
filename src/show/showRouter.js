const express = require('express');
const { spawn } = require('child_process');
const { basePath } = require('../store');
const reset = require('../reset');
const validate = require('./validations');

const showRouter = express.Router();

function convertHex(h) {
  let r = 0, g = 0, b = 0;

  if (h.length == 3) {
    r = "0x" + h[0] + h[0];
    g = "0x" + h[1] + h[1];
    b = "0x" + h[2] + h[2];

  } else if (h.length == 6) {
    r = "0x" + h[0] + h[1];
    g = "0x" + h[2] + h[3];
    b = "0x" + h[4] + h[5];
  }
  return {r: +r, g: +g, b: +b} ;
}

showRouter.route('/')
  .post(validate, reset, (req, res) => {
    const { name, brightness = 200, color = 'f1c40f' } = req.query;
    const { r, g, b } = convertHex(color)
    display = spawn('python', [`${basePath}/routines/${name}.py`, `-l ${brightness}`, `-r ${r}`, `-g ${g}`, `-b ${b}`]);
    display.stdout.on('data', (data) => console.log(`stdout: ${data}`));
    display.stderr.on('data', (data) => console.error(`stderr: ${data}`));
    isDisplaying = true
    display.on('close', (code) => {
      isDisplaying = false;
      console.log(`child process exited with code ${code}`)
    });
    res.send('Hello, world!');
  });

module.exports = showRouter;