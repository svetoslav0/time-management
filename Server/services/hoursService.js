const HoursValidationErrors = require("../errors/hoursValidationErrors");
const Hours = require("../models/Hours");
const { validateObjectId } = require("../utils/validateObjectIdUtil");

const {
    validateHourDataOnLogHours,
} = require("../utils/validateHoursDataUtil");
const Project = require("../models/Project");

exports.getSingleHour = async (req) => {
    if (!validateObjectId(req.params.id)) {
        throw new HoursValidationErrors("Invalid hour Id!", 400);
    }

    const hour = await Hours.findById(req.params.id);
    if (!hour) {
        throw new HoursValidationErrors("Hour does not exist!", 404);
    }
    return hour;
};

exports.getAllHours = async (req) => {
    const { projectId } = req.query;
    const { userRole, _id } = req.userToken;
    let filter = {};

    if (_id) {
        if (!validateObjectId(_id)) {
            throw new HoursValidationErrors("Invalid user ID!", 400);
        }
        filter.userId = _id;
    }

    if (projectId) {
        if (!validateObjectId(projectId)) {
            throw new HoursValidationErrors("Invalid project ID!", 400);
        }
        filter.projectId = projectId;
    }

    if (userRole === "admin") {
        const adminFilter = projectId ? { projectId } : {};
        return Hours.find(adminFilter)
            .populate({ path: "projectId", select: "projectName" })
            .populate({ path: "userId", select: "email" });
    }

    let userProjects = [];
    if (userRole === "employee") {
        userProjects = await Project.find({ employeeIds: _id }).select("_id");
    } else if (userRole === "customer") {
        userProjects = await Project.find({ customerIds: _id }).select("_id");
    }

    const userProjectIds = userProjects.map((project) =>
        project._id.toString()
    );

    if (projectId) {
        if (!userProjectIds.includes(projectId)) {
            throw new HoursValidationErrors(
                "Project not found or not associated with this user.",
                404
            );
        }
        filter = { projectId, userId: _id };
    } else {
        filter = { userId: _id };
    }

    return await Hours.find(filter)
        .populate({ path: "projectId", select: "projectName" })
        .populate({ path: "userId", select: "email" });
};

exports.logHours = async (req) => {
    req.body.userId = req.userToken._id;

    const hourData = req.body;

    await validateHourDataOnLogHours(hourData);

    const { projectId, userId, date, hours, notes } = hourData;

    const loggedHours = await Hours.create({
        projectId,
        userId,
        date,
        hours,
        notes,
    });

    if (!loggedHours) {
        throw new HoursValidationErrors("Hours not logged", 400);
    }
    return loggedHours;
};

exports.deleteHourLog = async (req) => {
    const hourLogId = req.params.id;
    const userId = req.userToken._id;
    const isAdmin = req.isAdmin;

    if (!validateObjectId(hourLogId)) {
        throw new HoursValidationErrors("Invalid hour log Id!", 400);
    }

    const hourLog = await Hours.findById(hourLogId);

    if (!hourLog) {
        throw new HoursValidationErrors("Hour log does not exist!", 400);
    } else if (hourLog.userId.toString() !== userId && !isAdmin) {
        throw new HoursValidationErrors(
            "Hour log does not belong to that user!",
            400
        );
    }

    await hourLog.deleteOne();

    return hourLog;
};

exports.updateHourLog = async (req) => {
    const hourLogId = req.params.id;
    const userId = req.userToken._id;
    const isAdmin = req.isAdmin;
    const hoursData = req.body;

    hoursData.userId = userId;

    if (!validateObjectId(hourLogId)) {
        throw new HoursValidationErrors("Invalid hour log Id!", 400);
    }

    await validateHourDataOnLogHours(hoursData);

    const hourLog = await Hours.findById(hourLogId);
    if (!hourLog) {
        throw new HoursValidationErrors("Hour log does not exist!", 400);
    } else if (hourLog.userId.toString() !== userId && !isAdmin) {
        throw new HoursValidationErrors(
            "Hour log does not belong to that user!",
            400
        );
    }

    if (isAdmin) {
        hoursData.userId = hourLog.userId;
    }

    Object.assign(hourLog, hoursData);

    const updatedHours = await hourLog.save();

    if (!updatedHours) {
        throw new HoursValidationErrors("Hours not updated", 400);
    }

    return updatedHours;
};
