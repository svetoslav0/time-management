const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validateUserData } = require("../utils/validateUserDataUtil");
const { Role } = require("../models/Roles");

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
    const {
        username,
        firstName,
        lastName,
        password,
        confirmPassword,
        userRole,
    } = userData;
    //TODO ADD VALIDATION FOR DIFFERENT KIND OF USERS

    // Validate user data
    await validateUserData(userData);

    const role = await Role.findOne({ name: userRole });
    try {
        // Create the user in the database
        const user = await User.create({
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: password,
            userRole: role._id,
        });

        // Return the created user information
        return {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            userRole: userData.userRole,
        };
    } catch (error) {
        if (error.name === "ValidationError") {
            // If it's a validation error, throw error with the error's message
            throw new Error(error.message);
        } else {
            // For other types of errors, handle them generically
            console.error("Error searching for user existence:", error);
            throw new Error("Trouble creating a new user!");
        }
    }
};

exports.getUsers = async (queryData) => {

    try {
        //TODO: SET AND VERIFY THE QUERY PARAMETERS
        const query = {};

        // Fetch users based on the query, incudes _id by default
        const users = await User.find(query).select('username firstName lastName userRole');;
        // Get total count of users with the applied filters

        return {
            total: users.length,
            items: users
        };

    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Internal Server Error");
    }
};
