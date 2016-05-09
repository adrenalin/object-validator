import Validator from '../../lib/validator';
import Schema from '../../lib/schema';

import { types, fieldTypes } from '../data';
import { isObject } from '../../lib/primitives';

import should from 'should';
import expect from 'expect.js';

describe('Check schema validation', () => {
  it('should not mind if a non-required field is missing', (done) => {
    let schema = new Schema({
      key: String
    })

    expect(schema.validate({})).to.be(true);
    done();
  });

  it('should mind if a required field is missing', (done) => {
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

  it('should mind if field type is invalid', (done) => {
    let schema = new Schema({
      key: String
    });

    let errors = {};
    expect(schema.validate({key: []}, errors)).to.be(false);
    expect(Object.keys(errors).length).to.be(1);

    done();
  });

  it('should check deep structures', (done) => {
    let schema = new Schema({
      p1: {
        p2: {
          p3: String
        }
      }
    });

    expect(schema.validate({
      p1: {
        p2: {
          p3: 'foo'
        }
      }
    })).to.be(true);

    done();
  });

  it('should check deep structures for required', (done) => {
    let schema = new Schema({
      p1: {
        p2: {
          p3: {
            type: String,
            required: true
          }
        }
      }
    });

    expect(schema.validate({
      p1: {
        p2: {
          p3: 'foo'
        }
      }
    })).to.be(true);

    expect(schema.validate({
      p1: {
        p2: {}
      }
    })).to.be(false);

    done();
  });

  it('should accept any type when type is not explicitly defined', (done) => {
    let schema = new Schema({
      arr: []
    });

    expect(schema.validate({
      arr: [
        'foo',
        'bar'
      ]
    })).to.be(true);

    let data = [];
    for (let i in types) {
      data.push(types[i]);
    }

    expect(schema.validate({
      arr: data
    })).to.be(true);

    done();
  });

  it('should require array key of correct type', (done) => {
    let schema = new Schema({
      arr: [String]
    });

    expect(schema.validate({
      arr: [
        'foo',
        'bar'
      ]
    })).to.be(true);

    expect(schema.validate({
      arr: [
        'foo',
        {
          deep: false
        }
      ]
    })).to.be(false);

    done();
  });

  it('should respect array maximum length', (done) => {
    let schema = new Schema({
      arr: {
        type: Array,
        maxLength: 1
      }
    });

    expect(schema.validate({
      arr: [
        'foo',
        'bar'
      ]
    })).to.be(false);

    done();
  });
});
