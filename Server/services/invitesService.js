const User = require("../models/User");
const Invite = require("../models/Invite");

const UserValidationErrors = require("../errors/userValidationErrors");
const InvitesValidationErrors = require("../errors/invitesValidationErrors");

const {
    validateUserDataOnUserCreate,
} = require("../utils/validateUserDataUtil");
const isInviteValid = require("../utils/validationUtils/validateInviteUtil");
const sendInvitesToNonExistingUsers = require("../utils/inviteEmailsUtils/sendInvitesToNonExistingUsers");
const isProjectIdValidAndExisting = require("../utils/projectUtils/IsProjectIdValidAndExisting");
const { verifyGoogleToken } = require("../utils/verifyGoogleTokenUtil");
const { validateObjectId } = require("../utils/validateObjectIdUtil");

exports.validateInvite = async (req) => {
    const inviteUUID = req.params.id;

    const invite = isInviteValid(inviteUUID);

    return invite;
};

exports.createCustomerOnInvite = async (req) => {
    const userData = req.body;
    userData.userRole = "customer";

    if (!userData.inviteId) {
        throw new UserValidationErrors("Invite id is required!", 400);
    }
    await isInviteValid(userData.inviteId);

    if (userData.isGoogleLogin) {
        const googleToken = userData.googleToken;

        if (!googleToken) {
            throw new UserValidationErrors(
                "googleToken parameter is missing",
                401
            );
        }

        const payload = await verifyGoogleToken(googleToken);
    }

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
        isGoogleLogin,
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
        ...(isGoogleLogin === true && { isGoogleLogin }),
    };

    const user = await User.create(newUser);
    await Invite.findByIdAndDelete(userData.inviteId);

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

exports.sendInvite = async (req) => {
    const projectId = req.body.projectId;
    const emailToSendInvite = req.body.inviteEmail;

    if (!projectId) {
        throw new InvitesValidationErrors("No project id provided!", 400);
    }

    await isProjectIdValidAndExisting(projectId);

    if (!emailToSendInvite || emailToSendInvite.trim().length < 1) {
        throw new InvitesValidationErrors("No inviteEmail parameter provided!", 400);
    }

    const invite = await Invite.findOne({ projectId, email: emailToSendInvite, expiresOn: { $gt: new Date() } });
    if (invite) {
        throw new InvitesValidationErrors(
            `Email ${emailToSendInvite} already has a valid invite for project ${projectId} and expires on ${invite.expiresOn}`,
            400);
    }

    await sendInvitesToNonExistingUsers(emailToSendInvite, projectId);
};

exports.deleteInvite = async (req) => {
    const inviteId = req.params.id;

    if (!validateObjectId(inviteId)) {
        throw new InvitesValidationErrors("Invalid invite ID“", 404);
    }

    const deletedInvite = await Invite.findByIdAndDelete(inviteId);

    if (!deletedInvite) {
        throw new InvitesValidationErrors("Invalid invite ID", 404);
    }

    return deletedInvite;
};
