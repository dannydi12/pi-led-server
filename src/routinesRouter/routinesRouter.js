const express = require('express');
const { spawn } = require('child_process');
const { basePath } = require('../store');
const reset = require('../reset');
const validate = require('./validations');
const fs = require('fs');

const routinesRouter = express.Router();

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
  return { r: +r, g: +g, b: +b };
}

function setColor(hex, colorType, r, g, b) {
  if (colorType === 'hex') {
    return convertHex(hex);
  }
  else if (colorType === 'rgb') {
    return {
      r,
      g,
      b
    }
  }
  else {
    return {
      r: undefined,
      g: undefined,
      b: undefined
    }
  }
}

routinesRouter.route('/')
  .post(validate, reset, (req, res) => {
    const { name, brightness, hex, colorType, r, g, b, delay } = req.query;

    const rgb = setColor(hex, colorType, r, g, b)

    const args = [`${basePath}/src/routines/${name}.py`, `-l ${brightness}`, `-r ${rgb.r}`, `-g ${rgb.g}`, `-b ${rgb.b}`, `-d ${delay}`]

    display = spawn('python', args.filter(argument => argument.search('undefined') === -1));
    display.stdout.on('data', (data) => console.log(`stdout: ${data}`));
    display.stderr.on('data', (data) => console.error(`stderr: ${data}`));
    isDisplaying = true
    display.on('close', (code) => {
      isDisplaying = false;
      console.log(`child process exited with code ${code}`)
    });

    const response = {
      name,
      brightness
    }
    res.json(response);
  })
  .get((req, res) => {
    const files = fs.readdirSync(`${basePath}/src/routines`).filter(file => file.search(/.py$/) !== -1).map(file => file.slice(0, file.indexOf('.')))
    res.send(files)
  });

module.exports = routinesRouter;