function reset(req, res, next) {
  const clear = new Promise((resolve) => {
    const display = req.app.get('display');
    if (display.exitCode == null) {
      display.kill('SIGINT');
      display.on('close', resolve);
    } else {
      resolve();
    }
  });
  clear.then(() => next());
}

module.exports = reset;
