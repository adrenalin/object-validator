import Validator from '../libs/validator';

import should from 'should';
import expect from 'expect.js';

describe('Check type resolving', () => {
  let validator = new Validator();
  it('Should return boolean when requesting boolean', (done) => {
    expect(validator.getType('boolean')).to.be('boolean');
    expect(validator.getType('Boolean')).to.be('boolean');
    expect(validator.getType(Boolean)).to.be('boolean');
    expect(validator.getType('bOOlean')).not.to.be('boolean');
    done();
  });

  it('Should return string when requesting string', (done) => {
    expect(validator.getType('string')).to.be('string');
    expect(validator.getType('String')).to.be('string');
    expect(validator.getType(String)).to.be('string');
    expect(validator.getType('strIng')).not.to.be('string');
    done();
  });

  it('Should return number when requesting number', (done) => {
    expect(validator.getType('number')).to.be('number');
    expect(validator.getType('Number')).to.be('number');
    expect(validator.getType(Number)).to.be('number');
    expect(validator.getType('nUmber')).not.to.be('number');
    done();
  });

  it('Should return number when requesting float', (done) => {
    expect(validator.getType('float')).to.be('number');
    expect(validator.getType('Float')).to.be('number');
    expect(validator.getType('fLoat')).not.to.be('number');
    done();
  });

  it('Should return integer when requesting integer', (done) => {
    expect(validator.getType('integer')).to.be('integer');
    expect(validator.getType('int')).to.be('integer');
    expect(validator.getType('Integer')).to.be('integer');
    expect(validator.getType('Int')).to.be('integer');
    expect(validator.getType(Number)).not.to.be('integer');
    expect(validator.getType('iNteger')).not.to.be('integer');
    done();
  });

  it('Should return array when requesting array', (done) => {
    expect(validator.getType('array')).to.be('array');
    expect(validator.getType('Array')).to.be('array');
    expect(validator.getType(Array)).to.be('array');
    expect(validator.getType('aRray')).not.to.be('array');
    done();
  });

  it('Should return object when requesting object', (done) => {
    expect(validator.getType('object')).to.be('object');
    expect(validator.getType('Object')).to.be('object');
    expect(validator.getType(Object)).to.be('object');
    expect(validator.getType('objEct')).not.to.be('object');
    done();
  });

  it('Should return date when requesting date', (done) => {
    expect(validator.getType('date')).to.be('date');
    expect(validator.getType('Date')).to.be('date');
    expect(validator.getType(Date)).to.be('date');
    expect(validator.getType('dAte')).not.to.be('date');
    done();
  });
});
