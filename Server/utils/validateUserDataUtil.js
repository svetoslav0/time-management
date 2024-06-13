const User = require("../models/User");
const validator = require('validator');

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
        )}!`;
        throw new Error(errorMessage);
    }
};

const validateCommonUserDataParams = async (userData) => {
    const {firstName, lastName, userRole } = userData;

    const validRoles = ["admin", "employee", "customer"];

   if (!validRoles.includes(userRole)) {
        throw new Error("User role does not exist!");
    }

    if (firstName.length < 2) {
        throw new Error("First name is not long enough!");
    }

    if (lastName.length < 2) {
        throw new Error("Last name is not long enough!");
    }
};

const validateAuthUserDataParams = async (userData) => {
    const {email, password, confirmPassword} = userData;

    if (!validateEmail(email)) {
        throw new Error("The email address you entered is not valid!");
    }

    if (password.length < 6) {
        throw new Error("Password is not long enough!");
    } else if (confirmPassword !== password) {
        throw new Error("Passwords does not match!");
    }

};

const validateUserDataOnUserCreate = async (userData) => {
    let doesUserExist;

    try {
        doesUserExist = await User.findOne({ email: userData.email });
    } catch (error) {
        console.error("Error searching for user existence:", error);
        throw new Error("Trouble creating a new user!");
    }

    if (doesUserExist) {
        throw new Error("User exists!");
    }

    await checkUserDataFieldsExistence(userData);
    await validateAuthUserDataParams(userData);
    await validateCommonUserDataParams(userData);
    await roleBasedUserValidation(userData);
};

const validateUserDataOnUserUpdate = async (id, userData) => {
    let doesUserIdExists;

    try {
        doesUserIdExists = await User.findById({ _id: id });

    } catch (error) {
        console.error("Error searching for user existence:", error);
        throw new Error("Error updating user!");
    }

    if (!doesUserIdExists) {
        throw new Error("User with the provided ID does not exist!");
    }

    await validateCommonUserDataParams(userData);
    await roleBasedUserValidation(userData);
};

const roleBasedUserValidation = async (userData) => {
    const { userRole, experienceLevel, companyName, phoneNumber, address } =
        userData;

    switch (userRole) {
        case "employee":
            const validExperienceLevels = [
                "Junior",
                "Mid-Level",
                "Senior",
                "Architect",
            ];
            if (!experienceLevel) {
                throw new Error("Experience level is required for employees!");
            } else if (!validExperienceLevels.includes(experienceLevel)) {
                throw new Error(
                    `Invalid experience level. Valid options are: ${validExperienceLevels.join(
                        ", "
                    )}!`
                );
            }
            break;
        case "customer":
            if (!companyName) {
                throw new Error("Company name is required for customers!");
            }
            if (!phoneNumber) {
                throw new Error("Phone number is required for customers!");
            }
            if (!address) {
                throw new Error("Address is required for customers!");
            }
            break;
        default:
            throw new Error("Invalid user role specified!");
    }
};

function validateEmail(email) {
    return validator.isEmail(email);
};


module.exports = {
    validateUserDataOnUserCreate,
    validateUserDataOnUserUpdate,
};
