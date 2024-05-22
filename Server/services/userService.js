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

exports.createUser = async (userData) => {
    const { username, firstName, lastName, password, userRole  } = userData;
    //TODO CORRECT THE VALIDATION FOR userRole.
    //TODO ADD VALIDATION FOR DIFFERENT KIND OF USERS
    await validateUserData(username, firstName,firstName , password, userRole);

    try {
    const user = await User.create({ username: username, firstName: firstName, lastName:lastName, password: password, userRole:userRole });

    }
    catch(error)
    {
        throw new Error("Invalid credentials!");
    }

    return {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        userRole: user.userRole
    }
};

const validateUserData = async (username, firstName, lastName, password, userRole) => {

    if (username.length < 2) {
        throw new Error('Username is not long enough');
    }

    else if (password.length < 6) {
        throw new Error('Password is not long enough');
    }

    const doesUserExist = await User.findOne({ username });

    if (doesUserExist) {
        throw new Error('User exists');
    }
};