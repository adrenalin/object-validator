import Validator from '../../libs/validator';
import Schema from '../../libs/schema';

import { types, fieldTypes } from '../data';
import { isObject } from '../../libs/primitives';

import should from 'should';
import expect from 'expect.js';

describe('Check schema validation', () => {
  it('Should not mind if a non-required field is missing', (done) => {
    let schema = new Schema({
      key: String
    })

    expect(schema.validate({})).to.be(true);
    done();
  });

  it('Should mind if a required field is missing', (done) => {
    let schema = new Schema({
      key: {
        type: String,
        required: true
      }
    });

    let errors = {};
    expect(schema.validate({}, errors)).to.be(false);
    expect(Object.keys(errors).length).to.be(1);

    done();
  });

  it('Should mind if field type is invalid', (done) => {
    let schema = new Schema({
      key: String
    });

    let errors = {};
    expect(schema.validate({key: []}, errors)).to.be(false);
    expect(Object.keys(errors).length).to.be(1);

    done();
  });

  it('Should check deep structures', (done) => {
    let schema = new Schema({
      p1: {
        p2: {
          p3: String
        }
      }
    });
    console.log('schema', schema);
    expect(schema.validate({
      p1: {
        p2: {
          p3: 'foo'
        }
      }
    })).to.be(true);

    done();
  });
});
