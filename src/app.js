require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('../config');
const routinesRouter = require('./routinesRouter/routinesRouter');

const app = express();

app.use(morgan(NODE_ENV === 'production' ? 'tiny' : 'common'));
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

app.use('/routines', routinesRouter)

app.delete('/kill', (req, res) => {
  display.kill('SIGINT');
  isDisplaying = false
  res.status(201).end()
});

app.get('*', (req, res) => {
  res.status(404).end()
})

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

module.exports = app;
