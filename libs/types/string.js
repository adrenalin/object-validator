import TypeValidator from './validator';
import { isString } from '../primitives';

export default class TypeString extends TypeValidator {
  static defaults = {
    minLength: 0,
    maxLength: Infinity,
    pattern: null
  }

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
    if (t === 'str' || t === 'Str' || t === 'string' || t === 'String' || t === String) {
      return true;
    }

    return false;
  }
}
