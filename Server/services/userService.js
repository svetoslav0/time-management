const User = require("../models/User");
const bcrypt = require("bcrypt");
const {
    validateUserDataOnUserCreate,
    validateUserDataOnUserUpdate,
} = require("../utils/validateUserDataUtil");

const { generateToken } = require("../utils/jwt");

exports.login = async (userData) => {
    const user = await User.findOne({ username: userData.username });

    if (!user) {
        throw new Error("Invalid username or password");
    }

    if (user.status == "inactive") {
        throw new Error("Your account is inactive. Please contact support.");
    }

    const isValid = await bcrypt.compare(userData.password, user.password);

    if (!isValid) {
        throw new Error("Invalid username or password");
    }

    const token = generateToken(user);

    return {
        user: {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            userRole: user.userRole,
            status: user.status,
        },
        token,
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
        description,
    } = userData;

    await validateUserDataOnUserCreate(userData);
    
    const newUser = {
        username,
        firstName,
        lastName,
        password,
        userRole,
        ...(description && { description }),
        ...(userRole === "employee" && {
            experienceLevel: userData.experienceLevel,
        }),
        ...(userRole === "customer" && {
            companyName: userData.companyName,
            phoneNumber: userData.phoneNumber,
            address: userData.address,
        }),
    };

    try {
        const user = await User.create(newUser);

        const response = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            userRole: user.userRole,
            ...(userRole === "employee" && {
                experienceLevel: user.experienceLevel,
            }),
            ...(userRole === "customer" && {
                companyName: user.companyName,
                phoneNumber: user.phoneNumber,
                address: user.address,
            }),
        };

        return response;
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
    await validateUserDataOnUserUpdate(id, userData);

    try {
        const user = await User.findByIdAndUpdate(id, userData);

        return {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,

            userRole: user.userRole,
        };
    } catch (error) {
        if (error.name === "ValidationError") {
            throw new Error(error.message);
        } else {
            console.error(error);
            throw new Error("Trouble editing the user!");
        }
    }
};

exports.getSingleUser = (userId) => User.findById(userId);

exports.updateUser = (userId, userData) =>
    User.findByIdAndUpdate(userId, userData, { new: true });

exports.getUsers = async (queryData) => {
    try {
        const query = {};

        if (queryData.status) {
            query.status = queryData.status;
        }

        if (queryData.userRole) {
            query.userRole = queryData.userRole;
        }

        const users = await User.find(query).select(
            "username firstName lastName userRole"
        );

        return {
            total: users.length,
            items: users,
        };
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Internal Server Error");
    }
};
