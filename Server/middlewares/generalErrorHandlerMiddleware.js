const ProjectValidationErrors = require("../errors/projectsValidationErrors");
const UserValidationErrors = require("../errors/userValidationErrors");
const HoursValidationErrors = require("../errors/hoursValidationErrors");
const InvitesValidationErrors = require("../errors/invitesValidationErrors");
const AuthError = require("../errors/authError");

const generalErrorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    console.error("Error appeared in server:", {
        error: err,
        method: req.method,
        path: req.path,
        body: req.body,
    });

    if (err instanceof UserValidationErrors) {
        return res.status(err.statusCode).json({ message: err.message });
    } else if (err instanceof ProjectValidationErrors) {
        return res.status(err.statusCode).json({ message: err.message });
    } else if (err instanceof HoursValidationErrors) {
        return res.status(err.statusCode).json({ message: err.message });
    } else if (err instanceof InvitesValidationErrors) {
        return res.status(err.statusCode).json({ message: err.message });
    } else if (err instanceof AuthError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    res.status(500).json({ message: "Internal server error!" });
};

module.exports = generalErrorHandlerMiddleware;
