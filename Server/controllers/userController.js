const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const userService = require("../services/userService");
const isAdmin = require("../middlewares/isAdminMiddleware");

router.get("/", async (req, res) => {
    try {
        const queryData = {
            status: req.query.status,
            userRole: req.query.userRole,
        };

        queryData.limit = parseInt(req.query.limit) || 100;
        queryData.offset = parseInt(req.query.offset) || 0;

        if (queryData.limit > 100 || queryData.limit <= 0) {
            throw new Error(
                "Limit value must be greater than 0 and not greater than 100"
            );
        }

        if (queryData.offset < 0) {
            throw new Error("Offset value must not be below 0");
        }

        const { items, total } = await userService.getUsers(queryData);

        res.status(200).json({ total, items });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post("/", isAdmin, async (req, res) => {
    const userData = req.body;

    try {
        const user = await userService.createUser(userData);

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await userService.getSingleUser(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: "User does not exist" });
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

    try {
        const updatedUser = await userService.updateUserStatus(
            userId,
            "inactive"
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
});

router.patch("/:id/password_restore", isAdmin, async (req, res) => {
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
        throw new Error("Both password and confirmPassword are required");
    }

    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }

    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }

    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        user.password = await bcrypt.hash(password, 12);
        await user.save();

        res.status(200).send({ message: "Password restored successfully" });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

router.patch("/:userId/unarchive", isAdmin, async (req, res) => {
    const userId = req.params.userId;

    try {
        const updatedUser = await userService.updateUserStatus(
            userId,
            "active"
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
});

module.exports = router;
