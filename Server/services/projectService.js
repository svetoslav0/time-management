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
    try {
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
    } catch (error) {
        if (error.name === "ValidationError") {
            throw new Error(error.message);
        } else {
            throw new Error("Trouble creating a new project!");
        }
    }
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

    try {
        const projects = await Project.find(query);
        const user = await userService.getSingleUser(userId)
        console.log(user)
        
        if(user.userRole === 'admin'){
            return projects
        }else if(user.userRole === 'employee'){
            return projects.filter(project => project.employeeIds.includes(user._id));
        }else if(user.userRole === 'customer'){
            return projects.filter(project => project.customerIds.includes(user._id));
        }
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw new Error("Internal Server Error");
    }
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

    try {
        const project = await Project.findByIdAndUpdate(
            projectId,
            projectData,
            { new: true }
        );

        return {
            customerIds: project.customerIds,
            projectName: project.projectName,
            startingDate: project.startingDate,
            pricePerHour: project.pricePerHour,
            employeeIds: project.employeeIds,
        };
    } catch (error) {
        if (error.name === "ValidationError") {
            throw new Error(error.message);
        } else {
            console.error(error);
            throw new Error("Trouble editing the project!");
        }
    }
};
