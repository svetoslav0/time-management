const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.login = async (userData) => {
    const user = await User.findOne({ username: userData.username });

    if (!user) {
        throw new Error("Invalid username or password");
    }

    const isValid = await bcrypt.compare(userData.password, user.password);

    if (!isValid) {
        throw new Error("Invalid username or password");
    }

    return {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        userRole: user.userRole,
    };
};
