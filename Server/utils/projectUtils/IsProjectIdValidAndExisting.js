const Project = require("../../models/Project");

const ProjectValidationErrors = require("../../errors/projectsValidationErrors");
const InvitesValidationErrors = require("../../errors/invitesValidationErrors");
const { validateObjectId } = require("../validateObjectIdUtil");

const isProjectIdExistingAndAccessible = async (projectId, userId = null) => {
    if (!validateObjectId(projectId)) {
        throw new ProjectValidationErrors(
            `Invalid project ID format: ${projectId}`,
            400
        );
    }

    const project = await Project.findById(projectId);

    if (!project) {
        throw new InvitesValidationErrors(
            `Project with the provided ID does not exist: ${projectId}`,
            400
        );
    }

    if (userId) {
        if (!project.employeeIds.includes(userId) && !project.customerIds.includes(userId)) {
            throw new ProjectValidationErrors("Inaccessible item", 403);
        }
    }
};

module.exports = isProjectIdExistingAndAccessible;
