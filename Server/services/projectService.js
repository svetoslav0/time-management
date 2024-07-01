const Project = require("../models/Project");
const userService = require('../services/userService')
const validateProjectData = require("../utils/validateProjectDataUtil");

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

    const project = await Project.create({
        customerIds: customerIds,
        projectName: projectName,
        startingDate: startingDate,
        pricePerHour: pricePerHour,
        employeeIds: employeeIds,
    });

    return {
        projectId: project._id,
        customerIds: customerIds,
        projectName: project.projectName,
        startingDate: project.startingDate,
        pricePerHour: project.pricePerHour,
        employeeIds: project.employeeIds,
    };
};

exports.getProjects = async (queryData, userId) => {
    const { status, employeeId } = queryData;

    const query = {};

    if (status) {
        query.status = status;
    }
    if (employeeId) {
        query.employeeIds = employeeId;
    }


    const user = await userService.getSingleUser(userId);

    if (user.userRole === "employee") {
        query.employeeIds = user._id;
    } else if (user.userRole === "customer") {
        query.customerIds = user._id;
    }

    const projects = await Project.find(query);

    return projects;
};

exports.getSingleProject = (projectId) => Project.findById(projectId);

exports.updateProject = async (projectId, projectData) => {
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

    const project = await Project.findByIdAndUpdate(projectId, projectData, {
        new: true,
    });

    return {
        customerIds: project.customerIds,
        projectName: project.projectName,
        startingDate: project.startingDate,
        pricePerHour: project.pricePerHour,
        employeeIds: project.employeeIds,
    };
};
