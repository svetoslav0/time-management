const Project = require("../models/Project");

const populateProjectsForUser = async (user) => {
    const id = user._id;
    const role = user.userRole;

    if (role === "customer") {
        return Project
            .find({ customerIds: id })
            .select("_id projectName");
    } else {
        return Project
            .find({ employeeIds: id })
            .select("_id projectName");
    }
};

module.exports = populateProjectsForUser;
