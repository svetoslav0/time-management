const ApiException = require("../errors/ApiException");
const User = require("../models/User");
const { validateEmail } = require("./validateEmailUtil");

const checkUserDataFieldsExistence = async (userData, isUpdate = false) => {
  const requiredFields = Object.keys(User.schema.paths).filter(
    (field) => User.schema.paths[field].isRequired
  );

  const fieldsToCheck = isUpdate
    ? requiredFields.filter((field) => !["password", "email"].includes(field))
    : requiredFields;

  const missingFields = fieldsToCheck.filter((field) => !(field in userData));

  if (missingFields.length > 0) {
    const errorMessage = `One or more required fields are missing: ${missingFields.join(
      ", "
    )}!`;
    throw new ApiException(errorMessage, 400);
  }
};

const validateCommonUserDataParams = async (userData) => {
  const { firstName, lastName, userRole } = userData;

  const validRoles = ["admin", "employee", "customer"];

  if (!validRoles.includes(userRole)) {
    throw new ApiException("User role does not exist!", 400);
  } else if (firstName.length < 2) {
    throw new ApiException("First name is not long enough!", 400);
  } else if (lastName.length < 2) {
    throw new ApiException("Last name is not long enough!", 400);
  }
};

const validateAuthUserDataParams = async (userData) => {
  const { email, password, confirmPassword, isGoogleLogin } = userData;

  if (!validateEmail(email)) {
    throw new ApiException(
      "The email address you entered is not valid!",
      400
    );
  }

  if (!isGoogleLogin) {
    if (password.length < 6) {
      throw new ApiException("Password is not long enough!", 400);
    } else if (confirmPassword !== password) {
      throw new ApiException("Passwords does not match!", 400);
    }
  }
};

const validateUserDataOnUserCreate = async (userData) => {
  let doesUserExist;

  doesUserExist = await User.findOne({ email: userData.email });

  if (doesUserExist) {
    throw new ApiException("User exists!", 400);
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
    throw new ApiException(
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
    case "admin":
      break;
    case "employee":
      const validExperienceLevels = [
        "Junior",
        "Mid-Level",
        "Senior",
        "Architect",
      ];
      if (!experienceLevel) {
        throw new ApiException(
          "Experience level is required for employees!",
          400
        );
      } else if (!validExperienceLevels.includes(experienceLevel)) {
        throw new ApiException(
          `Invalid experience level. Valid options are: ${validExperienceLevels.join(
            ", "
          )}!`,
          400
        );
      }
      break;
    case "customer":
      if (!companyName) {
        throw new ApiException(
          "Company name is required for customers!",
          400
        );
      }
      if (!phoneNumber) {
        throw new ApiException(
          "Phone number is required for customers!",
          400
        );
      }
      if (!address) {
        throw new ApiException(
          "Address is required for customers!",
          400
        );
      }
      break;
    default:
      throw new ApiException("Invalid user role specified!", 400);
  }
};

module.exports = {
  validateUserDataOnUserCreate,
  validateUserDataOnUserUpdate,
};
