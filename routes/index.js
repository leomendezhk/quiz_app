const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page - Rendered for unauthenticated users
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

// Dashboard - Rendered for authenticated users
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    user: req.user,
  })
);

module.exports = router;
