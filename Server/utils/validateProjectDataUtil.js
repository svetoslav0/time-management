const ProjectValidationErrors = require("../errors/projectsValidationErrors");
const User = require("../models/User");
const isValidDateMoment = require("./validateDateUtil");

const validateProjectData = async ({
    projectName,
    startingDate,
    pricePerHourForJunior,
    pricePerHourForMid,
    pricePerHourForSenior,
    pricePerHourForArchitect,
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
    }

    const priceRoles = {
        "Price for Junior": pricePerHourForJunior,
        "Price for Mid": pricePerHourForMid,
        "Price for Senior": pricePerHourForSenior,
        "Price for Architect": pricePerHourForArchitect,
    };

    for (const [role, price] of Object.entries(priceRoles)) {
        if (price === undefined || price === null) {
            throw new ProjectValidationErrors(`${role} is missing!`, 400);
        } else if (isNaN(Number(price))) {
            throw new ProjectValidationErrors(
                `${role} has a non-numeric value!`,
                400
            );
        } else if (Number(price) <= 0) {
            throw new ProjectValidationErrors(
                `${role} has a negative or zero numeric value!`,
                400
            );
        }
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
