const router = require("express").Router();
const isAdmin = require("../middlewares/isAdminMiddleware");
const userService = require("../services/userService");

router.post("/login", async (req, res) => {
    const userData = req.body;

    try {
        const { user, token } = await userService.login(userData);

        res.cookie("authCookie", token, { httpOnly: true, secure: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

router.post("/user", async (req, res) => {
    const userData = req.body;

    try {
        const user = await userService.createUser(userData);

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const queryData = req.query;

        const users = await userService.getUsers(queryData);

        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch("/:id", isAdmin, async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await userService.editUser(userId, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch("/:userId/archive", isAdmin, async (req, res) => {
    const userId = req.params.userId;

    const updatedUser = await userService.updateUser(userId, {
        status: "inactive",
    });

    if (!updatedUser) {
        return res.status(404).json({ message: "User does not exist" });
    }

    const { _id, username, firstName, lastName, userRole, status } =
        updatedUser;

    res.status(200).json({
        _id,
        username,
        firstName,
        lastName,
        userRole,
        status,
    });
});

router.patch("/:userId/unarchive", isAdmin, async (req, res) => {
    userId = req.params.userId;

    const updatedUser = await userService.updateUser(userId, {
        status: "active",
    });

    if (!updatedUser) {
        return res.status(404).json({ message: "User does not exist" });
    }

    const { _id, username, firstName, lastName, userRole, status } =
        updatedUser;

    res.status(200).json({
        _id,
        username,
        firstName,
        lastName,
        userRole,
        status,
    });
});

module.exports = router;
