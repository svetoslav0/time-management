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

    return project === null ? false : true;
};

module.exports = isProjectIdValidAndExisting;