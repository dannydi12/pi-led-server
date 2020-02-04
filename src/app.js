require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { spawn } = require('child_process');
const { NODE_ENV } = require('../config');

let show = spawn('python', ['/home/pi/Projects/pi-led-server/src/shows/main.py'], ['-c']);
let isShowing = true;

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
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

app.get('/led', (req, res) => {
  const { type } = req.query;
  new Promise(resolve => {
    if (isShowing) {
      show.kill('SIGINT');
      show.on('exit', resolve)
    }
    else {
      resolve();
    }
  }).then(() => {
    show = spawn('python', [`/home/pi/Projects/pi-led-server/src/shows/${type}.py`], ['-c']);
    show.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    show.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    show.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
    isShowing = true;
    res.send('Hello, world!');
  })
});

app.get('/kill', (req, res) => {
  show.kill('SIGINT');
  isShowing = false;
  res.send('turned out the lights :)');
});

module.exports = app;
