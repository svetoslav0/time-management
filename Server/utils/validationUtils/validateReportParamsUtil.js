const Project = require("../../models/Project");

const ApiException = require("../../errors/ApiException");
const { validateObjectId } = require("../validateObjectIdUtil");
const validateDate = require("../validateDateUtil");

const validateReportParams = async (name, projectId, startDate, endDate) => {
    if (!name) {
        throw new ApiException("Name parameter is required!", 400);
    }

    if (!projectId) {
        throw new ApiException("ProjectId parameter is required!", 400);
    }

    if (!validateObjectId(projectId)) {
        throw new ApiException(`ProjectId parameter is invalid: ${projectId}`, 400);
    }

    const projectExists = await Project.findById(projectId);
    if (!projectExists) {
        throw new ApiException(`ProjectId does not exist: ${projectId}`, 404);
    }

    if (!startDate) {
        throw new ApiException("StartDate parameter is required!", 400);
    }

    const isStartDateValid = await validateDate(startDate);

    if (!isStartDateValid) {
        throw new ApiException(`StartDate has invalid value: ${startDate}`, 400);
    }

    if (!endDate) {
        throw new ApiException("EndDate parameter is required!", 400);
    }

    const isEndDateValid = await validateDate(endDate);

    if (!isEndDateValid) {
        throw new ApiException(`EndDate has invalid value: ${endDate}`, 400);
    }
};

module.exports = validateReportParams;
