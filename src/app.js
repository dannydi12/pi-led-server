require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const reset = require('./reset');
const { spawn } = require('child_process');
const { basePath } = require('./store');
const { NODE_ENV } = require('../config');

const app = express();

app.use(morgan(NODE_ENV === 'production' ? 'tiny' : 'common'));
app.use(helmet());
app.use(cors());
app.use(reset);
app.use((error, req, res, next) => {
  let response;
  if (NODE_ENV === 'production') {
    response = {
      error: {
        message: 'server error'
      }
    };
  }
  else {
    console.log(error);
    response = { message: error.message, error };
  }
  res.status(500).send(response);
});

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

app.post('/shows', (req, res) => {
  const { name, brightness = 200, color = 'f1c40f' } = req.query;
  const {r, g, b} = convertHex(color)
  display = spawn('python', [`${basePath}/shows/${name}.py`, `-l ${brightness}`, `-r ${r}`, `-g ${g}`, `-b ${b}`]);
  display.stdout.on('data', (data) => console.log(`stdout: ${data}`));
  display.stderr.on('data', (data) => console.error(`stderr: ${data}`));
  isDisplaying = true
  display.on('close', (code) => {
    isDisplaying = false;
    console.log(`child process exited with code ${code}`)
  });

  res.send('Hello, world!');
});

app.post('/routines', (req, res) => {
  const { name, brightness = 200 } = req.query;
  display = spawn('python', [`${basePath}/routines/${name}.py`, `-b ${brightness}`]);
  console.log(brightness)
  display.stdout.on('data', (data) => console.log(`stdout: ${data}`));
  display.stderr.on('data', (data) => console.error(`stderr: ${data}`));
  isDisplaying = true
  display.on('close', (code) => {
    isDisplaying = false;
    console.log(`child process exited with code ${code}`)
  });

  res.send('Hello, world!');
});

app.post('/kill', (req, res) => {
  display.kill('SIGINT');
  isDisplaying = false
  res.send('turned out the lights :)');
});

module.exports = app;
