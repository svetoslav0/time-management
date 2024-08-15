const User = require("../../models/User");

const sendInvitesToNonExistingUsers = async (emailsToSendInvite, projectId) => {
    if (areInviteEmailsValid(emailsToSendInvite)) {
        const existingUsersWithEmails = await User.find({
            email: { $in: emailsToSendInvite }
        }, 'email');

        const existingEmails = existingUsersWithEmails.map(user => user.email);
        const nonExistingEmails = emailsToSendInvite.filter(email => !existingEmails.includes(email));

        createInvites(nonExistingEmails, projectId);
    }
};

module.exports = sendInvitesToNonExistingUsers;