import Validator from '../../libs/validator';

import { types } from '../data';

import should from 'should';
import expect from 'expect.js';

describe('Check integer validation', () => {
  it('Should validate an integer field', (done) => {
    let validator = Validator.get('integer');
    expect(validator instanceof Validator.integer).to.be(true);
    expect(validator.validate(types.integer)).to.be(true);

    for (let i in types) {
      if (i === 'integer') {
        continue;
      }

      should(() => {
        validator.validate(types[i]);
      }).throw(Error);
    }

    done();
  });

  it('Should respect min and max values as well as decimal precision', (done) => {
    let validator = Validator.get('integer', {
      min: -1,
      max: 1
    });

    expect(validator.validate(0)).to.be(true);

    should(() => {
      validator.validate(-2);
    }).throw(Error);

    done();
  });

  it('Should disallow decimals', (done) => {
    let validator = Validator.get('integer');

    should(() => {
      validator.validate(0.001);
    }).throw(Error);
    done();
  });

  it('Should respect large precisions', (done) => {
    let validator = Validator.get('integer', {
      precision: 2
    });

    expect(validator.validate(100)).to.be(true);
    should(() => {
      validator.validate(10);
    }).throw(Error);
    done();
  });
});
