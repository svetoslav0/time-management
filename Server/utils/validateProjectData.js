const moment = require('moment');
const User = require("../models/User");

const validateProjectData = async (clientName, projectName, startingDate, pricePerHour, employeeIds) => {
    if(!clientName){
        throw new Error('Client Name is missing');
    }
    else if (clientName.length < 2) {
        throw new Error('Client Name is not long enough');
    }else if(!projectName){
        throw new Error('Project Name is missing');
    }else if (projectName.length < 2) {
        throw new Error('Project Name is not long enough');
    }else if(!startingDate){
        throw new Error('Starting Date is missing');
    }else if(!pricePerHour){
        throw new Error('Price per hour is missing');
    }else if(!Number(pricePerHour)){
        throw new Error('Price per hour has non-numeric value')
    }else if(Number(pricePerHour) <= 0){
        throw new Error('Price per hour has a negative numeric value');
    }
    else if(!employeeIds){
        throw new Error('employeeIds is missing')
    }
    const users = await User.find({ _id: { $in: employeeIds } });

    if (users.length !== employeeIds.length) {
        throw new Error('employeeIds contains ID for user that does not exist')
    }
    const isValidDate = isValidDateMoment(startingDate)
    if(!isValidDate){
        throw new Error('Starting Date is in incorrect format, it must be DD-MM-YYYY');
    }
}

function isValidDateMoment(dateString) {
    return moment(dateString, "DD-MM-YYYY", true).isValid();
}

module.exports = validateProjectData;
