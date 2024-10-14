const Invite = require("../../models/Invite");

const ApiException = require("../../errors/ApiException");
const isValidUUID = require("./validateUuidUtil");

const IsInviteValid = async (inviteUUID) => {
    if (!isValidUUID(inviteUUID)) {
        throw new ApiException("Invalid UUID provided!", 400);
    }

    const invite = await Invite.findOne({ uuid: inviteUUID });

    if (!invite) {
        throw new ApiException("Invite not found!", 404);
    }

    if (invite.expiresOn < new Date()) {
        throw new ApiException("Invite has expired!", 410);
    }

    return invite;
};

module.exports = IsInviteValid;
