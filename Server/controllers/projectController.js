const router = require("express").Router();
const projectService = require("../services/projectService");
const isAdmin = require("../middlewares/isAdminMiddleware");
const { validateObjectId } = require("../utils/validateObjectIdUtil");
const ProjectValidationErrors = require("../errors/projectValidationErrors");

router.post("/", isAdmin, async (req, res, next) => {
    const projectData = req.body;

    try {
        const project = await projectService.createProject(projectData);

        res.status(201).json(project);
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req, res, next) => {
    const { status, employeeId } = req.query;

    if (status && !["inProgress", "completed"].includes(status)) {
        throw new ProjectValidationErrors(
            "Invalid status. Valid options are: inProgress, completed",
            400
        );
    }

    const queryData = { status };

    if (employeeId) {
        if (!validateObjectId(employeeId)) {
            throw new ProjectValidationErrors(
                "Invalid employee ID format",
                400
            );
        }
        queryData.employeeId = employeeId;
    }

    try {
        const projects = await projectService.getProjects(queryData);

        if (!projects) {
            throw new ProjectValidationErrors("No projects found", 404);
        }

        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    const projectId = req.params.id;

    try {
        const project = await projectService.getSingleProject(projectId);

        if (!project) {
            throw new ProjectValidationErrors("Project not found", 404);
        }
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
});

router.patch("/:id", isAdmin, async (req, res, next) => {
    const projectId = req.params.id;

    try {
        const project = await projectService.updateProject(projectId, req.body);

        if (!project) {
            throw new ProjectValidationErrors("Project not found", 404);
        }
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
});
module.exports = router;
