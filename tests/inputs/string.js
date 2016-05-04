import Validator from '../../libs/validator';

import { types } from '../data';

import should from 'should';
import expect from 'expect.js';

describe('Check string validation', () => {
  it('Should validate string', (done) => {
    let validator = Validator.get('string');
    expect(validator instanceof Validator.string).to.be(true);
    expect(validator.validate(types.string)).to.be(true);

    for (let i in types) {
      if (i === 'string' || i === 'numberAsString') {
        continue;
      }

      should(() => {
        validator.validate(types[i]);
      }).throw(Error);
    }

    done();
  });

  it('Should min and max lengths', (done) => {
    let validator = Validator.get('string', {
      minLength: 1,
      maxLength: 3
    });

    expect(validator.validate('foo')).to.be(true);

    should(() => {
      validator.validate('');
    }).throw(Error);

    should(() => {
      validator.validate('fooo');
    }).throw(Error);

    done();
  });

  it('Should use regular expressions as strings', (done) => {
    let validator = Validator.get('string', {
      regexp: '^foo$'
    });

    expect(validator.validate('foo')).to.be(true);

    should(() => {
      validator.validate('');
    }).throw(Error);

    should(() => {
      validator.validate('fooo');
    }).throw(Error);

    done();
  });
});
