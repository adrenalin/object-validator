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

import Schema from './schema';

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

  get(t, field = {}) {
    return Validator.get(t, field);
  }

  static get(t, field = {}) {
    return new Validator[t](field);
  }

  validate(schema, input) {
    if (schema instanceof Schema) {
      this.schema = schema;
    } else {
      this.schema = new Schema(schema);
    }
  }

  /**
   * Match the input field type to the validator type. This method is a
   * short hand for Validator.getType
   *
   * @param mixed t    Object type name or constructor
   * @return string    Matching validator type
   */
  getType(t) {
    return Validator.getType(t);
  }

  /**
   * Match the input field type to the validator type
   *
   * @param mixed t    Object type name or constructor
   * @return string    Matching validator type
   */
  static getType(t) {
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
