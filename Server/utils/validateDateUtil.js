const moment = require("moment");

const isValidDateMoment = async (dateString) => {
    return moment(dateString, "YYYY-MM-DD", true).isValid();
};

module.exports = isValidDateMoment;