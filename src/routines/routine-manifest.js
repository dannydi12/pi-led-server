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
  'Random Color Fill': {
    path: `${BASEPATH}/src/routines/random-color-fill.py`,
    description: 'Do you long to feel like a child again? Well, this is the routine for you.',
    customOptions: ['brightness', 'delay'],
  },
  'Twinkle': {
    path: `${BASEPATH}/src/routines/twinkle.py`,
    description: 'A routine to accompany the all-time record-breaking hit.',
    customOptions: ['brightness', 'color', 'delay'],
  },
  'Random Twinkle': {
    path: `${BASEPATH}/src/routines/random-twinkle.py`,
    description: 'A routine to accompany the all-time record-breaking hit while in a different state of mind.',
    customOptions: ['brightness', 'delay'],
  },
  'Strobe': {
    path: `${BASEPATH}/src/routines/strobe.py`,
    description: 'Strobe lights. Can be customized to any color. Obvious epilepsy warning.',
    customOptions: ['color'],
  },
  'Scanner': {
    path: `${BASEPATH}/src/routines/scanner.py`,
    description: 'Please stand still while the system invasively scans your body and deepest desires.',
    customOptions: ['brightness', 'color', 'delay'],
  },
  'Colorful Scanner': {
    path: `${BASEPATH}/src/routines/colorful-scanner.py`,
    description: 'Please stand still while the system invasively scans your body and deepest desires (child edition).',
    customOptions: ['brightness', 'delay'],
  },
}