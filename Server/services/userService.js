const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validateObjectId } = require("../utils/validateObjectIdUtil");
const {
    validateUserDataOnUserCreate,
    validateUserDataOnUserUpdate,
} = require("../utils/validateUserDataUtil");
 
const { generateToken } = require("../utils/jwt");
const populateProjectsForUser = require("../utils/populateProjectsForUser");
const UserValidationErrors = require("../errors/userValidationErrors");
const AuthError = require("../errors/authError");
const { verifyGoogleToken } = require("../utils/verifyGoogleTokenUtil");

const getActiveUserByEmail = async (email) => {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (!user) {
        throw new UserValidationErrors("Invalid email or password!", 400);
    }
 
    if (user.status == "inactive") {
        throw new UserValidationErrors(
            "Your account is inactive. Please contact support!",
            400
        );
    } 
    return user;
}
 
const validatePassword = async (inputPassword, userPassword) => {
    const isValid = await bcrypt.compare(inputPassword, userPassword);

    if (!isValid) {
        throw new UserValidationErrors("Invalid email or password!", 400);
    }
}
 
exports.validateCredentials = async (req) => {
    const { email, password } = req.body;
 
    if (!email || !password) {
        throw new UserValidationErrors("email and password parameters are required!", 400);
    }
 
    const user = await getActiveUserByEmail(email);
 
    await validatePassword(password, user.password);
}
 
exports.login = async (req) => {
    const { email, password } = req.body;
 
    const user = await getActiveUserByEmail(email);
  
    if (!user.password) {
        throw new UserValidationErrors("Try login with google!", 400);
    }
    
    await validatePassword(password, user.password);
 
    const token = generateToken(user);
 
    const expire = Date.now() + 7 * 24 * 60 * 60 * 1000;
 
    return {
        user: {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userRole: user.userRole,
            status: user.status,
            isGoogleUser: user.isGoogleLogin,
            expire,
        },
        token,
    };
};
 
exports.googleLogin = async (req) => {
    const googleToken = req.params.token;
 
    const payload = await verifyGoogleToken(googleToken);
 
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
            isGoogleUser: user.isGoogleLogin,
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

    const clone = JSON.parse(JSON.stringify(user));
    clone.projects = await populateProjectsForUser(user);

    return clone;
};
exports.restorePassword = async (req) => {
    const { password, confirmPassword } = req.body;
    const userId = req.params.id;
 
    if (req.userToken.userRole !== "admin" && req.userToken._id !== userId) {
        throw new AuthError("Action forbidden!", 403);
    }
 
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
        .limit(parsedLimit)
        .sort({
            status: 1,
        });
 
    const total = await User.countDocuments(query);
 
    return {
        total,
        items: users,
    };
};

exports.isUserExisting = async (email) => {
    return User.findOne({email});
};
