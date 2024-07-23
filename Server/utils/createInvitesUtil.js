const { v4: uuidv4 } = require("uuid");
const Invite = require("../models/Invite");
const sendInviteEmails = require("./sendInviteEmailsUtil");

const createInvites = async (inviteEmails, projectId) => {
    const currentDate = new Date();
    const expirationDate = new Date(
        currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
    );

    const invites = inviteEmails.map((email) => {
        return {
            email,
            uuid: uuidv4(),
            expiresOn: expirationDate,
            projectId,
        };
    });

    await Invite.insertMany(invites);

    sendInviteEmails(invites);
};

module.exports = createInvites;
