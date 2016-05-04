import Validator from '../libs/validator';

exports.types = {
  array: [],
  string: 'foo',
  number: 1.1,
  numberAsString: '1.1',
  integer: 1,
  float: 1.1,
  boolean: true,
  classObject: Validator,
  classInitialized: new Validator(),
  object: {}
};
