import Validator from '../../lib/validator';
import Schema from '../../lib/schema';

import { types, emails } from '../data';

import should from 'should';
import expect from 'expect.js';

describe('Check email validation', () => {
  it('Should validate email address', (done) => {
    let validator = Validator.get('email');

    expect(validator instanceof Validator.email).to.be(true);
    done();
  });
});
