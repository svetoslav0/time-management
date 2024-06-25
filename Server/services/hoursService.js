const HoursValidationErrors = require("../errors/hoursValidationErrors");
const Hours = require("../models/Hours");

const {
    validateHourDataOnLogHours,
} = require("../utils/validateHoursDataUtil");

exports.getAllHours = () => Hours.find();

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
