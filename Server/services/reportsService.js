const path = require("path");

const Report = require("../models/Report");
const Hours = require("../models/Hours");

const { getProjectByRoleIfNotAdmin } = require("../utils/getProjectByRole");

const ProjectValidationErrors = require("../errors/projectsValidationErrors");
const validateReportParams = require("../utils/validationUtils/validateReportParamsUtil");
const formatDate = require("../utils/formatDateUtil");
const generatePdf = require("../utils/generatePdfUtil");
const { validateObjectId } = require("../utils/validateObjectIdUtil");
const ReportValidationErrors = require("../errors/reportsValidationErrors");

const base64encoding = "base64";

exports.getReportBuffer = async (projectId, userId, userRole) => {
    let report = await Report.findOne({ projectId });

    //if (report && !await shouldRegenerateReport(projectId, report._id)) {
    //return Buffer.from(report.bytes, base64encoding);
    //}

    //report = await this.saveOrUpdateReportBuffer(projectId, userId, userRole);

    return Buffer.from(report.bytes, base64encoding);
};

exports.saveOrUpdateReportBuffer = async (projectId, userId, userRole) => {
    const report = await Report.findOne({ projectId });

    const buffer = await generateReportBuffer(projectId, userId, userRole);

    const base = Buffer.from(buffer).toString(base64encoding);

    if (!report) {
        return await Report.create({
            projectId: projectId,
            bytes: base,
        });
    }

    return await Report.findByIdAndUpdate(
        report._id,
        {
            bytes: base,
        },
        {
            new: true,
        }
    );
};

exports.collectReportData = async (data) => {
    const { projectId, userId, userRole, startDate, endDate } = data;

    const project = await getProjectByRoleIfNotAdmin(
        projectId,
        userId,
        userRole
    );

    const query = { projectId };

    if (startDate) {
        query.date = { ...query.date, $gte: new Date(startDate) };
    }

    if (endDate) {
        query.date = { ...query.date, $lte: new Date(endDate) };
    }

    const hours = await Hours.find(query).populate("userId", "firstName");

    if (hours.length < 1 && startDate && endDate) {
        throw new ProjectValidationErrors(
            `No hours recorded for the project ${project.projectName} in the selected period from ${startDate} to ${endDate}!`
        );
    } else if (hours.length < 1) {
        throw new ProjectValidationErrors(
            `No hours recorded for the project ${project.projectName}!`
        );
    }

    const totalPrice = hours.reduce(
        (total, hour) => total + hour.hours * project.pricePerHour,
        0
    );

    const totalHours = hours.reduce((total, { hours = 0 }) => total + hours, 0);

    return {
        projectData: {
            employeeNames: project.employeeIds.map(
                (employee) => `${employee.firstName} ${employee.lastName}`
            ),
            customerNames: project.customerIds.map(
                (customer) => `${customer.firstName} ${customer.lastName}`
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
        totalPrice: totalPrice.toFixed(2),
        totalHours: totalHours,
    };
};

exports.createReport = async (req) => {
    const { name, projectId, startDate, endDate } = req.body;
    const { userId, userRole } = req.userToken;

    await validateReportParams(name, projectId, startDate, endDate);

    const buffer = await generateReportBuffer(
        projectId,
        userId,
        userRole,
        startDate,
        endDate
    );

    const base = Buffer.from(buffer).toString(base64encoding);

    const report = await Report.create({
        projectId: projectId,
        bytes: base,
        name: name,
        startDate: startDate,
        endDate: endDate,
    });

    return {
        _id: report._id,
        name: report.name,
        projectId: report.projectId,
        startDate: report.startDate,
        endDate: report.endDate,
    };
};

exports.deleteReport = async (req) => {
    const reportId = req.params.id;

    if (!validateObjectId(reportId)) {
        throw new ReportValidationErrors("Such report was not found", 404);
    }
    const deletedReport = await Report.findByIdAndDelete(reportId);

    if (!deletedReport) {
        throw new ReportValidationErrors("Such report was not found", 404);
    }

    return deletedReport;
};

const generateReportBuffer = async (
    projectId,
    userId,
    userRole,
    startDate,
    endDate
) => {
    const reportData = await this.collectReportData({
        projectId,
        userId,
        userRole,
        startDate,
        endDate,
    });

    const templatePath = path.join(
        __dirname,
        "../templates/projectReport/projectReportTemplate.hbs"
    );

    return await generatePdf(reportData, templatePath);
};

const shouldRegenerateReport = async (projectId, reportId) => {
    const report = await Report.findById(reportId);
    const reportUpdatedAtDate = new Date(report.updatedAt);

    const updatedReportHours = await Hours.find({
        projectId,
        updatedAt: { $gt: reportUpdatedAtDate },
    });

    return updatedReportHours.length > 0;
};
