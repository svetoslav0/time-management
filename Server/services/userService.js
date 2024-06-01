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


    await validateUserData(userData);

    const role = await Role.findOne({ name: userRole });
    try {

        const user = await User.create({
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: password,
            userRole: role._id,
        });

        return {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            userRole: userData.userRole,
        };
    } catch (error) {
        if (error.name === "ValidationError") {
            throw new Error(error.message);
        } else {
            console.error("Error searching for user existence:", error);
            throw new Error("Trouble creating a new user!");
        }
      }
};

exports.editUser = async (id, userData) => {
  await validateUserData(userData);

  try {
      const user = await User.findByIdAndUpdate(id, userData);

      return {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        userRole: user.userRole
      };
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new Error(error.message);
      } else {
        throw new Error("Trouble editing a new user!");
      }
    }
}


