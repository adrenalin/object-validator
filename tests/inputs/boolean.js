import Validator from '../../lib/validator';

import { types } from '../data';

import should from 'should';
import expect from 'expect.js';

describe('Check boolean validation', () => {
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
