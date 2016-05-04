import TypeValidator from './validator';
import { isObject } from '../primitives';

export default class TypeObject extends TypeValidator {
  validate(val) {
    if (!isObject(val)) {
      return false;
    }

    return true;
  }

  matchType(t) {
    if (t === 'object' || t === 'Object' || t === Object) {
      return true;
    }

    return false;
  }
}
