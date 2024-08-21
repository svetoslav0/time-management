const Project = require("../models/Project");
const ProjectValidationErrors = require("../errors/projectsValidationErrors");
const { validateObjectId } = require("../utils/validateObjectIdUtil");

const getProjectByRole = async (projectId, userId, userRole) => {
    const query = { _id: projectId };

    if (userRole === "customer") {
        query.customerIds = userId;
    } else if (userRole === "employee") {
        query.employeeIds = userId;
    }

    return Project.findOne(query).populate(
        "customerIds employeeIds",
        "firstName lastName",
        
    );
};

const getProjectByRoleIfNotAdmin = async (projectId, userRole, userId) => {
    if (!validateObjectId(projectId)) {
        throw new ProjectValidationErrors("Invalid project ID format!", 400);
    }

    let project;
    if (userRole === "admin") {
        project = await Project.findById(projectId).populate(
            "customerIds employeeIds",
            "firstName"
        );
    } else {
        project = await getProjectByRole(projectId, userId, userRole);
        if (!project) {
            throw new ProjectValidationErrors("Access denied!", 403);
        }
    }

    if (!project) {
        throw new ProjectValidationErrors("Project not found!", 404);
    }

    return project;
};

module.exports = {
    getProjectByRole,
    getProjectByRoleIfNotAdmin
};
