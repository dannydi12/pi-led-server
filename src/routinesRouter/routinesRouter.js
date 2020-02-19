const express = require('express');
const { spawn } = require('child_process');
const reset = require('../reset');
const validate = require('./validations');
const allRoutines = require('../routines/routine-manifest');

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

function makeResponse(name, brightness, hex, colorType, r, g, b, delay) {
  const response = {
    name,
    brightness,
    colorType,
    delay
  }
  if(colorType === 'hex') {
    response.colorType = colorType;
    response.hex = hex;
  }
  if(colorType === 'rgb') {
    response.colorType = colorType;
    response.rgb = [r, g, b];
  }

  return response;
}

routinesRouter.route('/')
  .post(validate, reset, (req, res) => {
    const { name, brightness, hex, colorType, r, g, b, delay } = req.query;

    const rgb = setColor(hex, colorType, r, g, b)
    const normalizedName = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);
    const args = [allRoutines[normalizedName].path, `-l ${brightness}`, `-r ${rgb.r}`, `-g ${rgb.g}`, `-b ${rgb.b}`, `-d ${delay}`].filter(argument => argument.search('undefined') === -1)
    req.app.set('display', spawn('python', args))
    req.app.get('display').stdout.on('data', (data) => console.log(`stdout: ${data}`));
    req.app.get('display').stderr.on('data', (data) => console.error(`stderr: ${data}`));
    req.app.get('display').on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    });

    const response = makeResponse(name, brightness, hex, colorType, r, g, b, delay);

    res.json(response);
  })
  .get((req, res) => {

    const routines = Object.keys(allRoutines).map(routine => {
      return {
        name: routine,
        ...allRoutines[routine],
        path: undefined
      }
    })

    res.send(routines)
  });

module.exports = routinesRouter;