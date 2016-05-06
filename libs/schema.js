import Validator from './validator';
import { isObject, isArray } from './primitives';

export default class Schema {
  constructor(structure = {}, path = []) {
    structure = structure || {};

    this.setSchema(structure);
    this.path = path;
    this.errors = {};
  }

  static hasChildren(structure) {
    // Check if the schema has children
    for (let k in structure) {
      if (isArray(structure[k])) {
        return true;
      }

      if (isObject(structure[k])) {
        if (typeof structure[k].type === 'undefined') {
          return true;
        }

        if (this.hasChildren(structure[k])) {
          structure.children = true;
          structure.type = 'object';
          return true;
        }

        for (let i in structure[k]) {
          if (i === 'type') {
            continue;
          }

          try {
            let t = Validator.getType(structure[k][i]);
            return true;
          } catch (err) {
            // Do nothing
          }
        }
      }
    }

    return false;
  }

  hasChildren(structure) {
    return Schema.hasChildren(structure);
  }

  setSchema(structure) {
    this.validateSchema(structure);
    this.structure = structure;
  }

  static isSchema(val) {
    if (!val) {
      return false;
    }

    if (val instanceof Schema) {
      return true;
    }

    return false;
  }

  isSchema(val) {
    return Schema.isSchema(val);
  }

  validate(input, errors = null) {
    this.errors = isObject(errors) ? errors : this.errors;

    if (!isObject(this.structure)) {
      throw new Error('No schema set');
    }

    return this.validateObject(this.structure, input);
  }

  validateObject(obj, input, path = []) {
    let keys = Object.keys(obj);
    let valid = true;

    for (let i in keys) {
      let key = keys[i];
      let value = input[key] || undefined;
      let p = path.slice(0).concat(key);

      if (this.hasChildren(obj[key])) {
        valid = this.validateObject(obj[key], value, p);
      } else {
        valid = this.validateField(obj[key], value, p);
      }
    }

    return valid;
  }

  isset(value) {
    return !(value === null || value === undefined);
  }

  validateField(field, value, path) {
    if (!this.isset(value) && !field.required) {
      return true;
    }

    let pathName = path.join('.');
    let t = field.type;

    if (!t) {
      throw new Error(`Could not determine the field type for path "${pathName}"`);
    }

    if (!value && field.required) {
      this.errors[pathName] = 'Required value missing';
      return false;
    }

    let validator = new Validator[t](field);

    try {
      validator.validate(value);
    } catch (err) {
      this.errors[pathName] = err.message;
      return false;
    }

    return true;
  }

  validateSchema(structure) {
    if (this.isSchema(structure)) {
      return true;
    }

    if (!isObject(structure)) {
      throw new Error('Schema structure has to be a plain object or a schema');
    }

    if (!this.path) {
      this.path = [];
    }

    for (let k in structure) {
      let fieldType = null;

      if (!structure.hasOwnProperty(k)) {
        continue;
      }

      // This schema has already been validated
      if (this.isSchema(structure[k])) {
        continue;
      }

      if (this.hasChildren(structure[k])) {
        let p = this.path.slice(0).push(k);
        structure[k] = new Schema(structure[k], p);
        continue;
      }

      if (isArray(structure[k])) {
        let children = structure[k][0] || null;

        if (children && !this.isSchema(children)) {
          let tmp = new Schema({children: children});
          children = tmp.structure.children;
        }

        structure[k] = {
          type: 'array',
          children: children
        };
      }

      if (!isObject(structure[k])) {
        structure[k] = {
          type: structure[k]
        };
      }

      if (typeof structure[k].type === 'undefined') {
        throw new Error(`Unexpected error: type is not determinable for the key "${k}"`);
      }

      structure[k].type = Validator.getType(structure[k].type);

      if (!structure[k].type) {
        throw new Error(`Invalid schema type for key "${this.path.join('.')}${k}"`);
      }
    }
  }
}

/*
example schema structure

{
  name: String,
  email: {
    type: String,
    required: true
  },
  storage: [],
  ids: [Number],
  users: [
    {
      name: {
        type: String,
        required: true,
        regexp: /[^!]/
      }
    }
  ]
}
*/
