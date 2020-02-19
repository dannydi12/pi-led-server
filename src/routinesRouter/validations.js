const allRoutines = require('../routines/routine-manifest');

function validate(req, res, next) {
  const { name, brightness, hex, colorType, r, g, b, delay } = req.query;
  if (!name) {
    return res.status(400).send('Please provide a routine name')
  }
  if (!(allRoutines[name.charAt(0).toUpperCase() + name.toLowerCase().slice(1)])) {
    return res.status(400).send('Please send a valid routine name. GET /routines for a full list of available routines')
  }
  if (delay) {
    if (!Number(delay)) {
      return res.status(400).send('Delay must be an integer')
    }
    if (!(Number(delay) >= 0 && Number(delay) <= 10000)) {
      return res.status(400).send('Brightness must be between 0 and 10,000 milliseconds')
    }
  }
  if (brightness) {
    if (!Number(brightness)) {
      return res.status(400).send('Brightness must be an integer')
    }
    if (!(Number(brightness) >= 0 && Number(brightness) <= 255)) {
      return res.status(400).send('Brightness must be between 0 and 255')
    }
  }
  if (colorType === 'hex') {
    if (!hex) {
      return res.status(400).send('Hex must be defined')
    }
    if (hex.search(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g) === -1) {
      return res.status(400).send('Color must be a hexidecimal without the \'#\'. Ex: 5f27cd')
    }
  }
  if (colorType === 'rgb') {
    if (!r || !g || !b) {
      return res.status(400).send('RGB values must be defined. Ex: r=23 g=240 b=5')
    }

    for (color of [r, g, b]) {
      if (!(Number(color) >= 0 && Number(color) <= 255)) {
        return res.status(400).send(`Color "${[color]}" must be an rgb value within 0 - 255. Ex: r=23 g=240 b=5`)
      }
    }
  }

  next()
}

module.exports = validate;