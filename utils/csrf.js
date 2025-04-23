// middleware/csrf.js
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

// Middleware to disable CSRF protection for specific routes
// This middleware will skip CSRF protection for the upload route
// and allow the file upload to proceed without CSRF validation.
// This is a temporary solution and should be replaced with a more secure implementation
// in production.

module.exports = (req, res, next) => {
  if (req.path === '/upload' && req.method === 'POST') {
    return next(); 
  }
  csrfProtection(req, res, next); 
};