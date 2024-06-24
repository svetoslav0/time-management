const router = require("express").Router();
const User = require("../models/User");

const userService = require("../services/userService");
const isAdmin = require("../middlewares/isAdminMiddleware");
const userValidationErrors = require("../errors/userValidationErrors");

router.get("/", async (req, res, next) => {
    try {
        const queryData = {
            status: req.query.status,
            userRole: req.query.userRole,
        };

        queryData.limit = parseInt(req.query.limit) || 100;
        queryData.offset = parseInt(req.query.offset) || 0;

        if (queryData.limit > 100 || queryData.limit <= 0) {
            throw new userValidationErrors(
                "Limit value must be greater than 0 and not greater than 100!",
                400
            );
        }

        if (queryData.offset < 0) {
            throw new userValidationErrors(
                "Offset value must not be below 0!",
                400
            );
        }

        const { items, total } = await userService.getUsers(queryData);

        res.status(200).json({ total, items });
    } catch (error) {
        next(error);
    }
});

router.post("/", isAdmin, async (req, res, next) => {
    const userData = req.body;

    try {
        const user = await userService.createUser(userData);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await userService.getSingleUser(userId);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

router.patch("/:id", isAdmin, async (req, res, next) => {
    const userId = req.params.id;
    const userData = req.body;

    try {
        const user = await userService.editUser(userId, userData);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

router.patch("/:userId/archive", isAdmin, async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const updatedUser = await userService.updateUserStatus(
            userId,
            "inactive"
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

router.patch("/:id/password_restore", isAdmin, async (req, res, next) => {
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
        throw new userValidationErrors(
            "Both password and confirmPassword are required!",
            400
        );
    }

    if (password.length < 6) {
        throw new userValidationErrors(
            "Password must be at least 6 characters long!",
            400
        );
    }

    if (password !== confirmPassword) {
        throw new userValidationErrors("Passwords do not match!", 400);
    }

    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            throw new userValidationErrors("User not found!", 404);
        }
        // user.password = await bcrypt.hash(password, 12);
        user.password = password;
        await user.save();
        res.status(200).send({ message: "Password restored successfully!" });
    } catch (error) {
        next(error);
    }
});

router.patch("/:userId/unarchive", isAdmin, async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const updatedUser = await userService.updateUserStatus(
            userId,
            "active"
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
