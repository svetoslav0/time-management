const HoursValidationErrors = require("../errors/hoursValidationErrors");
const Hours = require("../models/Hours");

const { validateObjectId } = require("../utils/validateObjectIdUtil");

const {
    validateHourDataOnLogHours,
} = require("../utils/validateHoursDataUtil");

exports.getAllHours = (filter = {}) => {
    return Hours.find(filter);
};

exports.logHours = async (hoursData) => {
    await validateHourDataOnLogHours(hoursData);

    const { projectId, userId, date, hours, notes } = hoursData;

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
        throw new Error("Invalid hour log Id!");
    }

    const hourLog = await Hours.findById(hourLogId);

    if (!hourLog) {
        throw new Error("Hour log does not exist!");
    }
    else if (hourLog.userId !== userId && !isAdmin) {
        throw new Error("Hour log does not belong to that user!");
    }

    await hourLog.deleteOne();

    return hourLog;
};

exports.updateHourLog = async (req) => {
    const hourLogId = req.params.id;
    const userId = req.userToken._id;
    const isAdmin = req.isAdmin;
    const hoursData = req.body;

    if (!validateObjectId(hourLogId)) {
        throw new Error("Invalid hour log Id!");
    }

    await validateHourDataOnLogHours(hoursData);

    const hourLog = await Hours.findById(hourLogId);

    if (!hourLog) {
        throw new Error("Hour log does not exist!");
    }
    else if (hourLog.userId !== userId && !isAdmin) {
        throw new Error("Hour log does not belong to that user!");
    }

    Object.assign(hourLog, hoursData);

    const updatedHours = await hourLog.save();

    return updatedHours;
}; 
