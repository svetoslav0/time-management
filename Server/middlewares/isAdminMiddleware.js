const isAdmin = (req, res, next) => {
    // Check if user is authenticated and has admin role
    if (req.body.username && req.body.userRole === 'admin') {
      // User is admin, proceed to the next middleware
      next();
    } else {
      // User is not admin, send forbidden response
      res.status(403).json({ error: 'Unauthorized' });
    }
  };
  
  module.exports = isAdmin;