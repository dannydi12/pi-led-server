const { BASEPATH } = require('../../config');

module.exports = {
  'Notify': {
    path: `${BASEPATH}/src/routines/notify.py`,
    description: 'Light swells twice to notify user of something.',
    customOptions: ['brightness', 'color', 'delay']
  },
  'Siren': {
    path: `${BASEPATH}/src/routines/police.py`,
    description: 'Simulates police car lights.',
    customOptions: ['brightness', 'delay']
  },
  'Rainbow': {
    path: `${BASEPATH}/src/routines/rainbow.py`,
    description: 'Double rainbow all the way.',
    customOptions: ['brightness']
  },
  'Listening': {
    path: `${BASEPATH}/src/routines/listening.py`,
    description: 'Can be used to show a digital assistant is awaiting a command.',
    customOptions: ['brightness', 'color'],
  },
  'Not Listening': {
    path: `${BASEPATH}/src/routines/not-listening.py`,
    description: 'Can be used to show a digital assistant is no longer awaiting a command.',
    customOptions: ['brightness', 'color'],
  },
  'Color Fade': {
    path: `${BASEPATH}/src/routines/color-fade.py`,
    description: 'Fades in and out of randomly generated colors.',
    customOptions: ['brightness', 'delay']
  },
  'Color Flash': {
    path: `${BASEPATH}/src/routines/color-flash.py`,
    description: 'Flashes randomly generated colors.',
    customOptions: ['brightness', 'delay'],
  },
  'Set Color': {
    path: `${BASEPATH}/src/routines/set-color.py`,
    description: 'Speaks for itself.',
    customOptions: ['brightness', 'color'],
  },
  'Color Wipe': {
    path: `${BASEPATH}/src/routines/color-wipes.py`,
    description: 'Random colors will wipe across the display. Soothing.',
    customOptions: ['brightness', 'color', 'delay'],
  },
  'Strobe': {
    path: `${BASEPATH}/src/routines/strobe.py`,
    description: 'Strobe lights. Can be customized to any color. Obvious epilepsy warning.',
    customOptions: ['color'],
  },
}