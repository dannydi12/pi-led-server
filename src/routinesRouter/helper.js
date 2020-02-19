function normalizeName(name) {
  return name.trim().split(' ').map(routineName =>
    routineName.charAt(0).toUpperCase() + routineName.toLowerCase().slice(1)
  )
    .join(' ')
}

function convertHex(h) {
  let r = 0, g = 0, b = 0;

  if (h.length == 3) {
    r = "0x" + h[0] + h[0];
    g = "0x" + h[1] + h[1];
    b = "0x" + h[2] + h[2];

  } else if (h.length == 6) {
    r = "0x" + h[0] + h[1];
    g = "0x" + h[2] + h[3];
    b = "0x" + h[4] + h[5];
  }
  return { r: +r, g: +g, b: +b };
}

function setColor(hex, colorType, r, g, b) {
  if (colorType === 'hex') {
    return convertHex(hex);
  }
  else if (colorType === 'rgb') {
    return {
      r,
      g,
      b
    }
  }
  else {
    return {
      r: undefined,
      g: undefined,
      b: undefined
    }
  }
}

function makeResponse(name, brightness, hex, colorType, r, g, b, delay) {
  const response = {
    name,
    brightness,
    colorType,
    delay
  }
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
  makeResponse
};