import Validator from '../libs/validator';
import Schema from '../libs/schema';

import { types, testSchema, testInput } from './data';
import { isObject } from '../libs/primitives';

import should from 'should';
import expect from 'expect.js';

describe('Check schema validation', () => {
  let schema = new Schema(testSchema);

  it('Should accept uninitialized schema in the constructor', (done) => {
    should(() => {
      let validator = new Validator(testSchema);
    })
    .not.throw(Error);
    done();
  });

  it('Should accept initialized schema in the constructor', (done) => {
    should(() => {
      let validator = new Validator(schema);

      if (schema !== validator.schema) {
        throw new Error('Schema does not match');
      }
    })
    .not.throw(Error);
    done();
  });

  it('Should accept uninitialized schema in the setSchema method', (done) => {
    should(() => {
      let validator = new Validator();
      validator.setSchema(testSchema);
    })
    .not.throw(Error);
    done();
  });

  it('Should accept initialized schema in the setSchema method', (done) => {
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

  // it('Should validate input in the default schema', (done) => {
  //   let validator = new Validator(schema);
  //   validator.validate(testInput);
  //   done();
  // });
});
