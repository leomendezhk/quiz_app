const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

// Get all the posts
router.get("/", async (req, res) => {
  try {
    // Fetch all posts from the database and respond with a JSON array of posts.
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    // Handle any errors and respond with an error message in JSON format.
    res.json({ msg: err });
  }
});

// Submit a new post
router.post("/", async (req, res) => {
  // Create a new Post model instance with data from the request body.
  const post = new Post({
    question: req.body.question,
    correct_answer: req.body.correct_answer,
    incorrect_answers: req.body.incorrect_answers,
  });
  try {
    // Save the new post to the database and respond with the saved post data in JSON format.
    const postSaved = await post.save();
    res.json(postSaved);
  } catch (err) {
    // Handle any errors and respond with an error message in JSON format.
    res.json({ message: err });
  }
});

// Find a specific post by ID
router.get("/:postId", async (req, res) => {
  try {
    // Find a post by its unique ID and respond with the post data in JSON format.
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    // Handle any errors and respond with an error message in JSON format.
    res.json({ msg: err });
  }
});

// Delete a post by ID
router.delete("/:postId", async (req, res) => {
  try {
    // Remove a post from the database by its unique ID and respond with the removal status.
    const removePost = await Post.remove({ _id: req.params.postId });
    res.json(removePost);
  } catch (err) {
    // Handle any errors and respond with an error message in JSON format.
    res.json({ msg: err });
  }
});

// Update a post by ID
router.patch("/:postId", async (req, res) => {
  try {
    // Update a post in the database by its unique ID, specifically changing the "question" field, and respond with the update status.
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { question: req.body.question } }
    );
    res.json(updatedPost);
  } catch (err) {
    // Handle any errors and respond with an error message in JSON format.
    res.json({ msg: err });
  }
});

module.exports = router;
