import TypeNumber from './number';

export default class TypeInteger extends TypeNumber {
  constructor(opts) {
    super(opts);

    if (!this.options.precision || this.options.precision < 0) {
      this.options.precision = 0;
    }
  }

  matchType(t) {
    if (t === 'integer' || t === 'Integer' || t === 'int' || t === 'Int') {
      return true;
    }

    return false;
  }
}
