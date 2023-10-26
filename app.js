const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const postRoute = require("./routes/questions");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = express();
app.use(cors());
app.use("/css", express.static("css"));
app.use("/start", express.static(`${__dirname}/public`));
// Passport Config
require("./config/passport")(passport);

// DB Config

const db = process.env.DATABASE;

// Connect to MongoDB
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.static("public"));
// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));
app.use("/questions", postRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${8080}`));
