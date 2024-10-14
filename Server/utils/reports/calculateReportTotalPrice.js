const getTotalHoursFor = (hours, userExperience) => {
    return hours.filter(x => x.userExperience === userExperience)
        .map(x => x.hours)
        .reduce((total, hour) => total + hour, 0);
};

const calculateReportTotalPrice = (hours, project) => {
    return getTotalHoursFor(hours, "Junior") * project.pricePerHourForJunior +
        getTotalHoursFor(hours, "Mid-Level") * project.pricePerHourForMid +
        getTotalHoursFor(hours, "Senior") * project.pricePerHourForSenior +
        getTotalHoursFor(hours, "Architect") * project.pricePerHourForArchitect;
};

module.exports = calculateReportTotalPrice;
