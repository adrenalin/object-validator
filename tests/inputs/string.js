import Validator from '../../libs/validator';

import { types } from '../data';

import should from 'should';
import expect from 'expect.js';

describe('String validation', () => {
  it('should validate string', (done) => {
    let validator = Validator.get('string');
    expect(validator instanceof Validator.string).to.be(true);
    expect(validator.validate(types.string)).to.be(true);

    for (let i in types) {
      if (i.match(/string/i)) {
        continue;
      }

      should(() => {
        validator.validate(types[i]);
      }).throw(Error);
    }

    done();
  });

  it('should respect explicit length', (done) => {
    let validator = Validator.get('string', {
      length: 5
    });

    expect(validator.validate('12345')).to.be(true);
    should(() => {
      validator.validate('1234');
    }).throw(Error);
    should(() => {
      validator.validate('123456');
    }).throw(Error);
    done();
  });

  it('should respect min and max lengths', (done) => {
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

  it('should use string for pattern matching', (done) => {
    let validator = Validator.get('string', {
      pattern: '^foo$'
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

  it('should use function for pattern matching', (done) => {
    let validator = Validator.get('string', {
      pattern: function(val) {
        if (val === 'foo') {
          return true;
        }

        return false;
      }
    });

    expect(validator.validate('foo')).to.be(true);
    should(() => {
      validator.validate('bar');
    }).throw(Error);
    done();
  });
});
