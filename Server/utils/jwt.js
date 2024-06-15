const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

exports.generateToken = (userData) => {
    return jwt.sign(
        {
            _id: userData._id,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            userRole: userData.userRole,
        },
        SECRET_KEY,
        { expiresIn: "7d" }
    );
};
