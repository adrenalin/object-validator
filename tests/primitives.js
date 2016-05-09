import Validator from '../lib/validator';

import { types } from './data';

import should from 'should';
import expect from 'expect.js';

describe('Check type', () => {
  it('should detect a boolean', (done) => {
    let validator = new Validator();
    expect(validator.isBoolean(types.array)).to.be(false);
    expect(validator.isBoolean(types.string)).to.be(false);
    expect(validator.isBoolean(types.number)).to.be(false);
    expect(validator.isBoolean(true)).to.be(true);
    expect(validator.isBoolean(false)).to.be(true);
    expect(validator.isBoolean(types.date)).to.be(false);
    expect(validator.isBoolean(types.classObject)).to.be(false);
    expect(validator.isBoolean(types.classInitialized)).to.be(false);
    expect(validator.isBoolean(types.object)).to.be(false);
    done();
  });

  it('should detect a string', (done) => {
    let validator = new Validator();
    expect(validator.isString(types.array)).to.be(false);
    expect(validator.isString(types.string)).to.be(true);
    expect(validator.isString(types.number)).to.be(false);
    expect(validator.isString(types.boolean)).to.be(false);
    expect(validator.isString(types.date)).to.be(false);
    expect(validator.isString(types.classObject)).to.be(false);
    expect(validator.isString(types.classInitialized)).to.be(false);
    expect(validator.isString(types.object)).to.be(false);
    done();
  });

  it('should detect a number', (done) => {
    let validator = new Validator();
    expect(validator.isNumber(types.array)).to.be(false);
    expect(validator.isNumber(types.string)).to.be(false);
    expect(validator.isNumber(types.number)).to.be(true);
    expect(validator.isNumber(Infinity)).to.be(true);
    expect(validator.isNumber(Math.PI)).to.be(true);
    expect(validator.isNumber(types.numberAsString)).to.be(false);
    expect(validator.isNumber(types.boolean)).to.be(false);
    expect(validator.isNumber(types.date)).to.be(false);
    expect(validator.isNumber(types.classObject)).to.be(false);
    expect(validator.isNumber(types.classInitialized)).to.be(false);
    expect(validator.isNumber(types.object)).to.be(false);
    done();
  });

  it('should detect an array', (done) => {
    let validator = new Validator();
    expect(validator.isArray(types.array)).to.be(true);
    expect(validator.isArray(types.string)).to.be(false);
    expect(validator.isArray(types.number)).to.be(false);
    expect(validator.isArray(types.boolean)).to.be(false);
    expect(validator.isArray(types.date)).to.be(false);
    expect(validator.isArray(types.classObject)).to.be(false);
    expect(validator.isArray(types.classInitialized)).to.be(false);
    expect(validator.isArray(types.object)).to.be(false);
    done();
  });

  it('should detect an object', (done) => {
    let validator = new Validator();
    expect(validator.isObject(undefined)).to.be(false);
    expect(validator.isObject(types.array)).to.be(false);
    expect(validator.isObject(types.string)).to.be(false);
    expect(validator.isObject(types.number)).to.be(false);
    expect(validator.isObject(types.boolean)).to.be(false);
    expect(validator.isObject(types.date)).to.be(false);
    expect(validator.isObject(types.object)).to.be(true);
    expect(validator.isObject(types.classObject)).to.be(false);
    expect(validator.isObject(types.classInitialized)).to.be(false);

    // Initialized class may be true if strict object checking is false
    expect(validator.isObject(types.classInitialized, false)).to.be(true);
    done();
  });

  it('should detect a numeric', (done) => {
    let validator = new Validator();
    expect(validator.isNumeric(types.array)).to.be(false);
    expect(validator.isNumeric(types.string)).to.be(false);
    expect(validator.isNumeric(types.number)).to.be(true);
    expect(validator.isNumeric(Infinity)).to.be(true);
    expect(validator.isNumeric(Math.PI)).to.be(true);
    expect(validator.isNumeric(types.numberAsString)).to.be(true);
    expect(validator.isNumeric(types.boolean)).to.be(false);
    expect(validator.isNumeric(types.date)).to.be(false);
    expect(validator.isNumeric(types.object)).to.be(false);
    expect(validator.isNumeric(types.classObject)).to.be(false);
    expect(validator.isNumeric(types.classInitialized)).to.be(false);
    done();
  });

  it('should detect an integer', (done) => {
    let validator = new Validator();
    expect(validator.isInteger(types.array)).to.be(false);
    expect(validator.isInteger(types.string)).to.be(false);
    expect(validator.isInteger(types.integer)).to.be(true);
    expect(validator.isInteger(types.number)).to.be(false);
    expect(validator.isInteger(Infinity)).to.be(false);
    expect(validator.isInteger(Math.PI)).to.be(false);
    expect(validator.isInteger(types.numberAsString)).to.be(false);
    expect(validator.isInteger(types.boolean)).to.be(false);
    expect(validator.isInteger(types.date)).to.be(false);
    expect(validator.isInteger(types.object)).to.be(false);
    expect(validator.isInteger(types.classObject)).to.be(false);
    expect(validator.isInteger(types.classInitialized)).to.be(false);
    done();
  });

  it('should detect a date', (done) => {
    let validator = new Validator();
    expect(validator.isDate(types.array)).to.be(false);
    expect(validator.isDate(types.string)).to.be(false);
    expect(validator.isDate(types.integer)).to.be(true);
    expect(validator.isDate(types.number)).to.be(true);
    expect(validator.isDate(Infinity)).to.be(false);
    expect(validator.isDate(Math.PI)).to.be(true);
    expect(validator.isDate(types.numberAsString)).to.be(true);
    expect(validator.isDate(types.date)).to.be(true);
    expect(validator.isDate(types.dateAsString)).to.be(true);
    expect(validator.isDate(types.dateWithTimeAsString)).to.be(true);
    expect(validator.isDate(types.boolean)).to.be(false);
    expect(validator.isDate(types.object)).to.be(false);
    expect(validator.isDate(types.classObject)).to.be(false);
    expect(validator.isDate(types.classInitialized)).to.be(false);
    done();
  });
});
