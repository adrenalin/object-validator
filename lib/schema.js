import Validator from './validator';
import TypeValidator from './types/validator';
import { isObject, isArray, isString } from './primitives';

export default class Schema {
  constructor(structure = {}, path = []) {
    structure = structure || {};

    this.setSchema(structure);
    this.path = path;
    this.errors = {};
  }

  setDefaults(input, structure = null) {
    if (!structure) {
      structure = this.structure;
    }

    return Schema.setDefaults(input, structure);
  }

  static setDefaults(input, structure) {
    if (Schema.isSchema(structure)) {
      structure = structure.structure;
    }

    if (!isObject(structure)) {
      throw new Error('Structure has to be an object');
    }

    input = Schema.isset(input) ? input : {};

    if (!isObject(input)) {
      throw new Error('Input has to be an object');
    }

    Object.keys(structure).map((key) => {
      if (Schema.isSchema(structure[key])) {
        input[key] = Schema.setDefaults(input[key], structure[key].structure);
        return;
      }

      if (Schema.hasChildren(structure[key])) {
        input[key] = Schema.setDefaults(input[key], structure[key]);
        return;
      }

      if (!structure[key].default) {
        return null;
      }

      if (!Schema.isset(input[key])) {
        input[key] = structure[key].default;
      }
    });

    return input;
  }

  /**
   * Check if the structure has children
   *
   * @param mixed structure
   * @return boolean
   */
  static hasChildren(structure) {
    let fieldType;

    if (!isObject(structure) && !isArray(structure)) {
      return false;
    }

    if (structure instanceof Schema) {
      return true;
    }

    // Check if the schema has children
    for (let k in structure) {
      if (isArray(structure[k])) {
        return true;
      }

      if (Schema.isSchema(structure[k])) {
        return true;
      }

      if (!isObject(structure[k])) {
        structure[k] = Schema.validateSchemaField(structure[k]);
      }

      if (isObject(structure[k])) {
        if (typeof structure[k].type === 'undefined') {
          return true;
        }

        let rwords = this.getReservedWords(structure[k].type);

        for (let i in structure[k]) {
          if (rwords.indexOf(i) !== -1) {
            continue;
          }

          try {
            let t = Validator.getType(structure[k][i]);
            return true;
          } catch (err) {
            // Do nothing
          }
        }

        continue;
      }
    }
    return false;
  }

  /**
   * Check if the structure has children - shorthand to the static method
   *
   * @param mixed structure
   * @return boolean
   */
  hasChildren(structure) {
    return Schema.hasChildren(structure);
  }

  /**
   * Set schema structure - shorthand to the static method
   *
   * @param mixed structure
   * @return Schema   self
   */
  setSchema(structure) {
    this.validateSchema(structure);
    this.structure = structure || {};
    return this;
  }

  /**
   * Check if the argument value is a schema - shorthand to the static method
   *
   * @static
   * @param mixed val
   * @return boolean
   */
  static isSchema(val) {
    if (!val) {
      return false;
    }

    if (val instanceof Schema) {
      return true;
    }

    return false;
  }

  /**
   * Check if the argument value is a schema - shorthand to the static method
   *
   * @param mixed val
   * @return boolean
   */
  isSchema(val) {
    return Schema.isSchema(val);
  }

  /**
   * Validate input
   *
   * @param mixed input    Any input
   * @param object errors  Key-value pairs of validation errors
   * @param array path
   */
  validate(input, errors = null, path = []) {
    this.errors = isObject(errors) ? errors : this.errors;

    if (!isObject(this.structure)) {
      throw new Error('No schema set');
    }

    return this.validateObject(this.structure, input, path);
  }

  /**
   * Check if the object has foreign (i.e. non-defined) keys
   *
   * @param object obj    Object that contains the valid keys
   * @param object input  Input object that is compared to the valid object
   * @param array path    Object path
   * @return boolean      True if there are foreign keys, false if there aren't
   */
  hasForeignKeys(obj, input, path = []) {
    let pathName = path.join('.');

    // Not an object, no need to verify foreign keys
    if (!isObject(input)) {
      return false;
    }

    let hasForeignKeys = false;
    Object.keys(input).map((key) => {
      if (!(obj.hasOwnProperty(key))) {
        hasForeignKeys = true;
        this.errors[pathName] = `Input has an extra key "${key}"`;
      }
    });

    return hasForeignKeys;
  }

  /**
   * Validate object against the given schema
   *
   * @param mixed obj    Schema object
   * @param mixed input  Input
   * @param array path   Object path
   * @return boolean     Validation status for the input
   */
  validateObject(obj, input, path = []) {
    let keys = Object.keys(obj);
    let valid = true;

    // Check that there are no foreign keys
    if (!this.allowForeign && this.hasForeignKeys(obj, input, path)) {
      valid = false;
    }

    for (let i in keys) {
      let key = keys[i];
      let value = input ? input[key] : undefined;
      let p = path.slice(0).concat(key);
      let pathName = p.join('.');
      let field = obj[key];

      switch (true) {
        case (this.isSchema(field)):
          if (typeof field.allowForeign === 'undefined') {
            field.allowForeign = this.allowForeign;
          }
          if (!field.validate(value, this.errors, p)) {
            valid = false;
          }
          break;

        case (obj[key].type === 'array'):
          // Validate array contents
          if (!this.validateField(field, value, p)) {
            valid = false;
            break;
          }

          // Validate each object separately
          if (!this.validateArray(field, value, p)) {
            valid = false;
          }
          break;

        case (this.hasChildren(obj[key])):
          if (!this.validateObject(field, value, p)) {
            valid = false;
          }
          break;

        default:
          if (!this.validateField(field, value, p)) {
            valid = false;
          }
      }
    }

    return valid;
  }

