import Validator from '../../libs/validator';

import { types } from '../data';

import should from 'should';
import expect from 'expect.js';

describe('Check array validation', () => {
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
