import TypeValidator from './validator';
import { isString } from '../primitives';

export default class TypeString extends TypeValidator {
  static defaults = {
    minLength: 0,
    maxLength: Infinity,
    regexp: null
  }

  getRegExp(regexp) {
    if (regexp instanceof RegExp) {
      return regexp;
    }

    return new RegExp(regexp);
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

    if (this.options.regexp) {
      let r = this.getRegExp(this.options.regexp);

      if (!r.test(val)) {
        throw new Error('Failed regular expression check');
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
