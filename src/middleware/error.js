/**
 * Catch-all error handling middleware.
 *
 * @author Daniel DiVenere
 * @since  3/22/20
 */

const { NODE_ENV } = require('../../config');

/**
 * Pass in errors, errors come out.
 */
function error(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = {
      error: {
        message: 'server error',
      },
    };
  } else {
    console.log(error);
    response = { message: error.message, error };
  }
  res.status(500).send(response);
}

module.exports = error;
