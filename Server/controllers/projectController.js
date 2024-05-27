const router = require('express').Router()

router.post("/project", async (req, res) => {

    const projectData = req.body;

    try {
        const project = await projectrService.createProject(projectData);
        res.status(201).json(project);
    }
    catch (error) {
        res.status(403).json({ message: error.message });
    }
});

module.exports = router;