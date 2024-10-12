const mongoose = require("mongoose");
const { Schema } = mongoose;

const hoursSchema = new Schema({
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userExperience: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
        min: 0.5,
        max: 8,
    },
    notes: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
});

const Hours = mongoose.model("Hours", hoursSchema);
module.exports = Hours;
