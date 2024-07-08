const moment = require("moment");
const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
};

module.exports = formatDate;
