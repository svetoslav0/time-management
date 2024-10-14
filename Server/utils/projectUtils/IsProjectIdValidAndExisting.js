const Project = require("../../models/Project");

const ApiException = require("../../errors/ApiException");
const { validateObjectId } = require("../validateObjectIdUtil");

const isProjectIdExistingAndAccessible = async (projectId, userId = null) => {
    if (!validateObjectId(projectId)) {
        throw new ApiException(
            `Invalid project ID format: ${projectId}`,
            400
        );
    }

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiException(
            `Project with the provided ID does not exist: ${projectId}`,
            400
        );
    }

    if (userId) {
        if (!project.employeeIds.includes(userId) && !project.customerIds.includes(userId)) {
            throw new ApiException("Inaccessible item", 403);
        }
    }
};

module.exports = isProjectIdExistingAndAccessible;
