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

router.post("/user", async (req, res) => {
    const userData = req.body;

    try {
        // TODO: ADD ADDITIONAL VALIDATION FOR DIFFERENT TYPES OF USERS WHEN NEEDED
        const user = await userService.createUser(userData);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id', isAdmin, async (req,res) => {
    const { username, firstName, lastName, password, confirmPassword, userRole  } = req.body;
    const userId = req.params.id
    try{
        const user = await userService.editUser(userId, {username, firstName, lastName, password, confirmPassword, userRole })
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;
