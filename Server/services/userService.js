const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validateObjectId } = require("../utils/validateObjectId");
const {
    validateUserDataOnUserCreate,
    validateUserDataOnUserUpdate,
} = require("../utils/validateUserDataUtil");

const { generateToken } = require("../utils/jwt");

exports.login = async (userData) => {
    const user = await User.findOne({ email: userData.email });

    if (!user) {
        throw new Error("Invalid email or password!");
    }

    if (user.status == "inactive") {
        throw new Error("Your account is inactive. Please contact support!");
    }

    const isValid = await bcrypt.compare(userData.password, user.password);

    if (!isValid) {
        throw new Error("Invalid email or password!");
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

    try {
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

    delete userData.password;
    delete userData.email;

    try {
        const user = await User.findById(id).exec();

        Object.assign(user, userData);
        await user.save();

        return {
            email: user.email,
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

exports.getSingleUser = (userId) => User.findById(userId).select("-password");

exports.updateUserStatus = async (userId, newStatus) => {
    if (!isValidObjectId(userId)) {
        throw new Error("Invalid user ID");
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { status: newStatus },
        { new: true }
    );

    if (!updatedUser) {
        throw new Error("User does not exist");
    }

    return {
        _id: updatedUser._id,
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        userRole: updatedUser.userRole,
        status: updatedUser.status,
    };
};

exports.getUsers = async (queryData) => {
    try {
        const query = {};

        if (queryData.status) {
            query.status = queryData.status;
        }

        if (queryData.userRole) {
            query.userRole = queryData.userRole;
        }

        const users = await User.find(query)
            .select("email firstName lastName userRole")
            .skip(queryData.offset)
            .limit(queryData.limit);

        const total = await User.countDocuments(query);

        return {
            total: total,
            items: users,
        };
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Internal Server Error!");
    }
};
