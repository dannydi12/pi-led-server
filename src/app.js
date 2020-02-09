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

app.post('/shows', (req, res) => {
  const { name, brightness = 200 } = req.query;
  display = spawn('python', [`${basePath}/shows/${name}.py`, `-b ${brightness}`]);
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
