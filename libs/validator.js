'use strict';
require('babel-register');
import primitives from './primitives';

import TypeArray from './types/array';
import TypeBoolean from './types/boolean';
import TypeEmail from './types/email';
import TypeInteger from './types/integer';
import TypeNumber from './types/number';
import TypeObject from './types/object';
import TypeString from './types/string';

let debug = require('debug')('Validator');

export default class Validator {
  static array = TypeArray;
  static boolean = TypeBoolean;
  static email = TypeEmail;
  static number = TypeNumber;
  static integer = TypeInteger;
  static object = TypeObject;
  static string = TypeString;

  constructor() {
    // Add primitives to the validator
    for (let i in primitives) {
      this[i] = primitives[i];
    }
  }

  static get(t, field = {}) {
    return new Validator[t](field);
  }

  validate(schema, input) {

  }

  getType(t) {
    let types = Object.keys(Validator);
    for (let i in types) {
      let v = types[i];
      if (typeof Validator[v].matchType !== 'function') {
        continue;
      }

      if (Validator[v].matchType(t)) {
        return v;
      }
    }

    return null;
  }
}
