// Import required packages and modules
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const postRoute = require("./routes/questions"); // Import the 'questions' route
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

// Create an Express application
const app = express();

// Enable CORS support
app.use(cors());

// Serve static files in the 'css' and 'public' directories
app.use("/css", express.static("css"));
app.use("/start", express.static(`${__dirname}/public`));

// Passport Config
require("./config/passport")(passport); // Configure passport using a custom function

// Define the MongoDB database connection URL
const db = process.env.DATABASE;

// Connect to MongoDB
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configure Express application
app.use(expressLayouts); // Enable EJS layout support
app.set("view engine", "ejs"); // Set the view engine to EJS
app.use(express.static("public")); // Serve static files from the 'public' directory

// Parse request bodies as URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Set up the Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use Connect Flash for displaying flash messages
app.use(flash());

// Define global variables for flash messages
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Define and use routes for the main application and user-related routes
app.use("/", require("./routes/index.js")); // Main application routes
app.use("/users", require("./routes/users.js")); // User-related routes
app.use("/questions", postRoute); // Questions-related routes

// Define the port where the server will listen
const PORT = process.env.PORT || 8080;

// Start the Express server
app.listen(PORT, console.log(`Server started on port ${PORT}`));
