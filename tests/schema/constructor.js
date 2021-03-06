import Validator from '../../lib/validator';
import Schema from '../../lib/schema';

import { types, fieldTypes } from '../data';
import { isObject } from '../../lib/primitives';

import should from 'should';
import expect from 'expect.js';

describe('Check schema validation', () => {
  it('Should verify if input is schema or not', (done) => {
    let schema = new Schema();
    expect(Schema.isSchema(schema)).to.be(true);
    done();
  });

  it('Should accept plain object in the constructor and setSchema methods', (done) => {
    should(() => {
      let schema = new Schema({});
    }).not.throw(Error);

    should(() => {
      let schema = new Schema();
      schema.setSchema({});
    }).not.throw(Error);

    should(() => {
      let schema = new Schema({
        test: new Schema()
      });
    }).not.throw(Error);

    should(() => {
      let schema = new Schema();
      schema.setSchema({
        test: new Schema()
      });
    }).not.throw(Error);
    done();
  });

  it('Should not accept any other type for the constructor', (done) => {
    for (let i in types) {
      if (isObject(types[i])) {
        continue;
      }

      should(() => {
        let schema = new Schema(types[i]);
      }).throw(Error);

      should(() => {
        let schema = new Schema();
        schema.setSchema(types[i]);
      }).throw(Error);
    }
    done();
  });

  it('Should accept string type', (done) => {
    for (let k in fieldTypes) {
      should(() => {
        new Schema({
          test: k
        });
      }).not.throw(Error);
    }
    done();
  });

  it('Should accept constructor type', (done) => {
    for (let k in fieldTypes) {
      should(() => {
        new Schema({
          test: fieldTypes[k]
        });
      }).not.throw(Error);
    }
    done();
  });

  it('Should accept string type with type defined explicitly', (done) => {
    for (let k in fieldTypes) {
      should(() => {
        new Schema({
          test: {
            type: k
          }
        });
      }).not.throw(Error);
    }
    done();
  });

  it('Should accept constructor type with type defined explicitly', (done) => {
    for (let k in fieldTypes) {
      should(() => {
        new Schema({
          test: {
            type: fieldTypes[k]
          }
        });
      }).not.throw(Error);
    }

    let schema = new Schema({
      name: String,
      parents: [String]
    });
    done();
  });
});
