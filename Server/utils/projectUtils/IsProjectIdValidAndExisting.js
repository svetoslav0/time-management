const Project = require("../../models/Project");

const ProjectValidationErrors = require("../../errors/projectsValidationErrors");
const { validateObjectId } = require("../validateObjectIdUtil");

const isProjectIdValidAndExisting = async (projectId) => {
    if (!validateObjectId(projectId)) {
        throw new ProjectValidationErrors(
            "Invalid project ID format",
            400
        );
    }

    const project = await Project.findById(projectId).select('_id');

    if (!project) {
        throw new InvitesValidationErrors(
            "Project with the provided ID does not exist!",
            400
        );
    }
};

module.exports = isProjectIdValidAndExisting;