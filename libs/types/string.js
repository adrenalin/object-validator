import TypeValidator from './validator';
import { isInteger, isString } from '../primitives';

export default class TypeString extends TypeValidator {
  static defaults = {
    minLength: 0,
    maxLength: Infinity,
    length: null,
    pattern: null
  }

  static fieldType = String;

  getPattern(pattern) {
    if (pattern instanceof RegExp) {
      return pattern;
    }

    if (typeof pattern === 'function') {
      return pattern;
    }

    return new RegExp(pattern);
  }

  validate(val) {
    if (!isString(val)) {
      throw new Error('Not a string');
    }

    if (isInteger(this.options.length) && this.options.length !== val.length) {
      throw new Error('String length mismatch');
    }

    if (this.options.minLength > val.length) {
      throw new Error('String too short');
    }

    if (this.options.maxLength < val.length) {
      throw new Error('String too long');
    }

    if (this.options.pattern) {
      let r = this.getPattern(this.options.pattern);

      if (typeof r === 'function') {
        if (!r(val)) {
          throw new Error('Failed pattern callback match');
        }
      } else if (!r.test(val)) {
        throw new Error('Failed pattern match');
      }
    }

    return true;
  }

  matchType(t) {
    return TypeString.matchType(t);
  }

  static matchType(t) {
    if (t === 'str' || t === 'Str' || t === 'string' || t === 'String' || t === TypeString.fieldType) {
      return true;
    }

    return false;
  }
}
