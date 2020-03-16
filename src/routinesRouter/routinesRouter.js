const express = require('express');
const { spawn } = require('child_process');
const reset = require('../reset');
const validate = require('./validations');
const allRoutines = require('../routines/routine-manifest');
const { normalizeName, setColor, makeResponse } = require('./helper');

const routinesRouter = express.Router();

routinesRouter.route('/')
  .put(validate, reset, (req, res) => {
    const { name, brightness, hex, colorType, r, g, b, delay } = req.query;

    const rgb = setColor(hex, colorType, r, g, b)
    const options = [`-l ${brightness}`, `-r ${rgb.r}`, `-g ${rgb.g}`, `-b ${rgb.b}`, `-d ${delay}`].filter(argument => argument.search('undefined') === -1);
    const args = [allRoutines[normalizeName(name)].path, ...options]
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