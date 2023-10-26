const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../models/UserDetails");

module.exports = function (passport) {
  // Configure the passport for user authentication using the LocalStrategy.
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email,
      }).then((user) => {
        if (!user) {
          // If no user with the provided email is found, return an error message.
          return done(null, false, { message: "That email is not registered" });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            // If the provided password matches the stored password, return the user.
            return done(null, user);
          } else {
            // If the password is incorrect, return an error message.
            return done(null, false, { message: "Password incorrect" });
          }
        });
      });
    })
  );

  // Serialize the user for session management.
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // Deserialize the user to retrieve user details from the database.
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
