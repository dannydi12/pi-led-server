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

app.post('/show', (req, res) => {
  const { type, params } = req.query;
  show = spawn('python', [`${basePath}/shows/${type}.py`], ['-c']);

  show.stdout.on('data', (data) => console.log(`stdout: ${data}`));
  show.stderr.on('data', (data) => console.error(`stderr: ${data}`));
  show.on('close', (code) => console.log(`child process exited with code ${code}`));

  isShowing = true
  res.send('Hello, world!');
});

app.post('/kill', (req, res) => {
  show.kill('SIGINT');
  isShowing = false
  res.send('turned out the lights :)');
});

module.exports = app;
