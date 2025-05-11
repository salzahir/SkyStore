import csrf from 'csurf';
const csrfProtection = csrf({ cookie: true });

const csrfMiddleware = (req, res, next) => {
  if (req.path === '/upload' && req.method === 'POST') {
    return next();
  }
  csrfProtection(req, res, next);
};

export default csrfMiddleware;