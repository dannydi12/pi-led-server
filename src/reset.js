require('./store');

function reset(req, res, next) {
  const clear = new Promise(resolve => {
    if (isShowing) {
      show.kill('SIGINT');
      show.on('close', resolve);
    }
    else {
      resolve();
    }
  })
  clear.then(() => next());
}

module.exports = reset;