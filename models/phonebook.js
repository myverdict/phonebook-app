require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const phonebookSchema = new mongoose.Schema({
  // mongoose validation
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        console.log({ v });
        const phoneNumberPattern = /^\d{2,3}-\d+$/; // 09-1234556 or 040-22334455
        return phoneNumberPattern.test(v);
      },
      message: (props) =>
        `${props.value} is NOT a valid phone number format! For e.g.:  09-1234556 or 040-22334455 are valid formats.`,
    },
    required: [true, 'User phone number required'],
  },
});

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', phonebookSchema);
