/**
 * This is where the magic happens. This router handles requests
 * for new displays and also sends a list of what is available.
 *
 * @author Daniel DiVenere
 * @since  3/22/20
 */

const express = require('express');
const { spawn } = require('child_process');
const reset = require('../middleware/reset');
const validate = require('./validations');
const allRoutines = require('../routines/routine-manifest');
const { normalizeName, setColor, makeResponse } = require('./helper');

const routinesRouter = express.Router();

routinesRouter.route('/')
  // Initiates a new routine
  .put(validate, reset, (req, res) => {
    const {
      name, brightness, hex, colorType, r, g, b, delay,
    } = req.query;

    // Get RGB value
    const rgb = setColor(hex, colorType, r, g, b);

    // Build arguments to be passed into child_process. Also removes uneeded arguments.
    const options = [`-l ${brightness}`, `-r ${rgb.r}`, `-g ${rgb.g}`, `-b ${rgb.b}`, `-d ${delay}`].filter((argument) => argument.search('undefined') === -1);

    // Combine arguments and spawns child process
    const args = [allRoutines[normalizeName(name)].path, ...options];
    req.app.set('display', spawn('python', args));

    // Prints relevant info about child process; good for debugging
    req.app.get('display').stdout.on('data', (data) => console.log(`stdout: ${data}`));
    req.app.get('display').stderr.on('data', (data) => console.error(`stderr: ${data}`));
    req.app.get('display').on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });

    // Send back an object with the settings the client provided
    const response = makeResponse(name, brightness, hex, colorType, r, g, b, delay);
    res.json(response);
  })
  .get((req, res) => {
    // Parse through all routines and send them to the client
    const routines = Object.keys(allRoutines).map((routine) => ({
      name: routine,
      ...allRoutines[routine],
      path: undefined,
    }));

    res.send(routines);
  });

module.exports = routinesRouter;
