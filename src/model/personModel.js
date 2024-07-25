const mongoose = require("mongoose");
require('dotenv').config();

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Others"],
  },
  mobileNumber: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Check if the mobile number is exactly 10 digits
        return /^\d{10}$/.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid mobile number! Please enter a 10-digit number without any spaces or special characters.`,
    },
  },
});

const Person = mongoose.model("Person", PersonSchema);

module.exports = Person;
