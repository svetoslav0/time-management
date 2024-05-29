const router = require('express').Router()
const projectService = require('../services/projectService')

// Route to handle POST requests to create a new project
router.post("/", async (req, res) => {
    
    // Extract project data from the request body
    const projectData = req.body;

    try {
        // Call the createProject function from the projectService to create a new project
        const project = await projectService.createProject(projectData);

        // If project creation is successful, send a success response with the created project
        res.status(201).json(project);
    }
    catch (error) {
        // If an error occurs during project creation, send a failure response with the error message
        res.status(403).json({ message: error.message });
    }
});

module.exports = router;