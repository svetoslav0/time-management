const { Role } = require("../models/Roles");
const User = require("../models/User");

// Function to validate user roles
const checkRoleExistence = async (roleName) => {
    try {
        // Find the role by its name
        const role = await Role.findOne({ name: roleName });

        // If role is found, return true
        return !!role;
    } catch (error) {
        // Handle any errors
        console.error("Error checking role existence:", error);
        return false;
    }
};

// Function to validate user data before creating a new user
const validateUserData = async (userData) => {
    const {
        username,
        firstName,
        lastName,
        password,
        confirmPassword,
        userRole,
    } = userData;

    let doesUserExist;
    // Check if a user with the same username already exists in the database

    try {
        doesUserExist = await User.findOne({ username: username });
    } catch (error) {
        // Handle any errors
        console.error("Error searching for user existence:", error);
        throw new Error("Trouble creating a new user!");
    }

    if (doesUserExist) {
        // If user with the same username exists, throw an error
        throw new Error("User exists!");
    }

   // Check if a role with the same username already exists in the database
    const roleExists = await checkRoleExistence(userRole);

    if (!roleExists) {
        // If role with the same name does not exist, throw an error
        throw new Error("Role does not exist!");
    }

    // Check if the username is at least 2 characters long
    if(!username){
        throw new Error("Username is required!")
    }else if(username.length < 2) {
        throw new Error("Username is not long enough");
    }

    if(!firstName){
        throw new Error("First name is required!")
    }else if(username.length < 2) {
        throw new Error("First name is not long enough");
    }

    if(!lastName){
        throw new Error("Last name is required!")
    }else if(username.length < 2) {
        throw new Error("Last name is not long enough");
    }


};

module.exports = {
    checkRoleExistence,
    validateUserData,
};
