const router = require("express").Router();
const isAdmin = require('../middlewares/isAdminMiddleware')
const userService = require("../services/userService");

router.post("/login", async (req, res) => {
    const userData = req.body;

    try {
        const user = await userService.login(userData);
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: "Invalid username or password" });
    }
});

// Route to handle POST requests to create a new user
router.post("/user", async (req, res) => {
    // Extract user data from the request body
    const userData = req.body;

    try {
        // TODO: ADD ADDITIONAL VALIDATION FOR DIFFERENT TYPES OF USERS WHEN NEEDED

        // Call the createUser function from the userService to create a new user
        const user = await userService.createUser(userData);

        // If user creation is successful, send a success response with the created user
        res.status(200).json(user);
    }
    catch (error) {
        // If an error occurs during user creation, send a failure response with the error message
        res.status(400).json({ message: error.message });
    }
});

router.post('/edit/:id', isAdmin, async (req,res) => {
    const { username, firstName, lastName, password, confirmPassword, userRole  } = req.body;
    const userId = req.params.id
    try{
        // Call the editUser function from the userService to edit a new user
        await userService.editUser(userId, {username, firstName, lastName, password, confirmPassword, userRole })

        // If user editing is successful, send a success response with the edited user
        res.status(200).json(user);
    }catch(error){
        // If an error occurs during user editing, send a failure response with the error message
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;
