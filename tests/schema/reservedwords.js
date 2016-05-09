import Validator from '../../libs/validator';
import Schema from '../../libs/schema';
import TypeValidator from '../../libs/types/validator';

import { types, fieldTypes } from '../data';
import { isObject } from '../../libs/primitives';

import should from 'should';
import expect from 'expect.js';

describe('Reserved words', () => {
  it('should give "type" and "required" for "boolean"', (done) => {
    let s1 = Schema.getReservedWords('boolean');
    expect(s1.length).to.be(2);
    expect(s1[0]).to.be('type');
    done();
  });

  it('should give the same for both "boolean" and Boolean', (done) => {
    let s1 = Schema.getReservedWords(Boolean);
    let s2 = Schema.getReservedWords('boolean');
    expect(s1).to.eql(s2);
    done();
  });

  Object.keys(Validator).map((fieldType) => {
    // Skip non-validator field types
    if (!(Validator[fieldType].prototype instanceof TypeValidator)) {
      return;
    }

    it(`should give the same keys as default options are for "${fieldType}"`, (done) => {
      let s1 = Schema.getReservedWords(fieldType);
      let s2 = Object.keys(Validator[fieldType].defaults);

      for (let i in s2) {
        expect(s1.indexOf(s2[i])).not.to.be(-1);
      }

      done();
    });
  });
});
