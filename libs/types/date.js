import TypeValidator from './validator';
import { isDate } from '../primitives';

export default class TypeDate extends TypeValidator {
  static defaults = {
    min: null,
    max: null
  }

  static fieldType = Date;

  validate(val) {
    if (!isDate(val)) {
      throw new Error('Invalid date');
    }

    if (this.options.min) {
      let min = this.typecast(this.options.min);
      let v = this.typecast(val);

      if (min > v) {
        throw new Error('Date too early');
      }
    }

    if (this.options.max) {
      let max = this.typecast(this.options.max);
      let v = this.typecast(val);

      if (max < v) {
        throw new Error('Date too early');
      }
    }

    return true;
  }

  typecast(val) {
    if (val instanceof Date) {
      return val;
    }

    return new Date(val);
  }

  matchType(t) {
    return TypeDate.matchType(t);
  }

  static matchType(t) {
    if (t === 'date' || t === 'Date' || t === TypeDate.fieldType) {
      return true;
    }

    return false;
  }
}
