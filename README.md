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


## Schema

Schema can be created with constructor

    let schema = new Schema(definitions);

or by setting the schema

    let schema = new Schema();
    schema.setSchema(definitions);

###

### Schema example:

    let phone = new Schema({
      country: 'Int',
      area: {
        type: 'Int',
        required: true
      },
      local: {
        type: 'Int',
        required: true
      }
    });

    let user = new Schema({
      firstname: {
        type: String,
        required: true
      },
      lastname: {
        type: String,
        required: true
      },
      email: String,
      phone: [phone]
    });
