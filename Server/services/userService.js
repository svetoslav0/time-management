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
        throw new Error("Error creating user: " + error.message);
    };

};

// Function to validate user data before creating a new user
const validateUserData = async (username, firstName, lastName, password, userRole) => {

    // Check if the username is at least 2 characters long
    if (username.length < 2) {
        throw new Error('Username is not long enough');
    }
    
    // Check if the password is at least 6 characters long
    else if (password.length < 6) {
        throw new Error('Password is not long enough');
    };
    
    // Check if a user with the same username already exists in the database
    const doesUserExist = await User.findOne({ username });

    if (doesUserExist) {
        // If user with the same username exists, throw an error
        throw new Error('User exists!');
    };
};