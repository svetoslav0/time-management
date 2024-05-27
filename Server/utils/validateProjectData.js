const moment = require('moment');

const validateProjectData = async (clientName, projectName, startingDate, pricePerHour, employeedIds) => {
    if (clientName.length < 2) {
        throw new Error('Username is not long enough');
    }else if (projectName.length < 2) {
        throw new Error('Project name is not long enough');
    }else if(Number(pricePerHour) <= 0){
        throw new Error('The pay for one working hour is too low');
    }
    const isValidDate = isValidDateMoment(startingDate)
    if(!isValidDate){
        throw new Error('Invalid date!');
    }
}

function isValidDateMoment(dateString) {
    return moment(dateString, "DD-MM-YYYY", true).isValid();
}

