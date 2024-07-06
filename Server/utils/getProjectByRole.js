const Project = require("../models/Project");

const getProjectByRole = async (projectId, userId, userRole) => {
    const query = { _id: projectId };

    if (userRole === "customer") {
        query.customerIds = userId;
    } else if (userRole === "employee") {
        query.employeeIds = userId;
    }

    return Project.findOne(query).populate(
        "customerIds employeeIds",
        "firstName"
    );
};

module.exports = getProjectByRole;
