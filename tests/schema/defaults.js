import Validator from '../../lib/validator';
import Schema from '../../lib/schema';

import should from 'should';
import expect from 'expect.js';

describe('Defaults', () => {
  let defaultValue = 'foobar';

  it('should throw an error when trying to use a non-object structure', (done) => {
    should(() => {
      Schema.setDefaults(null, null);
    })
    .throw(Error);
    done();
  });

  it('should return an object when a null or undefined value is set for the input', (done) => {
    expect(Schema.setDefaults(null, {})).to.eql({});
    expect(Schema.setDefaults(undefined, {})).to.eql({});
    done();
  });

  it('should throw an error when any other type than null or object is given in the input', (done) => {
    should(() => {
      Schema.setDefaults('foo', {});
    })
    .throw(Error);
    should(() => {
      Schema.setDefaults([], {});
    })
    .throw(Error);
    done();
  });

  it('should set a value if value is missing', (done) => {
    let schema = new Schema({
      name: {
        type: String,
        default: defaultValue
      }
    });

    let rval = schema.setDefaults({
      name: null
    });
    expect(rval).to.eql({name: defaultValue});
    done();
  });

  it('should set a value if value is missing in a deep structure', (done) => {
    let schema = new Schema({
      p1: {
        p2: {
          type: String, default: defaultValue
        }
      }
    });

    let rval = schema.setDefaults({p1: null});
    expect(rval).to.eql({
      p1: {
        p2: defaultValue
      }
    });
    done();
  });

  it('should set a value if the whole value is missing in a deep structure', (done) => {
    let schema = new Schema({
      p1: {
        p2: {
          type: String, default: defaultValue
        }
      }
    });

    let rval = schema.setDefaults(null);
    expect(rval).to.eql({
      p1: {
        p2: defaultValue
      }
    });
    done();
  });
});
