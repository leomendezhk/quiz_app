const mongoose = require("mongoose");

// Define a Mongoose schema for the "Posts" collection in the database.
const PostSchema = mongoose.Schema({
  // Define the "question" field as a required string.
  question: {
    type: String,
    required: true,
  },
  // Define the "correct_answer" field as a required string.
  correct_answer: {
    type: String,
    required: true,
  },
  // Define the "incorrect_answers" field as an array of strings, which is also required.
  incorrect_answers: {
    type: Array,
    required: true,
  },
});

// Create and export a Mongoose model named "Posts" using the defined schema.
module.exports = mongoose.model("Posts", PostSchema);
