const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validateObjectId } = require("../utils/validateObjectIdUtil");
const {
    validateUserDataOnUserCreate,
    validateUserDataOnUserUpdate,
} = require("../utils/validateUserDataUtil");

const { generateToken } = require("../utils/jwt");
const UserValidationErrors = require("../errors/userValidationErrors");

exports.login = async (userData) => {
    const user = await User.findOne({ email: userData.email });

    if (!user) {
        throw new UserValidationErrors("Invalid email or password!", 400);
    }

    if (user.status == "inactive") {
        throw new UserValidationErrors(
            "Your account is inactive. Please contact support!",
            400
        );
    }

    const isValid = await bcrypt.compare(userData.password, user.password);

    if (!isValid) {
        throw new UserValidationErrors("Invalid email or password!", 400);
    }

    const token = generateToken(user);

    return {
        user: {
            email: user.email,
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
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
        userRole,
        description,
    } = userData;

    await validateUserDataOnUserCreate(userData);

    const newUser = {
        email,
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

    const user = await User.create(newUser);

    const response = {
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

    return response;
};

exports.editUser = async (id, userData) => {
    await validateUserDataOnUserUpdate(id, userData);

    delete userData.password;
    delete userData.email;

    const user = await User.findById(id).exec();

    Object.assign(user, userData);
    await user.save();

    return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userRole: user.userRole,
    };
};

exports.getSingleUser = (userId) => User.findById(userId).select("-password");

exports.updateUserStatus = async (userId, newStatus) => {
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

exports.getUsers = async (queryData) => {
    t;
    const query = {};

    if (queryData.status) {
        query.status = queryData.status;
    }

    if (queryData.userRole) {
        query.userRole = queryData.userRole;
    }

    const users = await User.find(query)
        .select("-password -updatedAt")
        .skip(queryData.offset)
        .limit(queryData.limit);

    const total = await User.countDocuments(query);

    return {
        total: total,
        items: users,
    };
};
