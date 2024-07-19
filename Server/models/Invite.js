const mongoose = require("mongoose");
const { Schema } = mongoose;

const InviteChema = new Schema({
    email: {
        type: String,
        required: true,
    },
    uuid: {
        type: String,
        required: true,
    },
    expiresOn: {
        type: Date,
        required: true,
    },
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: "Project",
        required: true,
    },
});

const Invite = mongoose.model("Invite", InviteChema);
module.exports = Invite;
