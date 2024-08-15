const User = require("../models/User");
const Project = require("../models/Project");

const ProjectValidationErrors = require("../errors/projectsValidationErrors");
const UserValidationErrors = require("../errors/userValidationErrors");
const InvitesValidationErrors = require("../../errors/invitesValidationErrors");

const {
    validateUserDataOnUserCreate
} = require("../utils/validateUserDataUtil");
const IsInviteValid = require("../utils/validationUtils/validateInviteUtil");
const { validateObjectId } = require("../utils/validateObjectIdUtil");
const sendInvitesToNonExistingUsers = require("../utils/inviteEmailsUtils/sendInvitesToNonExistingUsers");

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

exports.sendInvite = async (req) => {
    const projectId = req.body.projectId;
    const emailToSendInvite = req.body.inviteEmail;

    const isProjectIdValidAndExisting = await isProjectIdValidAndExisting(projectId);

    if (isProjectIdValidAndExisting === false) {
        throw new InvitesValidationErrors(
            "Project with the provided ID does not exist!",
            400
        );
    }

    await sendInvitesToNonExistingUsers(emailToSendInvite, projectId);
};

async function isProjectIdValidAndExisting(projectId) {
    if (!validateObjectId(projectId)) {
        throw new ProjectValidationErrors(
            "Invalid project ID format",
            400
        );
    }

    const project = await Project.findById(projectId).select('_id');

    return project === null ? false : true;
};
