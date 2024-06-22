const Hours = require("../models/Hours");

const {
    validateHourDataOnLogHours,
} = require("../utils/validateHoursDataUtil");

exports.getAllHours = () => Hours.find();

exports.logHours = async (hoursData) => {
    await validateHourDataOnLogHours(hoursData);

    const { projectId, userId, date, hours, notes } = hoursData;

    try {
        const loggedHours = await Hours.create({
            projectId,
            userId,
            date,
            hours,
            notes,
        });

        return loggedHours;
    } catch (error) {
        console.error("Error creating new Hours entity:", error);
        throw new Error("Trouble logging hours!");
    }
};
