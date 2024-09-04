const User = require("../../models/User");

const { validateInviteEmails } = require("../validateEmailUtil");
const createInvites = require("../createInvitesUtil");

const sendInvitesToNonExistingUsers = async (emailsToSendInvite, projectId) => {
    const emailsArray = Array.isArray(emailsToSendInvite) ? emailsToSendInvite : [emailsToSendInvite];

    await validateInviteEmails(emailsArray);

    const existingUsersWithEmails = await User.find({
        email: { $in: emailsArray }
    }, 'email');

    const existingEmails = existingUsersWithEmails.map(user => user.email);
    const nonExistingEmails = emailsArray.filter(email => !existingEmails.includes(email));

    createInvites(nonExistingEmails, projectId);
};

module.exports = sendInvitesToNonExistingUsers;
