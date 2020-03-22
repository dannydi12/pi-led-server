/**
 * This file declares and handles all the routes.
 *
 * @author Daniel DiVenere
 * @since  3/22/20
 */

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const authorize = require('./middleware/authorize');
const errorHandler = require('./middleware/error');
const { NODE_ENV } = require('../config');
const routinesRouter = require('./routinesRouter/routinesRouter');

const app = express();

app.use(morgan(NODE_ENV === 'production' ? 'tiny' : 'common'));
app.use(helmet());
app.use(cors());
app.use(authorize);
app.use(errorHandler);

app.use('/routines', routinesRouter);

// Clear the LED strip and kill any child processes
app.delete('/kill', (req, res) => {
  req.app.get('display').kill('SIGINT');
  res.status(201).end();
});

// Catch-all 404
app.get('*', (req, res) => {
  res.status(404).end();
});

// Catch-all 500
app.use(errorHandler);

module.exports = app;
