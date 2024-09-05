const Invite = require("../../models/Invite");

const getInvitesByProjectId = async (projectId) => {
    return await Invite.find({ projectId: projectId });
};

module.exports = getInvitesByProjectId;