const mongoose = require('mongoose');
const { Schema } = mongoose;

const hoursSchema = new Schema({
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    hours: {
        type: Number,
        required: true,
        min: 1,
        max: 8
    },
    notes: {
        type: String
    }
});

const Hours = mongoose.model('Hours', hoursSchema);
module.exports = Hours;