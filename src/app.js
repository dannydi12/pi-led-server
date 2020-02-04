require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { spawn } = require('child_process');
const { NODE_ENV } = require('../config');

let show = spawn('python', ['/home/pi/Projects/pi-led-server/src/shows/other.py'], ['-c']);

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
  show.kill('SIGINT')
  new Promise(resolve => show.on('close', resolve)).then(() => {
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
    res.send('Hello, world!');
  })



});

// function kill() {
//   show.kill('SIGINT')
//   function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }
//   delay(3000).then(() => alert('runs after 3 seconds'));
// }

app.get('/kill', (req, res) => {
  show.kill('SIGINT');
  res.send('did it');
});

module.exports = app;
