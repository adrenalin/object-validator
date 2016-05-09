import Validator from '../../lib/validator';

import { types } from '../data';

import should from 'should';
import expect from 'expect.js';

describe('Check generic number validation', () => {
  it('Should validate number field', (done) => {
    let validator = Validator.get('number');
    expect(validator instanceof Validator.number).to.be(true);
    expect(validator.validate(types.number)).to.be(true);
    expect(validator.validate(types.numberAsString)).to.be(true);
    expect(validator.validate(types.integer)).to.be(true);
    expect(validator.validate(types.float)).to.be(true);

    for (let i in types) {
      if (i === 'number' || i === 'numberAsString' || i === 'integer' || i === 'float') {
        continue;
      }

      should(() => {
        validator.validate(types[i]);
      }).throw(Error);
    }

    done();
  });

  it('Should respect min and max values as well as decimal precision', (done) => {
    let validator = Validator.get('number', {
      min: -1,
      max: 1
    });

    expect(validator.validate(0)).to.be(true);

    should(() => {
      validator.validate(-2);
    }).throw(Error);

    done();
  });

  it('Should respect decimal precisions', (done) => {
    let validator = Validator.get('number', {
      precision: -2
    });

    expect(validator.validate(0.01)).to.be(true);
    should(() => {
      validator.validate(0.001);
    }).throw(Error);
    done();
  });

  it('Should respect large precisions', (done) => {
    let validator = Validator.get('number', {
      precision: 2
    });

    expect(validator.validate(100)).to.be(true);
    should(() => {
      validator.validate(10);
    }).throw(Error);
    done();
  });

  it('Should not accept number as a string in strict mode', (done) => {
    let validator = Validator.get('number', {
      strict: true
    });
    should(() => {
      validator.validate(types.numberAsString);
    }).throw(Error);
    done();
  });
});
