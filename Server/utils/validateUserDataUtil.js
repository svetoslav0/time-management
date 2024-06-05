const User = require("../models/User");

const checkUserDataFieldsExistence = async (userData) => {
    const requiredFields = Object.keys(User.schema.paths).filter(
        (field) => User.schema.paths[field].isRequired
    );

    const missingFields = requiredFields.filter(
        (field) => !(field in userData)
    );

    if (missingFields.length > 0) {
        const errorMessage = `One or more required fields are missing: ${missingFields.join(
            ", "
        )}`;
        throw new Error(errorMessage);
    }
};

const validateCommonUserDataParams = async (userData) => {
    await checkUserDataFieldsExistence(userData);

    const { username, firstName, lastName, userRole } = userData;

    const validRoles = ["admin", "employee", "customer"];

    if (!userRole) {
        throw new Error("userRole is required!");
    } else if (!validRoles.includes(userRole)) {
        throw new Error("Role does not exist!");
    }

    if (!username) {
        throw new Error("Username is required!");
    } else if (username.length < 2) {
        throw new Error("Username is not long enough");
    }

    if (!firstName) {
        throw new Error("First name is required!");
    } else if (username.length < 2) {
        throw new Error("First name is not long enough");
    }

    if (!lastName) {
        throw new Error("Last name is required!");
    } else if (username.length < 2) {
        throw new Error("Last name is not long enough");
    }
};

const validateUserDataOnUserCreate = async (userData) => {
    let doesUserExist;

    try {
        doesUserExist = await User.findOne({ username: userData.username });
    } catch (error) {
        console.error("Error searching for user existence:", error);
        throw new Error("Trouble creating a new user!");
    }

    if (doesUserExist) {
        throw new Error("User exists!");
    }

    if (userData.password.length < 6) {
        throw new Error("Password is not long enough");
    } else if (userData.confirmPassword !== userData.password) {
        throw new Error("Passwords does not match!");
    }

    await validateCommonUserDataParams(userData);
};

const validateUserDataOnUserUpdate = async (userData) => {
    let doesUserExist;

    try {
        doesUserExist = await User.findOne({ username: userData.username });
    } catch (error) {
        console.error("Error searching for user existence:", error);
        throw new Error("Trouble creating a new user!");
    }

    if (!doesUserExist) {
        throw new Error("User with the provided ID does not exist!");
    }

    await validateCommonUserDataParams(userData);
};

module.exports = {
    validateUserDataOnUserCreate,
    validateUserDataOnUserUpdate,
};
