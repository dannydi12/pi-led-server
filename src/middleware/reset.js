/**
 * Resets LED strip based on its state (on/off).
 */
function reset(req, res, next) {
  const clear = new Promise((resolve) => {
    const display = req.app.get('display');

    // If child process has not exited yet
    if (display.exitCode == null) {
      // Send kill signal
      display.kill('SIGINT');

      // Resolve promise when child process dies... like real life
      display.on('close', resolve);
    } else {
      resolve();
    }
  });
  // Move along now
  clear.then(() => next());
}

module.exports = reset;
