const userValidationErrors = require("../errors/userValidationErrors");
const User = require("../models/User");
const { validateEmail } = require("./validateEmailUtil");

const checkUserDataFieldsExistence = async (userData, isUpdate = false) => {
    const requiredFields = Object.keys(User.schema.paths).filter(
        (field) => User.schema.paths[field].isRequired
    );

    const fieldsToCheck = isUpdate
        ? requiredFields.filter(
            (field) => !["password", "email"].includes(field)
        )
        : requiredFields;

    const missingFields = fieldsToCheck.filter((field) => !(field in userData));

    if (missingFields.length > 0) {
        const errorMessage = `One or more required fields are missing: ${missingFields.join(
            ", "
        )}!`;
        throw new userValidationErrors(errorMessage, 400);
    }
};

const validateCommonUserDataParams = async (userData) => {
    const { firstName, lastName, userRole } = userData;

    const validRoles = ["admin", "employee", "customer"];

    if (!validRoles.includes(userRole)) {
        throw new userValidationErrors("User role does not exist!", 400);
    } else if (firstName.length < 2) {
        throw new userValidationErrors("First name is not long enough!", 400);
    } else if (lastName.length < 2) {
        throw new userValidationErrors("Last name is not long enough!", 400);
    }
};

const validateAuthUserDataParams = async (userData) => {
    const { email, password, confirmPassword } = userData;

    if (!validateEmail(email)) {
        throw new userValidationErrors(
            "The email address you entered is not valid!",
            400
        );
    }

    if (password.length < 6) {
        throw new userValidationErrors("Password is not long enough!", 400);
    } else if (confirmPassword !== password) {
        throw new userValidationErrors("Passwords does not match!", 400);
    }
};

const validateUserDataOnUserCreate = async (userData) => {
    let doesUserExist;

    doesUserExist = await User.findOne({ email: userData.email });

    if (doesUserExist) {
        throw new userValidationErrors("User exists!", 400);
    }

    await checkUserDataFieldsExistence(userData);
    await validateAuthUserDataParams(userData);
    await validateCommonUserDataParams(userData);
    await roleBasedUserValidation(userData);
};

const validateUserDataOnUserUpdate = async (id, userData) => {
    let doesUserIdExists;

    doesUserIdExists = await User.findById({ _id: id });

    if (!doesUserIdExists) {
        throw new userValidationErrors(
            "User with the provided ID does not exist!",
            400
        );
    }

    await checkUserDataFieldsExistence(userData, true);
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
                throw new userValidationErrors(
                    "Experience level is required for employees!",
                    400
                );
            } else if (!validExperienceLevels.includes(experienceLevel)) {
                throw new userValidationErrors(
                    `Invalid experience level. Valid options are: ${validExperienceLevels.join(
                        ", "
                    )}!`,
                    400
                );
            }
            break;
        case "customer":
            if (!companyName) {
                throw new userValidationErrors(
                    "Company name is required for customers!",
                    400
                );
            }
            if (!phoneNumber) {
                throw new userValidationErrors(
                    "Phone number is required for customers!",
                    400
                );
            }
            if (!address) {
                throw new userValidationErrors(
                    "Address is required for customers!",
                    400
                );
            }
            break;
        default:
            throw new userValidationErrors("Invalid user role specified!", 400);
    }
};


module.exports = {
    validateUserDataOnUserCreate,
    validateUserDataOnUserUpdate,
};
