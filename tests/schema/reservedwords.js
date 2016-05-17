import Validator from '../../lib/validator';
import Schema from '../../lib/schema';
import TypeValidator from '../../lib/types/validator';

import { types, fieldTypes } from '../data';
import { isObject } from '../../lib/primitives';

import should from 'should';
import expect from 'expect.js';

describe('Reserved words', () => {
  let defaultReserved = TypeValidator.RESERVED_WORDS;

  it('should give only the TypeValidator reserved words for "boolean"', (done) => {
    let s1 = Schema.getReservedWords('boolean');
    expect(s1.length).to.be(defaultReserved.length);
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
