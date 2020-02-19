const { basePath } = require('../store');

module.exports = {
  'Notify': {
    path: `${basePath}/src/routines/notify.py`,
    description: 'Light swells twice to notify user of something.',
    customOptions: ['brightness', 'color', 'delay']
  },
  'Police Lights': {
    path: `${basePath}/src/routines/police.py`,
    description: 'Simulates police car lights.',
    customOptions: ['brightness', 'delay']
  },
  'Rainbow': {
    path: `${basePath}/src/routines/rainbow.py`,
    description: 'Double rainbow all the way.',
    customOptions: ['brightness']
  },
  'Digital Assistant': {
    path: `${basePath}/src/routines/listening.py`,
    description: 'Simulates police car lights.',
    customOptions: ['brightness', 'color'],
  },
  'Color Fades': {
    path: `${basePath}/src/routines/color-fade.py`,
    description: 'Fades in and out of randomly generated colors.',
    customOptions: ['brightness', 'delay']
  },
  'Color Flashes': {
    path: `${basePath}/src/routines/color-flash.py`,
    description: 'Flashes randomly generated colors.',
    customOptions: ['brightness', 'delay'],
  }
}