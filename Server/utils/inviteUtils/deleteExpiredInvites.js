const Invite = require("../../models/Invite");

const deleteExpiredInvites = async () => {
    try {
        const expiredInvites = await Invite
            .find({expiresOn: {$lt: new Date()}});

        const ids = expiredInvites
            .map(x => x._id);

        if (ids.length) {
            Invite.deleteMany({ _id: { $in: ids } })
                .then(() => {
                    console.log(`The following expired Invite IDs were successfully removed: ${ids.join(", ")}`);
                });
        }
    } catch (error) {
        console.error("Could not delete expired invites.");
        console.error(error);
    }
};

module.exports = deleteExpiredInvites;
