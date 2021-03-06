import TypeValidator from './validator';
import { isNumber, isDate } from '../primitives';

export default class TypeNumber extends TypeValidator {
  static defaults = {
    min: -Infinity,
    max: Infinity,
    precision: null,
    strict: false
  }

  static fieldType = Number

  constructor(opts) {
    super(opts, TypeNumber.defaults);
  }

  validate(val) {
    if (!isNumber(val, this.options.strict)) {
      throw new Error('Not numeric');
    }

    if (val instanceof Date) {
      throw new Error('Value is a date');
    }

    if (this.options.precision !== null) {
      let r = Math.pow(10, this.options.precision);
      let s = val / r;

      if (s % 1) {
        throw new Error('Precision mismatch');
      }
    }

    if (this.options.min > val) {
      throw new Error('Value too high');
    }

    if (this.options.max < val) {
      throw new Error('Value too low');
    }

    return true;
  }

  matchType(t) {
    return TypeNumber.matchType(t);
  }

  static matchType(t) {
    if (t === 'number' || t === 'Number' || t === TypeNumber.fieldType) {
      return true;
    }

    if (t === 'float' || t === 'Float') {
      return true;
    }

    return false;
  }
}
