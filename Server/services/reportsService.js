const path = require("path");

const Report = require("../models/Report");
const Hours = require("../models/Hours");

const { getProjectByRoleIfNotAdmin } = require("../utils/getProjectByRole");

const ProjectValidationErrors = require("../errors/projectsValidationErrors");
const formatDate = require("../utils/formatDateUtil");
const generatePdf = require("../utils/generatePdfUtil");

const base64encoding = "base64";

exports.getReportBuffer = async (projectId, userId, userRole) => {
    let report = await Report.findOne({ projectId });

    if (report && !await shouldRegenerateReport(projectId, report._id)) {
        return Buffer.from(report.bytes, base64encoding);
    }

    report = await this.saveOrUpdateReportBuffer(projectId, userId, userRole);

    return Buffer.from(report.bytes, base64encoding);
}

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
            bytes: base
        },
        {
            new: true,
    });
}

exports.collectReportData = async (data) => {
    const { projectId, userId, userRole } = data;

    const project = await getProjectByRoleIfNotAdmin(
        projectId,
        userId,
        userRole
    );

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
                (employee) => employee.firstName + " " + employee.lastName
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

const generateReportBuffer = async (projectId, userId, userRole) => {
    const reportData = await this.collectReportData({
        projectId,
        userId,
        userRole,
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

    const updatedReportHours = await Hours.find({ projectId, updatedAt: { $gt: reportUpdatedAtDate } });

    return updatedReportHours.length > 0;
};
