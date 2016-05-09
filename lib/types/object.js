import TypeValidator from './validator';
import { isObject } from '../primitives';

export default class TypeObject extends TypeValidator {
  static defaults = {
    children: null
  }

  static fieldType = Object;

  validate(val) {
    if (!isObject(val)) {
      return false;
    }

    return true;
  }

  matchType(t) {
    return TypeObject.matchType(t);
  }

  static matchType(t) {
    if (t === 'object' || t === 'Object' || t === TypeObject.fieldType) {
      return true;
    }

    return false;
  }
}
