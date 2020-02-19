const app = require('./app');
const { PORT, BASEPATH } = require('../config');
const { spawn } = require('child_process');

app.set('display', spawn('python', [`${BASEPATH}/src/routines/main.py`, '-b 20']))

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
