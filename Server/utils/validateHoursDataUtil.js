const Project = require("../models/Project");

const { validateObjectId } = require("./validateObjectIdUtil");
const isValidDateMoment = require("./validateDateUtil");

const validateHourDataOnLogHours = async (hoursData) => {
    const {
        projectId,
        date,
        hours,
        notes,
        userId
    } = hoursData;

    if (!validateObjectId(projectId)) {
        throw new Error("Invalid project ID!");
    }
    if (typeof hours !== 'number' || hours < 1 || hours > 8) {
        throw new Error("Hours must be a number between 1 and 8!");
    }

    const isValidDate = await isValidDateMoment(date);
    if (!isValidDate) {
        throw new Error("Invalid date format! Date must be YYYY-MM-DD!");
    }

    let project;

    try {
        project = await Project.findById(projectId);
    } catch (error) {
        console.error('Error during validation:', error);
        throw new Error("Trouble logging hours!");
    }

    if (!project) {
        throw new Error("Project with that ID does not exist!");
    }

};
module.exports = {
    validateHourDataOnLogHours
};