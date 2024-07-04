const HoursValidationErrors = require("../errors/hoursValidationErrors");
const Hours = require("../models/Hours");

const { validateObjectId } = require("../utils/validateObjectIdUtil");

const {
    validateHourDataOnLogHours,
} = require("../utils/validateHoursDataUtil");

exports.getSingleHour = (req) => Hours.findById(req.params.id)
exports.getAllHours = (req) => {
    const { userId, projectId } = req.query;
    const filter = {};

    if (userId) {
        if (!validateObjectId(userId)) {
            throw new HoursValidationErrors("Invalid user ID!", 400);
        }
        filter.userId = userId;
    }

    if (projectId) {
        if (!validateObjectId(projectId)) {
            throw new HoursValidationErrors("Invalid project ID!", 400);
        }
        filter.projectId = projectId;
    }

    return Hours.find(filter);
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
    } else if (hourLog.userId !== userId && !isAdmin) {
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

    return updatedHours;
};
