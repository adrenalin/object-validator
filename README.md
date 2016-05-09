# object-validator

Object validator for JSON input

## Data types

There are currently five main data types with some additional shorthands for subtypes

1. `Array`
2. `Boolean`
3. `Date`
4. `Number`
  - any valid number with additional subtypes `Integer` and `Float`
5. `String`
  - any valid string with additional subtype `Email`

### Array

An array can contain either any JS object or strictly validated set of objects.

- `length` to specify the exact length
- `minLength` to specify the minimum allowed length
- `maxLength` to specify the maximum allowed length
- `children` to specify the type of the children

Child validation can be achieved by setting a child object to the schema or `children`:

    let valid = {
      arr: [String]
    };

    let alsoValid = {
      arr: [{
        type: String,
        pattern: /^[^\n]$/
      }]
    };

### Boolean

Validates a boolean value, i.e. `true` or `false`

### Date

Validates any date that JavaScript understands.

- `min` to specify the minimum (i.e. start) time of the valid date span
- `max` to specify the maximum (i.e. end) time of the valid date span

### Number

Validates any number format

- `min` to specify the minimum value
- `max` to specify the maximum value
- `precision` to specify the allowed rounding in the power of tens
  - -2 will allow using precision up to 0.01 and 2 will allow using 100
- `strict` will check that the object type is in truth a `Number` instead of a string containing numeric characters

Subtype `Integer` will force the precision to be  `0`

### String

Validates strings

- `length` to specify the exact length
- `minLength` to specify the minimum allowed length
- `maxLength` to specify the maximum allowed length
- `pattern` will test against a
  - regular expression (/^foo$/)
  - string that will be converted to a regular expression
    - currently without any escaping
  - function, which can contain any type of validation

Subtype `Email` will match email addresses. Currently not implemented.

## Schema

Schema can be created with constructor

    let schema = new Schema(definitions);

or by setting the schema

    let schema = new Schema();
    schema.setSchema(definitions);

### How to create a schema

Each key can have either directly the type or in an object with a key `type`

    let valid = {
      name: String
    };

    let alsoValid = {
      name: {
        type: String
      }
    };

Each field can be marked as `required`, which forces effectively to use the object notation

    let valid = {
      name: {
        type: String,
        required: true
      }
    };

Additional type specific controls can be added also to the object notation

  let valid = {
    name: {
      type: String,
      required: true,
      pattern: /^[a-z]$/i
    }
  };

Child paths will be traversed

  let valid = {
    name: {
      firstname: {
        type: String,
        required: true
      },
      lastname: {
        type: String,
        required: true
      }
    }
  };
