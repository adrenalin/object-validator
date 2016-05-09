import TypeValidator from './validator';
import { isBoolean } from '../primitives';

export default class TypeBoolean extends TypeValidator {
  static fieldType = Boolean;

  validate(val) {
    if (!isBoolean(val)) {
      throw new Error('Not a boolean');
    }

    return true;
  }

  matchType(t) {
    return TypeBoolean.matchType(t);
  }

  static matchType(t) {
    if (t === 'bool' || t === 'Bool' || t === 'boolean' || t === 'Boolean' || t === TypeBoolean.fieldType) {
      return true;
    }

    return false;
  }
}
