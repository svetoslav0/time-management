const Project = require("../../models/Project");

const ProjectValidationErrors = require("../../errors/projectsValidationErrors");
const { validateObjectId } = require("../validateObjectIdUtil");
const validateDate = require("../validateDateUtil");

const validateReportParams = async (name, projectId, startDate, endDate) => {
    if (!name) {
        throw new ProjectValidationErrors("Name parameter is required!");
    }

    if (!projectId) {
        throw new ProjectValidationErrors("ProjectId parameter is required!");
    }

    if (!validateObjectId(projectId)) {
        throw new ProjectValidationErrors(`ProjectId parameter is invalid: ${projectId}`);
    }

    const projectExists = await Project.findById(projectId);
    if (!projectExists) {
        throw new ProjectValidationErrors(`ProjectId does not exist: ${projectId}`);
    }

    if (!startDate) {
        throw new ProjectValidationErrors("StartDate parameter is required!");
    }

    const isStartDateValid = await validateDate(startDate);

    if (!isStartDateValid) {
        throw new ProjectValidationErrors(`StartDate has invalid value: ${startDate}`);
    }

    if (!endDate) {
        throw new ProjectValidationErrors("EndDate parameter is required!");
    }

    const isEndDateValid = await validateDate(endDate);

    if (!isEndDateValid) {
        throw new ProjectValidationErrors(`EndDate has invalid value: ${endDate}`);
    }
};

module.exports = validateReportParams;