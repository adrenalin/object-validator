import Validator from '../../libs/validator';

import should from 'should';
import expect from 'expect.js';

describe('Check boolean validation', () => {
  let types = {
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

  it('Should validate a boolean field', (done) => {
    let validator = Validator.get('boolean');
    expect(validator instanceof Validator.boolean).to.be(true);
    expect(validator.validate(true)).to.be(true);
    expect(validator.validate(false)).to.be(true);

    for (let i in types) {
      if (i === 'boolean') {
        continue;
      }

      should(() => {
        validator.validate(types[i]);
      }).throw(Error);
    }

    done();
  });
});
