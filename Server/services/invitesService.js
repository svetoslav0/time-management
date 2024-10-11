const User = require("../models/User");
const Invite = require("../models/Invite");
const Project = require("../models/Project");

const ApiException = require("../errors/ApiException");

const {
    validateUserDataOnUserCreate,
} = require("../utils/validateUserDataUtil");
const isInviteValid = require("../utils/validationUtils/validateInviteUtil");
const sendInvitesToNonExistingUsers = require("../utils/inviteEmailsUtils/sendInvitesToNonExistingUsers");
const deleteExpiredInvites = require("../utils/inviteUtils/deleteExpiredInvites");
const isProjectIdValidAndExisting = require("../utils/projectUtils/IsProjectIdValidAndExisting");
const { verifyGoogleToken } = require("../utils/verifyGoogleTokenUtil");
const { validateObjectId } = require("../utils/validateObjectIdUtil");

exports.validateInvite = async (req) => {
    const inviteUUID = req.params.id;

    return isInviteValid(inviteUUID);
};

exports.createCustomerOnInvite = async (req) => {
    const userData = req.body;
    userData.userRole = "customer";

    if (!userData.inviteId) {
        throw new ApiException("Invite id is required!", 400);
    }
    await isInviteValid(userData.inviteId);

    if (userData.isGoogleLogin) {
        const googleToken = userData.googleToken;

        if (!googleToken) {
            throw new ApiException(
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
        ...(password && { password }),
        userRole,
        ...(description && { description }),
        companyName,
        phoneNumber,
        address,
        ...(isGoogleLogin === true && { isGoogleLogin }),
    };

    const user = await User.create(newUser);
    const invite = await Invite.findOne({ uuid: userData.inviteId });
    const project = await Project.findById(invite.projectId);

    project.customerIds.push(user._id);
    await Project.findByIdAndUpdate(project._id, project);

    await Invite.findByIdAndDelete(invite._id);

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
        throw new ApiException("No project id provided!", 400);
    }

    await isProjectIdValidAndExisting(projectId);

    if (!emailToSendInvite || emailToSendInvite.trim().length < 1) {
        throw new ApiException("No inviteEmail parameter provided!", 400);
    }

    if (await User.findOne({ email: emailToSendInvite })) {
        throw new ApiException(`User with email ${emailToSendInvite} already exists and cannot be invited to create new account. If you want to add them in this project, simply use the Customers section`, 400);
    }

    const invite = await Invite.findOne({ projectId, email: emailToSendInvite, expiresOn: { $gt: new Date() } });
    if (invite) {
        throw new ApiException(
            `Email ${emailToSendInvite} already has a valid invite for project ${projectId} and expires on ${invite.expiresOn}`,
            400);
    }

    await sendInvitesToNonExistingUsers(emailToSendInvite, projectId);

    deleteExpiredInvites();
};

exports.deleteInvite = async (req) => {
    const inviteId = req.params.id;

    if (!validateObjectId(inviteId)) {
        throw new ApiException("Invalid invite ID“", 404);
    }

    const deletedInvite = await Invite.findByIdAndDelete(inviteId);

    if (!deletedInvite) {
        throw new ApiException("Invalid invite ID", 404);
    }

    return deletedInvite;
};
