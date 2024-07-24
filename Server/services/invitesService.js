const Invite = require("../models/Invite");

const InvitesValidationErrors = require("../errors/invitesValidationErrors");
const isValidUUID = require("../utils/validationUtils/validateUUID");

exports.validateInvite = async (req) => {
    const inviteUUID = req.params.id;

    if (!isValidUUID(inviteUUID)) {
        throw new InvitesValidationErrors("Invalid UUID provided!", 400);
    }

    const invite = await Invite.findOne({ uuid: inviteUUID });

    if (!invite) {
        throw new InvitesValidationErrors("Invite not found!", 404);
    }

    if (invite.expiresOn < new Date()) {
        throw new InvitesValidationErrors("Invite has expired!", 410);
    }

    return invite;
};