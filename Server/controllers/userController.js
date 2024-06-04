const router = require("express").Router();
const isAdmin = require('../middlewares/isAdminMiddleware')
const userService = require("../services/userService");

router.post("/login", async (req, res) => {
    const userData = req.body;

    try {
        const { user, token } = await userService.login(userData);

        res.cookie("authCookie", token, { httpOnly: true, secure: true });
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

    }catch (error) {
        // If an error occurs during user creation, send a failure response with the error message
        res.status(400).json({ message: error.message });
    }
});


router.patch('/:id', isAdmin, async (req,res) => {
    const userId = req.params.id

    try{
        const user = await userService.editUser(userId, req.body);
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
})

router.patch("/:userId/archive", isAdmin, async (req, res) => {
    const userId = req.params.userId;

    try {
        const updatedUser = await userService
            .updateUser(userId, {
                status: "inactive",
            })
            .populate("userRole");

        if (!updatedUser) {
            throw new Error("User does not exist");
        }

        const { _id, username, firstName, lastName, status } = updatedUser;
        const userRole = updatedUser.userRole.name;

        res.status(200).json({
            _id,
            username,
            firstName,
            lastName,
            userRole,
            status,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const queryData = req.query;

        const users = await userService.getUsers(queryData);

        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
