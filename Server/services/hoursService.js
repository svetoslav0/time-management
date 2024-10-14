const ApiException = require("../errors/ApiException");
const Hours = require("../models/Hours");
const Users = require("../models/User");
const { validateObjectId } = require("../utils/validateObjectIdUtil");

const {
    validateHourDataOnLogHours,
} = require("../utils/validateHoursDataUtil");
const Project = require("../models/Project");

exports.getSingleHour = async (req) => {
    if (!validateObjectId(req.params.id)) {
        throw new ApiException("Invalid hour Id!", 400);
    }

    const hour = await Hours.findById(req.params.id);
    if (!hour) {
        throw new ApiException("Hour does not exist!", 404);
    }
    return hour;
};

exports.getAllHours = async (req) => {
    const { projectId } = req.query;
    const { userRole, _id } = req.userToken;
    let filter = {};

    if (_id) {
        if (!validateObjectId(_id)) {
            throw new ApiException("Invalid user ID!", 400);
        }
    }

    if (projectId) {
        if (!validateObjectId(projectId)) {
            throw new ApiException("Invalid project ID!", 400);
        }
        filter.projectId = projectId;
    }

    if (userRole === "admin") {
        const adminFilter = projectId ? { projectId } : {};
        return Hours.find(adminFilter)
            .populate({ path: "projectId", select: "projectName" })
            .populate({ path: "userId", select: "email firstName lastName" })
            .sort({ date: 1 });
    }

    if (userRole === "employee") {
        const userProjects = await Project.find({ employeeIds: _id }).select(
            "_id"
        );
        const userProjectIds = userProjects.map((project) =>
            project._id.toString()
        );
        let projectIdsIntersection = userProjectIds;

        if (projectId) {
            projectIdsIntersection = userProjectIds.includes(projectId)
                ? [projectId]
                : [];
        }
        filter.projectId = { $in: projectIdsIntersection };
    } else if (userRole === "customer") {
        const userProjects = await Project.find({ customerIds: _id }).select(
            "_id"
        );
        const userProjectIds = userProjects.map((project) =>
            project._id.toString()
        );
        let projectIdsIntersection = userProjectIds;

        if (projectId) {
            projectIdsIntersection = userProjectIds.includes(projectId)
                ? [projectId]
                : [];
        }
        filter.projectId = { $in: projectIdsIntersection };
    }

    return await Hours.find(filter)
        .populate({ path: "projectId", select: "projectName" })
        .populate({ path: "userId", select: "email" })
        .sort({ date: 1 });
};

exports.logHours = async (req) => {
    req.body.userId = req.userToken._id;

    const hourData = req.body;

    await validateHourDataOnLogHours(hourData);

    const { projectId, userId, date, hours, notes } = hourData;

    let experience = "Architect";
    if (req.userToken.userRole === "employee") {
        const user = await Users.findById(req.userToken._id);
        experience = user.experienceLevel;
    }

    const loggedHours = await Hours.create({
        projectId,
        userId,
        date,
        hours,
        notes,
        userExperience: experience,
    });

    if (!loggedHours) {
        throw new ApiException("Hours not logged", 400);
    }
    return loggedHours;
};

exports.deleteHourLog = async (req) => {
    const hourLogId = req.params.id;
    const userId = req.userToken._id;
    const isAdmin = req.isAdmin;

    if (!validateObjectId(hourLogId)) {
        throw new ApiException("Invalid hour log Id!", 400);
    }

    const hourLog = await Hours.findById(hourLogId);

    if (!hourLog) {
        throw new ApiException("Hour log does not exist!", 400);
    } else if (hourLog.userId.toString() !== userId && !isAdmin) {
        throw new ApiException(
            "Hour log does not belong to that user!",
            400
        );
    }

    await hourLog.deleteOne();

    return hourLog;
};

exports.updateHourLog = async (req) => {
    const hourLogId = req.params.id;
    const userId = req.userToken._id;
    const isAdmin = req.isAdmin;
    const hoursData = req.body;

    hoursData.userId = userId;

    if (!validateObjectId(hourLogId)) {
        throw new ApiException("Invalid hour log Id!", 400);
    }

    await validateHourDataOnLogHours(hoursData);

    const hourLog = await Hours.findById(hourLogId);
    if (!hourLog) {
        throw new ApiException("Hour log does not exist!", 400);
    } else if (hourLog.userId.toString() !== userId && !isAdmin) {
        throw new ApiException(
            "Hour log does not belong to that user!",
            400
        );
    }

    if (isAdmin) {
        hoursData.userId = hourLog.userId;
    }

    Object.assign(hourLog, hoursData);

    const updatedHours = await hourLog.save();

    if (!updatedHours) {
        throw new ApiException("Hours not updated", 400);
    }

    return updatedHours;
};
