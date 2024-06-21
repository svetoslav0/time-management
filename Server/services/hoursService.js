const Hours = require("../models/Hours");

const { validateObjectId } = require("../utils/validateObjectIdUtil");

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

exports.deleteHourLog = async (hourLogId, userId, isAdmin) => {
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

    const deletedHours = Hours.findByIdAndDelete(hourLogId);

    return deletedHours;
}; 
