# object-validator

Object validator for JSON input

There are two main parts: Schema and Validator.

Schema example:

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
