/**
 * Just starts the server and spawns a child process to start the LEDs.
 *
 * @file   This files initiates the server.
 * @author Daniel DiVenere
 * @since  3/22/20
 */

const { spawn } = require('child_process');
const app = require('./app');
const { PORT, BASEPATH } = require('../config');

// Spawn child process to display boot up routine
app.set('display', spawn('python', [`${BASEPATH}/src/routines/bootup.py`]));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
