/**
 * This file houses all the helper functions to keep the main logic looking clean.
 *
 * @author Daniel DiVenere
 * @since  3/22/20
 */

/**
 * Normalizes routine names
 *
 * @param {string} name The name of the routine to play.
 */
function normalizeName(name) {
  return name.trim().split(' ').map((routineName) => routineName.charAt(0).toUpperCase()
    + routineName.toLowerCase().slice(1)).join(' ');
}

/**
 * Converts hexidecimals to RGB.
 *
 * @param {string} h Hexidecimal to be converted.
 * @returns {Object} An object with the keys r, g, and b set to their numeric values
 */
function convertHex(h) {
  let r = 0; let g = 0; let b = 0;

  if (h.length === 3) {
    r = `0x${h[0]}${h[0]}`;
    g = `0x${h[1]}${h[1]}`;
    b = `0x${h[2]}${h[2]}`;
  } else if (h.length === 6) {
    r = `0x${h[0]}${h[1]}`;
    g = `0x${h[2]}${h[3]}`;
    b = `0x${h[4]}${h[5]}`;
  }
  return { r: +r, g: +g, b: +b };
}

/**
 * Decides whether inputted color is hex or RGB and converts to RGB.
 *
 * @param {string} hex The hexidecimal value.
 * @param {string} colorType Is it hex or rgb?
 * @param {number} r Red.
 * @param {number} g Green.
 * @param {number} b Blue.
 * @returns {Object} Final normalized object in formatted in RGB.
 */
function setColor(hex, colorType, r, g, b) {
  if (colorType === 'hex') {
    return convertHex(hex);
  }

  if (colorType === 'rgb') {
    return {
      r,
      g,
      b,
    };
  }

  return {
    r: undefined,
    g: undefined,
    b: undefined,
  };
}

/**
 * Builds response object based on user input.
 *
 * @param {string} name Name of routine.
 * @param {number} brightness Preferred brightness for routine.
 * @param {string} hex Hex value if provided.
 * @param {string} colorType Hex or RGB?
 * @param {number} r Red, if provided.
 * @param {number} g Green, if provided.
 * @param {number} b Blue, if provided.
 * @param {number} delay Preferred delay for routine.
 * @returns {Object} Response object to be sent back to client.
 */
function makeResponse(name, brightness, hex, colorType, r, g, b, delay) {
  const response = {
    name,
    brightness,
    colorType,
    delay,
  };
  if (colorType === 'hex') {
    response.colorType = colorType;
    response.hex = hex;
  }
  if (colorType === 'rgb') {
    response.colorType = colorType;
    response.rgb = [r, g, b];
  }

  return response;
}

module.exports = {
  normalizeName,
  convertHex,
  setColor,
  makeResponse,
};
