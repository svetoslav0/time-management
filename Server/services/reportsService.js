const path = require("path");

const Report = require("../models/Report");
const Hours = require("../models/Hours");

const { getProjectByRoleIfNotAdmin } = require("../utils/getProjectByRole");

const validateReportParams = require("../utils/validationUtils/validateReportParamsUtil");
const { formatDate, formatDateWithDay } = require("../utils/formatDateUtil");
const generatePdf = require("../utils/generatePdfUtil");
const { validateObjectId } = require("../utils/validateObjectIdUtil");
const ApiException = require("../errors/ApiException");
const isProjectIdValidAndExisting = require("../utils/projectUtils/IsProjectIdValidAndExisting");
const calculateReportTotalPrice = require("../utils/reports/calculateReportTotalPrice");

const base64encoding = "base64";

exports.getReportBuffer = async (recordId, userId, userRole) => {
    const isIdValid = validateObjectId(recordId);

    if(!isIdValid){
        throw new ApiException("Invalid recordId parameter!", 400);
    }

    let report = await Report.findById(recordId);
    
    if(!report)
    {
        throw new ApiException("No report was found for the specified Id!", 404);
    }

    return Buffer.from(report.bytes, base64encoding);
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

    const hours = await Hours
        .find(query)
        .populate("userId", "firstName lastName")
        .sort({ date: 1 });

    if (hours.length < 1 && startDate && endDate) {

        throw new ApiException(
            `No hours recorded for the project ${project.projectName} in the selected period from ${startDate} to ${endDate}!`,
            404
        );
    } else if (hours.length < 1) {
        throw new ApiException(
            `No hours recorded for the project ${project.projectName}!`,
            404
        );
    }

    const totalPrice = calculateReportTotalPrice(hours, project);
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
        },
        hours: hours.map((hour) => ({
            id: hour._id,
            employeeName: `${hour.userId.firstName} ${hour.userId.lastName}`,
            date: formatDate(hour.date),
            dateWithDay: formatDateWithDay(hour.date),
            hours: hour.hours,
            notes: hour.notes,
        })),
        totalPrice: totalPrice.toFixed(2),
        totalHours: totalHours,
        startDate,
        endDate,
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

exports.getReports = async (req) => {
    const userRole = req.userToken.userRole;
    const projectId = req.query.projectId;

    if (userRole === 'employee') {
        throw new ApiException("Not implemented for this type of user!", 405);
    }

    if (!projectId) {
        throw new ApiException("projectId parameter is required!", 400);
    }

    await isProjectIdValidAndExisting(
        projectId,
        userRole === 'customer' ? req.userToken._id : null);

    const reports = await Report
        .find({ projectId: projectId })
        .select("-bytes");

    return {
        reports
    };
}

exports.getSingleReport = async (reportId, userId, userRole) => {
    if (!validateObjectId(reportId)) {
        throw new ApiException("Invalid reportId parameter!", 400);
    }

    const report = await Report.findById(reportId, 'projectId startDate endDate');

    if (!report) {
        throw new ApiException("Such report was not found", 404);
    }

    return this.collectReportData(report, userId, userRole, report.startDate, report.endDate);
}

exports.deleteReport = async (req) => {
    const reportId = req.params.id;

    if (!validateObjectId(reportId)) {
        throw new ApiException("Such report was not found", 404);
    }
    const deletedReport = await Report.findByIdAndDelete(reportId);

    if (!deletedReport) {
        throw new ApiException("Such report was not found", 404);
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

    reportData.projectData.employeeNames = [...new Set(reportData.hours.map(x => x.employeeName))];

    const templatePath = path.join(
        __dirname,
        "../templates/projectReport/projectReportTemplate.hbs"
    );

    return await generatePdf(reportData, templatePath);
};
