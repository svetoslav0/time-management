const Project = require("../../models/Project");

const ReportValidationErrors = require("../../errors/reportsValidationErrors");
const { validateObjectId } = require("../validateObjectIdUtil");
const validateDate = require("../validateDateUtil");

const validateReportParams = async (name, projectId, startDate, endDate) => {
    if (!name) {
        throw new ReportValidationErrors("Name parameter is required!", 400);
    }

    if (!projectId) {
        throw new ReportValidationErrors("ProjectId parameter is required!", 400);
    }

    if (!validateObjectId(projectId)) {
        throw new ReportValidationErrors(`ProjectId parameter is invalid: ${projectId}`, 400);
    }

    const projectExists = await Project.findById(projectId);
    if (!projectExists) {
        throw new ReportValidationErrors(`ProjectId does not exist: ${projectId}`, 404);
    }

    if (!startDate) {
        throw new ReportValidationErrors("StartDate parameter is required!", 400);
    }

    const isStartDateValid = await validateDate(startDate);

    if (!isStartDateValid) {
        throw new ReportValidationErrors(`StartDate has invalid value: ${startDate}`, 400);
    }

    if (!endDate) {
        throw new ReportValidationErrors("EndDate parameter is required!", 400);
    }

    const isEndDateValid = await validateDate(endDate);

    if (!isEndDateValid) {
        throw new ReportValidationErrors(`EndDate has invalid value: ${endDate}`, 400);
    }
};

module.exports = validateReportParams;
