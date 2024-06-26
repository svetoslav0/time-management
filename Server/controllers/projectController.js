const router = require("express").Router();
const projectService = require("../services/projectService");
const isAdmin = require("../middlewares/isAdminMiddleware");
const getJwtToken = require("../middlewares/getUserTokenMiddleware");
const { validateObjectId } = require("../utils/validateObjectIdUtil");
router.post("/", isAdmin, async (req, res) => {
    const projectData = req.body;

    try {
        const project = await projectService.createProject(projectData);

        res.status(201).json(project);
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
});

router.get("/", getJwtToken, async (req, res) => {
    const { status, employeeId } = req.query;

    const userId = req.userToken._id;

    if (status && !["inProgress", "completed"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    const queryData = { status };

    if (employeeId) {
        if (!validateObjectId(employeeId)) {
            return res
                .status(400)
                .json({ message: "Invalid employee ID format" });
        }
        queryData.employeeId = employeeId;
    }

    try {
        const projects = await projectService.getProjects(queryData, userId);

        res.status(200).json(projects);
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    const projectId = req.params.id;

    try {
        const project = await projectService.getSingleProject(projectId);
        res.status(200).json(project);
    } catch (error) {
        res.status(404).json({ message: "Project does not exist!" });
    }
});

router.patch("/:id", isAdmin, async (req, res) => {
    const projectId = req.params.id;

    try {
        const project = await projectService.updateProject(projectId, req.body);
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
module.exports = router;
