const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

exports.generateToken = (userData) => {
    return jwt.sign(
        {
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            userRole: userData.userRole,
        },
        SECRET_KEY,
        { expiresIn: "1d" }
    );
};
