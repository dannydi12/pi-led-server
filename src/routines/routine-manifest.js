const { BASEPATH } = require('../../config');

module.exports = {
  'Notify': {
    path: `${BASEPATH}/src/routines/notify.py`,
    description: 'Light swells twice to notify user of something.',
    customOptions: ['brightness', 'color', 'delay']
  },
  'Police Lights': {
    path: `${BASEPATH}/src/routines/police.py`,
    description: 'Simulates police car lights.',
    customOptions: ['brightness', 'delay']
  },
  'Rainbow': {
    path: `${BASEPATH}/src/routines/rainbow.py`,
    description: 'Double rainbow all the way.',
    customOptions: ['brightness']
  },
  'Digital Assistant': {
    path: `${BASEPATH}/src/routines/listening.py`,
    description: 'Simulates police car lights.',
    customOptions: ['brightness', 'color'],
  },
  'Color Fades': {
    path: `${BASEPATH}/src/routines/color-fade.py`,
    description: 'Fades in and out of randomly generated colors.',
    customOptions: ['brightness', 'delay']
  },
  'Color Flashes': {
    path: `${BASEPATH}/src/routines/color-flash.py`,
    description: 'Flashes randomly generated colors.',
    customOptions: ['brightness', 'delay'],
  }
}