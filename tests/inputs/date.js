import Validator from '../../lib/validator';

import { types } from '../data';

import should from 'should';
import expect from 'expect.js';

describe('Date validation', () => {
  let invalidDates = [
    types.array,
    types.string,
    types.boolean,
    types.object
  ];

  invalidDates.map((val) => {
    it(`should reject non-date values for "${val}"`, (done) => {
      let validator = Validator.get('date');
      should(() => {
        validator.validate(val);
      }).throw(Error);
      done();
    });
  });

  it('should validate date object', (done) => {
    let validator = Validator.get('date');
    expect(validator instanceof Validator.date).to.be(true);
    expect(validator.validate(types.date)).to.be(true);
    expect(validator.validate(types.dateAsString)).to.be(true);
    expect(validator.validate(types.dateWithTimeAsString)).to.be(true);
    done();
  });

  it('should respect min option (given as a string)', (done) => {
    let validator = Validator.get('date', {
      min: '2016-05-09'
    });
    should(() => {
      validator.validate('2015-05-09');
    }).throw(Error);
    done();
  });

  it('should respect max option (given as a string)', (done) => {
    let validator = Validator.get('date', {
      max: '2016-05-09'
    });
    should(() => {
      validator.validate('2017-05-09');
    }).throw(Error);
    done();
  });
});
