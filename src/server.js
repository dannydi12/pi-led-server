const { spawn } = require('child_process');
const app = require('./app');
const { PORT, BASEPATH } = require('../config');

app.set('display', spawn('python', [`${BASEPATH}/src/routines/bootup.py`]));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
