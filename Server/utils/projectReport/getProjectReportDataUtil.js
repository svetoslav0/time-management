const getProjectReportData = (reportData) => {
    const totalHours = reportData.hours.reduce((total, { hours = 0 }) => total + hours, 0);
    const totalPrice = reportData.projectData.pricePerHours * totalHours;

    return data = {
        ...reportData,
        totalHours,
        totalPrice: totalPrice.toFixed(2)
    };
};

module.exports = getProjectReportData;