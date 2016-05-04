import Validator from './validator';
import { isObject, isArray } from './primitives';

let validator = new Validator();

export default class Schema {
  constructor(structure = {}, path = []) {
    structure = structure || {};

    this.setSchema(structure);
    this.path = path;
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
          return true;
        }

        for (let i in structure[k]) {
          if (i === 'type') {
            continue;
          }

          try {
            let t = validator.getType(structure[k][i]);
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
    if (val instanceof Schema) {
      return true;
    }

    return false;
  }

  isSchema(val) {
    return Schema.isSchema(val);
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

      structure[k].type = validator.getType(structure[k].type);

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
