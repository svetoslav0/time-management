const router = require("express").Router();
const projectService = require("../services/projectService");
const reportService = require("../services/reportsService");
const isAdmin = require("../middlewares/isAdminMiddleware");
const getJwtToken = require("../middlewares/getUserTokenMiddleware");
const ApiException = require("../errors/ApiException");
const path = require("path");

router.get("/logo", async (req, res, next) => {
    res.sendFile(path.join(__dirname, "../assets/timeManagementLogo.png"));
});

router.post("/", isAdmin, async (req, res, next) => {
    try {
        const project = await projectService.createProject(req);

        if (!project) {
            throw new ApiException("Project not created", 400);
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
            throw new ApiException("No projects found", 404);
        }

        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", getJwtToken, async (req, res, next) => {
    try {
        const project = await projectService.getSingleProject(req);

        if (!project) {
            throw new ApiException("Project not found", 404);
        }
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
});

router.patch("/:id", getJwtToken, isAdmin, async (req, res, next) => {
    try {
        const project = await projectService.updateProject(req);

        if (!project) {
            throw new ApiException("Project not found", 404);
        }
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
});

router.get("/:id/report", getJwtToken, async (req, res, next) => {
    try {
        const data = {
            projectId: req.params.id,
            userId: req.userToken._id,
            userRole: req.userToken.userRole,
        };

        const report = await reportService.collectReportData(data);
        res.status(200).json(report);
    } catch (error) {
        next(error);
    }
});


module.exports = router;
