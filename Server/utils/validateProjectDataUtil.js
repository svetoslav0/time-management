const ProjectValidationErrors = require("../errors/projectsValidationErrors");
const User = require("../models/User");
const isValidDateMoment = require("./validateDateUtil");

const validateProjectData = async ({
    projectName,
    startingDate,
    pricePerHour,
    employeeIds,
}) => {
    let employees;

    if (!Array.isArray(employeeIds) || employeeIds.length === 0) {
        throw new ProjectValidationErrors(
            "At least one employee ID is required!",
            400
        );
    }

    try {
        const users = await User.find({
            _id: { $in: employeeIds },
            userRole: "employee",
        });

        employees = users.filter((user) => user.userRole === "employee");
    } catch (error) {
        throw new ProjectValidationErrors(
            "Error occurred while fetching users from database!",
            500
        );
    }

    if (employees.length !== employeeIds.length) {
        throw new ProjectValidationErrors(
            "All employee IDs should belong to users with the corresponding role!",
            400
        );
    } else if (!projectName) {
        throw new ProjectValidationErrors("Project Name is missing!", 400);
    } else if (projectName.length < 2) {
        throw new ProjectValidationErrors(
            "Project Name is not long enough!",
            400
        );
    } else if (!startingDate) {
        throw new ProjectValidationErrors("Starting Date is missing!", 400);
    } else if (!pricePerHour) {
        throw new ProjectValidationErrors("Price per hour is missing!", 400);
    } else if (!Number(pricePerHour)) {
        throw new ProjectValidationErrors(
            "Price per hour has non-numeric value!",
            400
        );
    } else if (Number(pricePerHour) <= 0) {
        throw new ProjectValidationErrors(
            "Price per hour has a negative numeric value!",
            400
        );
    }
    const isValidDate = await isValidDateMoment(startingDate);
    if (!isValidDate) {
        throw new ProjectValidationErrors(
            "Starting Date is in incorrect format, it must be YYYY-MM-DD!",
            400
        );
    }
};

const validateProjectStatus = async (status) => {
    if (!["inProgress", "completed"].includes(status)) {
        throw new ProjectValidationErrors(
            "Invalid status. Valid options are: inProgress, completed",
            400
        );
    }
};

module.exports = {
    validateProjectData,
    validateProjectStatus,
};
