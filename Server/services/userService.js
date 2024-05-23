const User = require("../models/User");
const bcrypt = require("bcrypt");
const {validateUserData} = require("../utils/validateUserDataUtil");

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

exports.createUser = async (userData) => {
    const { username, firstName, lastName, password, userRole  } = userData;
    //TODO ADD VALIDATION FOR DIFFERENT KIND OF USERS

    // Validate user data
    await validateUserData(username, firstName, lastName, password, userRole);

    try {
    // Create the user in the database
    const user = await User.create({ 
        username: username,
        firstName: firstName,
        lastName:lastName,
        password: password,
        userRole:userRole 
        });

    // Return the created user information
    return {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        userRole: user.userRole
    };

    }
    catch(error)
    {
        // Handle errors, e.g., if username is already taken
        throw new Error("Invalid credentials!");
    };

};