  /**
   * Check if the value is set (i.e. not null or undefined) - shorthand for the static method
   *
   * @param mixed value
   * @return boolean      True if the value is defined, otherwise false
   */
  isset(value) {
    return Schema.isset(value);
  }

  /**
   * Check if the value is set (i.e. not null or undefined)
   *
   * @param mixed value
   * @return boolean      True if the value is defined, otherwise false
   */
  static isset(value) {
    return !(value === null || value === undefined);
  }

  /**
   * Validate all array items
   *
   * @param object field     Schema field
   * @param mixed input      Input to be validated
   * @param array path       Object path
   * @return boolean         Validation status for the input
   */
  validateArray(field, input, path) {
    let pathName = path.join('.');
    if (!field.required && !input) {
      return true;
    }

    if (!isArray(input)) {
      this.errors[pathName] = 'Not an array';
      return false;
    }

    let valid = true;

    // No validation required
    if (!field.children) {
      return true;
    }

    input.map((val, i) => {
      let p = [].concat(path);
      p.push(i);
      if (!this.validateField(field.children, val, p)) {
        valid = false;
      }
    });

    return valid;
  }

  /**
   * Validate a flat field
   *
   * @param object field     Schema field
   * @param mixed input      Input to be validated
   * @param array path       Object path
   * @return boolean         Validation status for the input
   */
  validateField(field, value, path) {
    let pathName = path.join('.');

    if (!this.isset(value) && !field.required) {
      return true;
    }

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

  /**
   * Validate a schema input field - shorthand to the static method
   *
   * @param mixed field    Schema field
   * @return boolean       Schema field validation status
   */
  validateSchemaField(field) {
    return Schema.validateSchemaField(field);
  }

  /**
   * Validate a schema input field
   *
   * @param mixed field    Schema field
   * @return boolean       Schema field validation status
   */
  static validateSchemaField(field) {
    if (typeof field === 'function') {
      let fieldType = Validator.getType(field);

      if (!fieldType) {
        throw new Error(`Field type for function could not be determined`);
      }
      field = {
        type: fieldType
      };
    }

    if (typeof field.type === 'function') {
      let fieldType = Validator.getType(field.type);

      if (!fieldType) {
        throw new Error(`Field type for function could not be determined`);
      }
      field.type = fieldType;
    }

    if (isString(field)) {
      let fieldType = Validator.getType(field);
      if (field === fieldType) {
        return field;
      }

      if (!fieldType) {
        return field;
      }

      field = {
        type: fieldType
      }
    }
    return field;
  }

  /**
   * Get reserved words for the given type
   *
   * @param mixed fieldType     String or constructor
   * @return array              Reserved words for the given field
   */
  getReservedWords(fieldType) {
    return Schema.getReservedWords(fieldType);
  }

  /**
   * Get reserved words for the given type
   *
   * @param mixed fieldType     String or constructor
   * @return array              Reserved words for the given field
   */
  static getReservedWords(fieldType) {
    if (!isString(fieldType)) {
      fieldType = Validator.getType(fieldType);
    }

    if (!fieldType) {
      throw new Error('Unidentified field type, cannot get reserved words');
    }

    let defaults = Validator[fieldType] ? Validator[fieldType].RESERVED_WORDS : TypeValidator.RESERVED_WORDS;
    try {
      let fields = Object.keys(Validator[fieldType].defaults) || [];
      return fields.concat(defaults);
    } catch (err) {
      return defaults;
    }
  }

  /**
   * Validate a schema structure
   *
   * @param mixed structure   Schema structure
   * @return boolean          Schema field validation status
   */
  validateSchema(structure) {
    if (this.isSchema(structure)) {
      return true;
    }

    let fieldType = null;

    if (!isObject(structure)) {
      throw new Error('Schema structure has to be a plain object or a schema');
    }

    if (!this.path) {
      this.path = [];
    }

    // First pass: convert types
    for (let k in structure) {
      structure[k] = this.validateSchemaField(structure[k]);
    }

    for (let k in structure) {
      // This schema has already been validated
      if (this.isSchema(structure[k])) {
        continue;
      }

      let keywords = [];

      fieldType = Validator.getType(structure[k].type);

      if (fieldType) {
        keywords = Schema.getReservedWords(fieldType);
      }

      if (isArray(structure[k])) {
        let children = structure[k][0] || null;

        if (children && !this.isSchema(children)) {
          children = this.validateSchemaField(children);
          let tmp = new Schema({children: children});
          children = tmp.structure.children;
        }

        structure[k] = {
          type: 'array',
          children: children
        };
        continue;
      }

      if (this.hasChildren(structure[k])) {
        let p = this.path.slice(0);
        p.push(k);
        structure[k] = new Schema(structure[k], p);
        continue;
      }

      if (!isObject(structure[k])) {
        structure[k] = {
          type: structure[k]
        };
        continue;
      }

      if (this.isSchema(structure[k])) {
        continue;
      }

      if (typeof structure[k].type === 'undefined') {
        structure[k] = new Schema(structure[k]);
      }

      if (keywords.indexOf(k) !== -1) {
        continue;
      }
    }
  }
}
