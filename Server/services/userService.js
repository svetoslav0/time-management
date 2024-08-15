const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validateObjectId } = require("../utils/validateObjectIdUtil");
const {
    validateUserDataOnUserCreate,
    validateUserDataOnUserUpdate,
} = require("../utils/validateUserDataUtil");

const { generateToken } = require("../utils/jwt");
const UserValidationErrors = require("../errors/userValidationErrors");
const {
    default: verifyGoogleToken,
} = require("../utils/verifyGoogleTokenUtil");

exports.login = async (req) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
        throw new UserValidationErrors("Invalid email or password!", 400);
    }

    if (user.status == "inactive") {
        throw new UserValidationErrors(
            "Your account is inactive. Please contact support!",
            400
        );
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new UserValidationErrors("Invalid email or password!", 400);
    }

    const token = generateToken(user);

    return {
        user: {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userRole: user.userRole,
            status: user.status,
        },
        token,
    };
};

exports.googleLogin = async (req) => {
    const googleToken = req.params.token;

    const ticket = await verifyGoogleToken(googleToken);

    const payload = ticket.getPayload();

    if (!payload) {
        throw new UserValidationErrors("Invalid google token!", 401);
    }

    const user = await User.findOne({ email: payload.email });

    if (!user) {
        throw new UserValidationErrors("Such user was not found", 401);
    }

    if (!user.isGoogleLogin) {
        throw new UserValidationErrors("Such user was not found", 405);
    }

    const token = generateToken(user);

    return {
        user: {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userRole: user.userRole,
            status: user.status,
        },
        token,
    };
};

exports.createUser = async (req) => {
    const userData = req.body;

    await validateUserDataOnUserCreate(userData);

    const {
        email,
        firstName,
        lastName,
        password,
        userRole,
        description,
        experienceLevel,
        companyName,
        phoneNumber,
        address,
    } = userData;

    const newUser = {
        email,
        firstName,
        lastName,
        password,
        userRole,
        ...(description && { description }),
        ...(userRole === "employee" && { experienceLevel }),
        ...(userRole === "customer" && { companyName, phoneNumber, address }),
    };

    const user = await User.create(newUser);

    return {
        email: user.email,
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
};

exports.editUser = async (req) => {
    const userId = req.params.id;
    const userData = req.body;

    await validateUserDataOnUserUpdate(userId, userData);

    delete userData.password;
    delete userData.email;

    const user = await User.findById(userId).exec();

    Object.assign(user, userData);
    await user.save();

    return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userRole: user.userRole,
    };
};

exports.getSingleUser = async (userId) => {
    if (!validateObjectId(userId)) {
        throw new UserValidationErrors("Invalid user ID!", 400);
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new UserValidationErrors("User not found!", 404);
    }

    return user;
};
exports.restorePassword = async (req) => {
    const { password, confirmPassword } = req.body;
    const userId = req.params.id;

    if (!password || !confirmPassword) {
        throw new UserValidationErrors(
            "Both password and confirmPassword are required!",
            400
        );
    }

    if (password.length < 6) {
        throw new UserValidationErrors(
            "Password must be at least 6 characters long!",
            400
        );
    }

    if (password !== confirmPassword) {
        throw new UserValidationErrors("Passwords do not match!", 400);
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new UserValidationErrors("User not found!", 404);
    }

    user.password = password;
    await user.save();
};

exports.updateUserStatus = async (req, newStatus) => {
    const userId = req.params.userId;

    if (!validateObjectId(userId)) {
        throw new UserValidationErrors("Invalid user ID!", 400);
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { status: newStatus },
        { new: true }
    );

    if (!updatedUser) {
        throw new UserValidationErrors("User does not exist!", 404);
    }

    return {
        _id: updatedUser._id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        userRole: updatedUser.userRole,
        status: updatedUser.status,
    };
};

exports.getUsers = async (req) => {
    const { status, userRole, limit = 100, offset = 0 } = req.query;

    const query = {};
    const parsedLimit = parseInt(limit, 10);
    const parsedOffset = parseInt(offset, 10);

    if (isNaN(parsedLimit) || parsedLimit <= 0 || parsedLimit > 100) {
        throw new UserValidationErrors(
            "Limit value must be greater than 0 and not greater than 100!",
            400
        );
    }

    if (isNaN(parsedOffset) || parsedOffset < 0) {
        throw new UserValidationErrors(
            "Offset value must not be below 0!",
            400
        );
    }

    if (status && !["active", "inactive"].includes(status)) {
        throw new UserValidationErrors(
            "Invalid status. Status can only be 'active' or 'inactive'.",
            400
        );
    }

    if (userRole && !["admin", "employee", "customer"].includes(userRole)) {
        throw new UserValidationErrors(
            "Invalid user role. Roles can only be either 'employee', or 'customer'.",
            400
        );
    }

    if (status) {
        query.status = status;
    }

    if (userRole) {
        query.userRole = userRole;
    }

    const users = await User.find(query)
        .select("-password -updatedAt")
        .skip(parsedOffset)
        .limit(parsedLimit);

    const total = await User.countDocuments(query);

    return {
        total,
        items: users,
    };
};
