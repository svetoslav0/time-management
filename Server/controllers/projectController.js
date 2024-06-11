const router = require("express").Router();
const projectService = require("../services/projectService");
const isAdmin = require("../middlewares/isAdminMiddleware");

router.post("/", isAdmin, async (req, res) => {
    const projectData = req.body;

    try {
        const project = await projectService.createProject(projectData);

        res.status(201).json(project);
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
module.exports = router;
