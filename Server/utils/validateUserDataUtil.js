const { Role } = require("../models/Roles");
const User = require("../models/User");

const checkRoleExistence = async (roleName) => {
    try {

        const role = await Role.findOne({ name: roleName });

        return !!role;
    } catch (error) {

        console.error("Error checking role existence:", error);
        return false;
    }
};

const checkUserDataFieldsExistence = async (userData) => {
    const requiredFields = Object.keys(User.schema.paths).filter(field => User.schema.paths[field].isRequired);

    const missingFields = requiredFields.filter(field => !(field in userData));

    if (missingFields.length > 0) {
        const errorMessage = `One or more required fields are missing: ${missingFields.join(', ')}`;
        throw new Error(errorMessage);
    }
};

const validateUserData = async (userData) => {
    await checkUserDataFieldsExistence(userData);
    
    const {
        username,
        firstName,
        lastName,
        password,
        confirmPassword,
        userRole,
    } = userData;

    if (username.length < 2) {
        throw new Error("Username is not long enough");
    }

    else if (password.length < 6) {
        throw new Error("Password is not long enough");
    }

    else if (confirmPassword !== password) {
        throw new Error("Passwords does not match!");
    }

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
};

module.exports = {
    checkRoleExistence,
    validateUserData,
};
