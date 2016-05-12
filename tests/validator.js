import Validator from '../lib/validator';
import Schema from '../lib/schema';

import { types, testSchema, testInput } from './data';
import { isObject } from '../lib/primitives';

import should from 'should';
import expect from 'expect.js';

describe('Check schema validation', () => {
  let schema = new Schema(testSchema);

  it('should accept uninitialized schema in the constructor', (done) => {
    should(() => {
      let validator = new Validator(testSchema);
    })
    .not.throw(Error);
    done();
  });

  it('should accept initialized schema in the constructor', (done) => {
    should(() => {
      let validator = new Validator(schema);

      if (schema !== validator.schema) {
        throw new Error('Schema does not match');
      }
    })
    .not.throw(Error);
    done();
  });

  it('should accept uninitialized schema in the setSchema method', (done) => {
    should(() => {
      let validator = new Validator();
      validator.setSchema(testSchema);
    })
    .not.throw(Error);
    done();
  });

  it('should accept initialized schema in the setSchema method', (done) => {
    should(() => {
      let validator = new Validator();
      validator.setSchema(schema);

      if (schema !== validator.schema) {
        throw new Error('Schema does not match');
      }
    })
    .not.throw(Error);
    done();
  });

  it('should pass the "allowForeign" from validator to schema', (done) => {
    let s = new Schema({
      foo: String
    })
    let validator = new Validator();
    validator.setSchema(s);
    validator.allowForeign = true;
    expect(validator.validate({
      bar: 'foobar'
    })).to.be(true);
    expect(validator.schema.allowForeign).to.be(true);
    done();
  });
});
