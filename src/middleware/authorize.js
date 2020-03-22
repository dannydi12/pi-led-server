/**
 * This file verifies the API key and raises red flags if anything seems wrong.
 * Not the most secure way to protect endpoints, keep this server on your local network.
 *
 * @author Daniel DiVenere
 * @since  3/22/20
 */

const { API_KEY } = require('../../config');

/**
 * Verifies API key and sends back 401s if it's missing or incorrect.
 */
function authorize(req, res, next) {
  const apiKey = req.headers.authorization;

  // Send 401 if there is no API key provided
  if (!apiKey) {
    return res.status(401).send('Please provide an API key');
  }

  // Send 401 if the API keys don't match
  if (apiKey !== API_KEY) {
    return res.status(401).end();
  }

  return next();
}

module.exports = authorize;
