/**
 * This file verifies inputs and raises red flags if anything seems wrong.
 *
 * @author Daniel DiVenere
 * @since  3/22/20
 */

const allRoutines = require('../routines/routine-manifest');
const { normalizeName } = require('./helper');

/**
 * Middleware to validate the inputs from the client.
 * Sends 400 codes if anything is wrong.
 */
function validate(req, res, next) {
  const {
    name, brightness, hex, colorType, r, g, b, delay,
  } = req.query;

  // 400 if there is no routine name provided
  if (!name) {
    return res.status(400).send('Please provide a routine name');
  }

  // 400 if the routine provided doesn't match those in the routine-manifest.js file
  if (!(allRoutines[normalizeName(name)])) {
    return res.status(400).send('Please send a valid routine name. GET /routines for a full list of available routines');
  }

  // Ensures delay is a number and within 0 and 10,000 milliseconds, if provided
  if (delay) {
    if (!Number(delay)) {
      return res.status(400).send('Delay must be an integer');
    }
    if (!(Number(delay) >= 0 && Number(delay) <= 10000)) {
      return res.status(400).send('Brightness must be between 0 and 10,000 milliseconds');
    }
  }

  // If brightness is provided, ensure it is a number and is between 0 - 255
  if (brightness) {
    if (!Number(brightness)) {
      return res.status(400).send('Brightness must be an integer');
    }
    if (!(Number(brightness) >= 0 && Number(brightness) <= 255)) {
      return res.status(400).send('Brightness must be between 0 and 255');
    }
  }

  // If colorType is set to hex, ensure hex is defined and that it really is a hexidecimal
  if (colorType === 'hex') {
    if (!hex) {
      return res.status(400).send('Hex must be defined');
    }
    if (hex.search(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g) === -1) {
      return res.status(400).send('Color must be a hexidecimal without the \'#\'. Ex: 5f27cd');
    }
  }

  /*
  *   If colorType is set to rgb, ensure r, g, and b are defined
  *   and that they are integers between 0 - 255
  */
  if (colorType === 'rgb') {
    if (!r || !g || !b) {
      return res.status(400).send('RGB values must be defined. Ex: r=23 g=240 b=5');
    }

    [r, g, b].forEach((color) => {
      if (!(Number(color) >= 0 && Number(color) <= 255)) {
        return res.status(400).send(`Color "${[color]}" must be an rgb value within 0 - 255. Ex: r=23 g=240 b=5`);
      }
      return next();
    });
  }

  return next();
}

module.exports = validate;
