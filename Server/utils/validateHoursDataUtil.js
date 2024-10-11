const Project = require("../models/Project");

const { validateObjectId } = require("./validateObjectIdUtil");
const isValidDateMoment = require("./validateDateUtil");
const ApiException = require("../errors/ApiException");

const validateHourDataOnLogHours = async ({
    projectId,
    date,
    hours,
    notes,
    userId,
}) => {
    if (!validateObjectId(projectId)) {
        throw new ApiException("Invalid project ID!", 400);
    }

    if (!validateObjectId(userId)) {
        throw new ApiException("Invalid user ID!", 400);
    }

    if (typeof hours !== "number" || hours < 0.5 || hours > 8) {
        throw new ApiException(
            "Hours must be a number between 0.5 and 8!",
            400
        );
    }

    const isValidDate = await isValidDateMoment(date);
    if (!isValidDate) {
        throw new ApiException(
            "Invalid date format! Date must be YYYY-MM-DD!",
            400
        );
    }

    if (!notes || notes.trim() === "") {
        throw new ApiException("Notes cannot be empty!", 400);
    }

    let project;

    project = await Project.findById(projectId);

    if (!project) {
        throw new ApiException(
            "Project with that ID does not exist!",
            400
        );
    }
};
module.exports = {
    validateHourDataOnLogHours,
};
