const mongoose = require('mongoose');
const validator = require('validator');

const carPlateNumber = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  number: {
    type: String,
    required: [ true, 'Car plate number is required.' ],
    unique: true,
    validate: {
      validator: value => /^([A-Z]{3}\d{3})$/.test(value),
      message: '{VALUE} is not a valid car plate number.'
    }
  },
  owner: {
    firstName: {
      type: String,
      minlength: [ 2, 'First name must be at least 2 characters.' ],
      maxlength: [ 255, 'First name may not be greater than 255 characters.' ],
      required: [ true, 'First name is required.' ],
      uppercase: true,
      validate: {
        validator: value => validator.isAlpha(value),
        message: 'First name may only contain letters.'
      }
    },
    lastName: {
      type: String,
      minlength: [ 2, 'Last name must be at least 2 characters.' ],
      maxlength: [ 255, 'Last name may not be greater than 255 characters.' ],
      required: [ true, 'Last name is required.' ],
      uppercase: true,
      validate: {
        validator: value => validator.isAlpha(value),
        message: 'Last name may only contain letters.'
      }
    },
  }
});

module.exports = mongoose.model('CarPlateNumber', carPlateNumber);