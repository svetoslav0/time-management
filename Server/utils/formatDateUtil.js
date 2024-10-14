const moment = require("moment");
const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
};

const formatDateWithDay = (date) => {
    return moment(date).format("ddd, DD-MM-YYYY");
};

module.exports = {
    formatDate,
    formatDateWithDay,
};
