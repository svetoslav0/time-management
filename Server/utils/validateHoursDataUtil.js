const Project = require("../models/Project");

const { validateObjectId } = require("./validateObjectIdUtil");
const isValidDateMoment = require("./validateDateUtil");
const HoursValidationErrors = require("../errors/hoursValidationErrors");

const validateHourDataOnLogHours = async (hoursData) => {
    const { projectId, date, hours, notes, userId } = hoursData;

    if (!validateObjectId(projectId)) {
        throw new HoursValidationErrors("Invalid project ID!", 400);
    }
  
    if (!validateObjectId(userId)) {
        throw new HoursValidationErrors("Invalid user ID!", 400);
    }
  
    if (typeof hours !== "number" || hours < 1 || hours > 8) {
        throw new HoursValidationErrors(
            "Hours must be a number between 1 and 8!",
            400
        );
    }

    const isValidDate = await isValidDateMoment(date);
    if (!isValidDate) {
        throw new HoursValidationErrors(
            "Invalid date format! Date must be YYYY-MM-DD!",
            400
        );
    }

    let project;

    project = await Project.findById(projectId);

    if (!project) {
        throw new HoursValidationErrors(
            "Project with that ID does not exist!",
            400
        );
    }
};
module.exports = {
    validateHourDataOnLogHours,
};
