require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('../config');
const showRouter = require('./show/showRouter');

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

app.use('/show', showRouter)

app.post('/kill', (req, res) => {
  display.kill('SIGINT');
  isDisplaying = false
  res.send('Turned out the lights :)');
});

module.exports = app;
