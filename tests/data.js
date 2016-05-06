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

// Key-value pairs with email and expected validation status
exports.emails = {
  'email@domain.com': true,
  'firstname.lastname@domain.com': true,
  'email@subdomain.domain.com': true,
  'firstname+lastname@domain.com': true,
  'email@123.123.123.123': true,
  'email@[123.123.123.123]': true,
  '“email”@domain.com': true,
  '1234567890@domain.com': true,
  'email@domain-one.com': true,
  '_______@domain.com': true,
  'email@domain.name': true,
  'email@domain.co.jp': true,
  'firstname-lastname@domain.com': true,

  'plainaddress': false,
  '#@%^%#$@#$@#.com': false,
  '@domain.com': false,
  'Joe Smith <email@domain.com>': false,
  'email.domain.com': false,
  'email@domain@domain.com': false,
  '.email@domain.com': false,
  'email.@domain.com': false,
  'email..email@domain.com': false,
  'あいうえお@domain.com': false,
  'email@domain.com (Joe Smith)': false,
  'email@domain': false,
  'email@-domain.com': false,
  'email@domain.web': false,
  'email@111.222.333.44444': false,
  'email@domain..com': false
};

exports.fieldTypes = {
  string: String,
  number: Number,
  boolean: Boolean,
  array: Array
};

exports.testSchema = {
  firstname: {
    type: String,
    required: true,
    pattern: /^[a-z]+$/i
  },
  lastname: {
    type: String,
    required: true,
    pattern: /^[a-z\-]+$/i
  },
  email: {
    type: String,
    required: false,
    pattern: /^[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
  }
};
