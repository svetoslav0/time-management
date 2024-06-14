const Project = require("../models/Project");
const validateProjectData = require("../utils/validateProjectData");

exports.createProject = async (projectData) => {
    const {
        customerIds,
        projectName,
        startingDate,
        pricePerHour,
        employeeIds,
    } = projectData;

    await validateProjectData(
        customerIds,
        projectName,
        startingDate,
        pricePerHour,
        employeeIds
    );

    try {
        const project = await Project.create({
            customerIds: customerIds,
            projectName: projectName,
            startingDate: startingDate,
            pricePerHour: pricePerHour,
            employeeIds: employeeIds,
        });

        return {
            customerIds: customerIds,
            projectName: project.projectName,
            startingDate: project.startingDate,
            pricePerHour: project.pricePerHour,
            employeeIds: project.employeeIds,
        };
    } catch (error) {
        if (error.name === "ValidationError") {
            throw new Error(error.message);
        } else {
            throw new Error("Trouble creating a new project!");
        }
    }
};

exports.getSingleProject = (projectId) => Project.findById(projectId);

exports.updateProject = async (projectId, projectData) => {

    await validateProjectData(projectData);

    try {
        const project = await Project.findByIdAndUpdate(projectId, projectData );

        return {
            customerIds: project.customerIds,
            projectName: project.projectName,
            startingDate: project.startingDate,
            pricePerHour: project.pricePerHour,
            employeeIds: project.employeeIds
        };
    } catch (error) {
        if (error.name === "ValidationError") {
            throw new Error(error.message);
        } else {
            console.error(error);
            throw new Error("Trouble editing the project!");
        }
    }
}