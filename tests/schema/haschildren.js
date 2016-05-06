import Validator from '../../libs/validator';
import Schema from '../../libs/schema';

import { types, fieldTypes } from '../data';
import { isObject } from '../../libs/primitives';

import should from 'should';
import expect from 'expect.js';

describe('Check schema validation', () => {
  it('Should see that there are no children in a flat object', (done) => {
    expect(Schema.hasChildren({
      foo: String
    })).to.be(false);
    done();
  });

  it('Should see that there are no children in a typed object', (done) => {
    expect(Schema.hasChildren({
      foo: {
        type: String
      }
    })).to.be(false);
    done();
  });

  it('Should see that there are children in an object containing an array', (done) => {
    expect(Schema.hasChildren({
      foo: {
        type: String,
        other: []
      }
    })).to.be(true);
    done();
  });

  it('Should see that there are children in a typed object when it is a parent to an object', (done) => {
    expect(Schema.hasChildren({
      foo: {
        type: String,
        other: {}
      }
    })).to.be(true);
    done();
  });

  it('Should see that there are children in a typed object when there is another typed sibling object', (done) => {
    // Multiple types in one object, key "type" cannot be the field type
    expect(Schema.hasChildren({
      foo: {
        type: String,
        value: String
      }
    })).to.be(true);
    done();
  });

  it('Should see that there are children in an object tree', (done) => {
    expect(Schema.hasChildren({
      foo: {
        bar: String
      }
    })).to.be(true);
    done();
  });

  it('Should see that there are children then an array is present', (done) => {
    expect(Schema.hasChildren({
      foo: [String]
    })).to.be(true);
    done();
  });

  it('Should see that there are children in a deep object', (done) => {
    expect(Schema.hasChildren({
      p1: {
        p2: {
          p3: String
        }
      }
    })).to.be(true);
    done();
  });
});
