const { Role } = require("../models/Roles");
const User = require("../models/User");

const checkRoleExistence = async (roleName) => {
    try {
        // Find the role by its name
        const role = await Role.findOne({ name: roleName });
        // If role is found, return true
        return !!role;
    } catch (error) {
        console.error("Error checking role existence:", error);
        return false;
    }
};

const validateUserData = async (userData) => {
    const {
        username,
        firstName,
        lastName,
        userRole,
    } = userData;

    let doesUserExist;

    try {
        doesUserExist = await User.findOne({ username: username });
    } catch (error) {
        console.error("Error searching for user existence:", error);
        throw new Error("Trouble creating a new user!");
    }

    if (doesUserExist) {
        throw new Error("User exists!");
    }

    const roleExists = await checkRoleExistence(userRole);

    if (!roleExists) {
        throw new Error("Role does not exist!");
    }

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
