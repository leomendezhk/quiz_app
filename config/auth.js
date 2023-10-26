module.exports = {
  // Middleware to ensure that a user is authenticated (logged in) before accessing a resource.
  ensureAuthenticated: function (req, res, next) {
    // Check if the user is authenticated.
    if (req.isAuthenticated()) {
      // If authenticated, allow the request to continue to the next middleware.
      return next();
    }
    // If not authenticated, set a flash message and redirect to the login page.
    req.flash("error_msg", "Please log in to view that resource");
    res.redirect("/users/login");
  },

  // Middleware to ensure that a user is not authenticated (not logged in) before accessing a resource.
  forwardAuthenticated: function (req, res, next) {
    // Check if the user is not authenticated.
    if (!req.isAuthenticated()) {
      // If not authenticated, allow the request to continue to the next middleware.
      return next();
    }
    // If authenticated, redirect the user to the dashboard.
    res.redirect("/dashboard");
  },
};
