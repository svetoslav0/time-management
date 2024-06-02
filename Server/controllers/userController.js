const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const userService = require("../services/userService");
const isAdmin = require("../middlewares/isAdminMiddleware");

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
    } catch (error) {
        // If an error occurs during user creation, send a failure response with the error message
        res.status(400).json({ message: error.message });
    }
});

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

router.patch("/:id/password_restore", isAdmin, async (req, res) => {
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
        throw new Error('Both password and confirmPassword are required');
    }

    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long' );
    }

    if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
    }

    try{
        const userId = req.params.id;
        const user = await User.findById(userId);

        if(!user){
            throw new Error('User not found');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;

        await user.save()
        
        res.status(200).send({ message: 'Password restored successfully' });
    }catch(error){
        res.status(500).send({ error: 'Internal Server Error' });
    }
})
module.exports = router;
