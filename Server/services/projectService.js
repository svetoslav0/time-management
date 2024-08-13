const path = require("path");

const Project = require("../models/Project");
const Hours = require("../models/Hours");
const userService = require("../services/userService");
const {
    validateProjectData,
    validateProjectStatus,
} = require("../utils/validateProjectDataUtil");
const ProjectValidationErrors = require("../errors/projectsValidationErrors");
const { validateObjectId } = require("../utils/validateObjectIdUtil");
const formatDate = require("../utils/formatDateUtil");
const getProjectByRole = require("../utils/getProjectByRole");
const createInvites = require("../utils/createInvitesUtil");
const { areInviteEmailsValid } = require("../utils/validateEmailUtil");
const generatePdf = require("../utils/generatePdfUtil");

exports.createProject = async (req) => {
    const projectData = req.body;

    await validateProjectData(projectData);

    const project = await Project.create({
        customerIds: projectData.customerIds,
        projectName: projectData.projectName,
        startingDate: projectData.startingDate,
        pricePerHour: projectData.pricePerHour,
        employeeIds: projectData.employeeIds,
    });

    if (
        projectData.inviteEmails &&
        areInviteEmailsValid(projectData.inviteEmails)
    ) {
        createInvites(projectData.inviteEmails, project._id);
    }

    return {
        projectId: project._id,
        customerIds: project.customerIds,
        projectName: project.projectName,
        startingDate: project.startingDate,
        pricePerHour: project.pricePerHour,
        employeeIds: project.employeeIds,
    };
};

exports.getProjects = async (req) => {
    const { status, employeeId } = req.query;
    const userId = req.userToken._id;

    if (employeeId) {
        if (!validateObjectId(employeeId)) {
            throw new ProjectValidationErrors(
                "Invalid employee ID format",
                400
            );
        }
    }

    if (status) {
        await validateProjectStatus(status);
    }

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

    if (projects.length === 0) {
        throw new ProjectValidationErrors("No projects found", 403);
    }

    return projects;
};

exports.getSingleProject = (req) => {
    const projectId = req.params.id;

    if (!validateObjectId(projectId)) {
        throw new ProjectValidationErrors("Invalid project ID format", 400);
    }

    return Project.findById(projectId);
};

exports.updateProject = async (req) => {
    const projectData = req.body;
    const projectId = req.params.id;

    if (!projectData.status) {
        throw new ProjectValidationErrors("No status provided!", 400);
    }

    await validateProjectStatus(projectData.status);
    await validateProjectData(projectData);

    const query = {
        ...projectData,
    };

    if (projectData.status) {
        query.status = projectData.status;
    }

    const project = await Project.findByIdAndUpdate(projectId, query, {
        new: true,
    });

    if (areInviteEmailsValid(projectData.inviteEmails)) {
        createInvites(projectData.inviteEmails, project._id);
    }

    return {
        customerIds: project.customerIds,
        projectName: project.projectName,
        startingDate: project.startingDate,
        pricePerHour: project.pricePerHour,
        employeeIds: project.employeeIds,
    };
};

exports.getReport = async (req) => {
    const projectId = req.params.id;
    const userId = req.userToken._id;
    const userRole = req.userToken.userRole;

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

    const hours = await Hours.find({ projectId }).populate(
        "userId",
        "firstName"
    );

    if (!hours || hours.length === 0) {
        throw new ProjectValidationErrors(
            "Could not generate report for the specified project. No hours logged.",
            404
        );
    }

    const totalPrice = hours.reduce(
        (total, hour) => total + hour.hours * project.pricePerHour,
        0
    );

    return {
        projectData: {
            employeeNames: project.employeeIds.map(
                (employee) => employee.firstName
            ),
            customerNames: project.customerIds.map(
                (customer) => customer.firstName
            ),
            projectName: project.projectName,
            startingDate: formatDate(project.startingDate),
            pricePerHours: project.pricePerHour,
        },
        hours: hours.map((hour) => ({
            id: hour._id,
            employeeName: hour.userId.firstName,
            date: formatDate(hour.date),
            hours: hour.hours,
            notes: hour.notes,
        })),
        totalPrice: totalPrice,
    };
};

exports.getReportPdf = async (req) => {
    const reportData = await this.getReport(req);

    const templatePath = path.join(
        __dirname,
        "../templates/projectReport/projectReportTemplate.hbs"
    );

    const pdfBuffer = await generatePdf(reportData, templatePath);

    return pdfBuffer;
};
