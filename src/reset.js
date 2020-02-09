function reset(req, res, next) {
  const clear = new Promise(resolve => {
    if (isDisplaying) {
      display.kill('SIGINT');
      display.on('close', resolve);
    }
    else {
      resolve();
    }
  })
  clear.then(() => next());
}

module.exports = reset;