'use strict';
require('babel-register');
import primitives from './primitives';

import TypeArray from './types/array';
import TypeBoolean from './types/boolean';
import TypeInteger from './types/integer';
import TypeNumber from './types/number';
import TypeObject from './types/object';
import TypeString from './types/string';

let debug = require('debug')('Validator');

export default class Validator {
  static array = TypeArray;
  static boolean = TypeBoolean;
  static number = TypeNumber;
  static integer = TypeInteger;
  static object = TypeObject;
  static string = TypeString;

  constructor() {
    debug('Validator');

    this.validators = {
      array: new Validator.array(),
      boolean: new Validator.boolean(),
      number: new Validator.number(),
      integer: new Validator.integer(),
      object: new Validator.object(),
      string: new Validator.string()
    };

    // Add primitives to the validator
    for (let i in primitives) {
      this[i] = primitives[i];
    }
  }

  static get(t, field = {}) {
    return new Validator[t](field);
  }

  validate(field, value) {

  }

  getType(t) {
    for (let i in this.validators) {
      if (this.validators[i].matchType(t)) {
        return i;
      }
    }

    return null;
  }
}
