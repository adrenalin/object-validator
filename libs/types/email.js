import TypeString from './string';
import { isString } from '../primitives';

export default class TypeEmail extends TypeString {
  static defaults = {
    minLength: 0,
    maxLength: 254,
    pattern: (input) => {
      let parts = input.split('@');
      return true;
    }
  }

  matchType(t) {
    return TypeEmail.matchType(t);
  }

  static matchType(t) {
    if (t === 'email' || t === 'Email') {
      return true;
    }

    return false;
  }
}
