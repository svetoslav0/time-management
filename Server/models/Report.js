const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReportSchema = new Schema({
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    bytes: {
        type: String,
        required: true,
    }
},
{
    timestamps: true,
});

const Report = mongoose.model("Report", ReportSchema);
module.exports = Report;
