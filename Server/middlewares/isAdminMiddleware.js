const isAdmin = (req, res, next) => {
    if (req.body.username && req.body.userRole === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
};

module.exports = isAdmin;
