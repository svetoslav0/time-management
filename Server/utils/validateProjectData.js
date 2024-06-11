const moment = require('moment');
const User = require("../models/User");

const validateProjectData = async (customerIds, projectName, startingDate, pricePerHour, employeeIds) => {
    let customers;
    let employees;
    
    if (!Array.isArray(customerIds) || customerIds.length === 0) {
        throw new Error('At least one customer ID is required');
    }
    else if (!Array.isArray(employeeIds) || employeeIds.length === 0) {
        throw new Error('At least one employee ID is required')
    }

    try {
        const users = await User.find({
            $or: [
                { _id: { $in: customerIds }, userRole: "customer" },
                { _id: { $in: employeeIds }, userRole: "employee" }
            ]
        });

        customers = users.filter(user => user.userRole === "customer");
        employees = users.filter(user => user.userRole === "employee");
    } catch (error) {
        console.error("Error searching for user existence:", error);
        throw new Error("Trouble creating a new project!");
    }
  
    if (customers.length !== customerIds.length) {
        throw new Error('All customer IDs should belong to users with the corresponding role');
    }
    else if (employees.length !== employeeIds.length) {
        throw new Error('All employee IDs should belong to users with the corresponding role')
    }
    else if (!projectName) {
        throw new Error('Project Name is missing');
    } else if (projectName.length < 2) {
        throw new Error('Project Name is not long enough');
    } else if (!startingDate) {
        throw new Error('Starting Date is missing');
    } else if (!pricePerHour) {
        throw new Error('Price per hour is missing');
    } else if (!Number(pricePerHour)) {
        throw new Error('Price per hour has non-numeric value')
    } else if (Number(pricePerHour) <= 0) {
        throw new Error('Price per hour has a negative numeric value');
    }

    const isValidDate = isValidDateMoment(startingDate)
    if (!isValidDate) {
        throw new Error('Starting Date is in incorrect format, it must be DD-MM-YYYY');
    }
}

function isValidDateMoment(dateString) {
    return moment(dateString, "DD-MM-YYYY", true).isValid();
}

module.exports = validateProjectData;
