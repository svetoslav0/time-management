const isAdmin = (req, res, next) => {
    // This middleware currently does not perform any checks.
    // It will be updated to verify JWT tokens and enforce admin-only access once JWT authentication is implemented.

    next();
};

module.exports = isAdmin;
