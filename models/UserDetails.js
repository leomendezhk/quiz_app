const mongoose = require("mongoose");

// Define a Mongoose schema for the "User" collection in the database.
const UserSchema = new mongoose.Schema({
  // Define the "name" field as a required string.
  name: {
    type: String,
    required: true,
  },
  // Define the "email" field as a required string.
  email: {
    type: String,
    required: true,
  },
  // Define the "password" field as a required string.
  password: {
    type: String,
    required: true,
  },
  // Define the "date" field as a date type with a default value of the current date and time.
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create and export a Mongoose model named "User" using the defined schema.
const User = mongoose.model("User", UserSchema);

module.exports = User;
