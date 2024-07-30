const User = require("../models/User");

const InvitesValidationErrors = require("../errors/invitesValidationErrors");
const UserValidationErrors = require("../errors/userValidationErrors");
const {
    validateUserDataOnUserCreate
} = require("../utils/validateUserDataUtil");
const IsInviteValid = require("../utils/validationUtils/validateInviteUtil");

exports.validateInvite = async (req) => {
    const inviteUUID = req.params.id;

    const invite = IsInviteValid(inviteUUID);

    return invite;
};

exports.createCustomerOnInvite = async (req) => {
    const userData = req.body;
    userData.userRole = "customer";

    if (!userData.inviteId) {
        throw new UserValidationErrors("Invite id is required!", 400);
    }

    await IsInviteValid(userData.inviteId);

    await validateUserDataOnUserCreate(userData);

    const {
        email,
        firstName,
        lastName,
        password,
        userRole,
        description,
        companyName,
        phoneNumber,
        address,
        isGoogleLogin
    } = userData;

    const newUser = {
        email,
        firstName,
        lastName,
        password,
        userRole,
        ...(description && { description }),
        companyName,
        phoneNumber,
        address,
        ...(isGoogleLogin === true && { isGoogleLogin })
    };

    const user = await User.create(newUser);

    return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userRole: user.userRole,
        companyName: user.companyName,
        phoneNumber: user.phoneNumber,
        address: user.address,
    };
};