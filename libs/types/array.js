import TypeValidator from './validator';
import { isArray } from '../primitives';

export default class TypeArray extends TypeValidator {
  static defaults = {
    minLength: 0,
    maxLength: Infinity,
    length: null,
    children: null
  }

  static fieldType = Array;

  constructor(opts = {}) {
    super(opts, TypeArray.defaults);
  }

  validate(val) {
    if (!isArray(val)) {
      throw new Error('Not an array');
    }

    if (this.options.length !== null && val.length !== this.options.length) {
      throw new Error(`Length is ${val.length}, accepted length ${this.options.length}`);
    }

    if (Number(this.options.minLength) > val.length) {
      throw new Error(`Length is ${val.length}, required minimum length ${this.options.minLength}`);
    }

    if (Number(this.options.maxLength) < val.length) {
      throw new Error(`Length is ${val.length}, required minimum length ${this.options.maxLength}`);
    }

    return true;
  }

  matchType(t) {
    return TypeArray.matchType(t);
  }

  static matchType(t) {
    if (t === 'array' || t === 'Array' || t === Array) {
      return true;
    }

    return false;
  }
}
