const Invite = require("../../models/Invite");

const InvitesValidationErrors = require("../../errors/invitesValidationErrors");
const isValidUUID = require("./validateUuidUtil");

const IsInviteValid = async (inviteUUID) => {
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

module.exports = IsInviteValid;