function reset(req, res, next) {
  const clear = new Promise(resolve => {
    const led = {
      display: req.app.get('display')
    }
    if (led.display.exitCode == null) {
      led.display.kill('SIGINT');
      led.display.on('close', resolve);
    }
    else {
      resolve();
    }
  })
  clear.then(() => next());
}

module.exports = reset;