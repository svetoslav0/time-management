const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  customerIds: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
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
    required: false,
  },
  pricePerHourForJunior: {
    type: Number,
    required: true
  },
  pricePerHourForMid: {
    type: Number,
    required: true
  },
  pricePerHourForSenior: {
    type: Number,
    required: true
  },
  pricePerHourForArchitect: {
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