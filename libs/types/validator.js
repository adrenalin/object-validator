export default class TypeValidator {
  static defaults = {};

  constructor(opts = {}, defaults) {
    this.options = Object.assign({}, defaults, opts);
  }

  validate() {
    throw new Error(`${this.constructor.name} uses the default validate`);
  }

  matchType(t) {
    throw new Error(`${this.constructor.name} uses the default matchType`);
  }
}
