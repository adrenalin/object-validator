exports.isString = function isString(val) {
  if (typeof val === 'string') {
    return true;
  }

  return false;
};

exports.isBoolean = function isBoolean(val) {
  return (typeof val === 'boolean');
};

exports.isNumeric = function isNumeric(val) {
  if (exports.isArray(val)) {
    return false;
  }

  if (exports.isBoolean(val)) {
    return false;
  }

  if (isNaN(val)) {
    return false;
  }
  return true;
};

exports.isNumber = function isNumber(val, strict = true) {
  if (typeof val === 'number') {
    return true;
  }

  if (!strict && exports.isNumeric(val)) {
    return true;
  }

  return false;
};

exports.isArray = function isArray(val) {
  if (Array.isArray(val)) {
    return true;
  }

  return false;
};

exports.isObject = function isObject(val, strict = true) {
  if (typeof val !== 'object') {
    return false;
  }

  if (exports.isArray(val)) {
    return false;
  }

  if (strict && val.constructor.name !== 'Object') {
    return false;
  }

  return true;
};
