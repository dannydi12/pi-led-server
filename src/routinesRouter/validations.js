const { basePath } = require('../store');
const fs = require('fs');

function validate(req, res, next) {
  const { name, brightness, color, delay } = req.query;
  if (!name) {
    return res.status(400).send('Please provide a routine name')
  }
  if (!fs.readdirSync(`${basePath}/src/routines`).find(file => file === `${name}.py`)) {
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
  if (color) {
    if (color.search(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g) === -1) {
      return res.status(400).send('Color must be a hexidecimal without the \'#\'. Ex: 5f27cd')
    }
  }

  next()
}

module.exports = validate;