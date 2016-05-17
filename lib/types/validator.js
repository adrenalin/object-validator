export default class TypeValidator {
  static defaults = {};
  static RESERVED_WORDS = [
    'required',
    'default',
    'type'
  ];

  constructor(opts = {}, defaults = {}) {
    this.options = Object.assign({}, defaults, opts);
  }

  validate() {
    throw new Error(`${this.constructor.name} uses the default validate`);
  }

  matchType(t) {
    throw new Error(`${this.constructor.name} uses the default matchType`);
  }

  static matchType(t) {
    throw new Error(`${this.constructor.name} uses the default matchType`);
  }
}
