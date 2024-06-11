const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  customerIds: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  projectName: {
    type: String,
    required: true
  },
  startingDate: {
    type: Date,
    required: true
  },
  pricePerHour: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["inProgress", "completed"],
    default: "inProgress",
  },
  employeeIds: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;