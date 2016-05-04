import Validator from '../../libs/validator';

import should from 'should';
import expect from 'expect.js';

describe('Check array validation', () => {
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

  it('Should validate an empty array field', (done) => {
    let validator = Validator.get('array');
    expect(validator instanceof Validator.array).to.be(true);
    expect(validator.validate([])).to.be(true);

    for (let i in types) {
      if (i === 'array') {
        continue;
      }

      should(() => {
        validator.validate(types[i]);
      }).throw(Error);
    }

    done();
  });

  it('Should validate configured array length', (done) => {
    let validator = Validator.get('array', {
      length: 1
    });

    expect(validator.validate(['foo'])).to.be(true);

    should(() => {
      validator.validate([])
    })
    .throw(Error);

    should(() => {
      validator.validate(['foo', 'bar'])
    })
    .throw(Error);

    done();
  });
});
