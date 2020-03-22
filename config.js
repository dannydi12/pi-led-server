/**
 * Configures settings.
 *
 * @author Daniel DiVenere
 * @since  3/22/20
 */

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  BASEPATH: process.cwd(),
  API_KEY: process.env.API_KEY,
};
