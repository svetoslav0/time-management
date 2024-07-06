const router = require("express").Router();
const projectService = require("../services/projectService");
const isAdmin = require("../middlewares/isAdminMiddleware");
const getJwtToken = require("../middlewares/getUserTokenMiddleware");
const ProjectValidationErrors = require("../errors/projectsValidationErrors");

router.post("/", isAdmin, async (req, res, next) => {
    try {
        const project = await projectService.createProject(req);

        if (!project) {
            throw new ProjectValidationErrors("Project not created", 400);
        }

        res.status(201).json(project);
    } catch (error) {
        next(error);
    }
});

router.get("/", getJwtToken, async (req, res, next) => {
    try {
        const projects = await projectService.getProjects(req);

        if (!projects) {
            throw new ProjectValidationErrors("No projects found", 404);
        }

        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const project = await projectService.getSingleProject(req);

        if (!project) {
            throw new ProjectValidationErrors("Project not found", 404);
        }
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
});

router.patch("/:id", isAdmin, async (req, res, next) => {
    try {
        const project = await projectService.updateProject(req);

        if (!project) {
            throw new ProjectValidationErrors("Project not found", 404);
        }
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
});

router.get("/:id/report", async (req, res, next) => {
    try {
        const report = await projectService.getReport(req);
        res.status(200).json(report);
    } catch (error) {
        next(error);
    }
});
module.exports = router;
