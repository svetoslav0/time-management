const router = require("express").Router();
const User = require("../models/User");

const userService = require("../services/userService");
const isAdmin = require("../middlewares/isAdminMiddleware");
const UserValidationErrors = require("../errors/userValidationErrors");

router.get("/", async (req, res, next) => {
    try {
        const { items, total } = await userService.getUsers(req);

        res.status(200).json({ total, items });
    } catch (error) {
        next(error);
    }
});

router.post("/", isAdmin, async (req, res, next) => {
    try {
        const user = await userService.createUser(req);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const user = await userService.getSingleUser(req.params.id);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

router.patch("/:id", isAdmin, async (req, res, next) => {
    try {
        const user = await userService.editUser(req);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

router.patch("/:userId/archive", isAdmin, async (req, res, next) => {
    try {
        const updatedUser = await userService.updateUserStatus(req, "inactive");
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

router.patch("/:id/password_restore", isAdmin, async (req, res, next) => {
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
        throw new UserValidationErrors(
            "Both password and confirmPassword are required!",
            400
        );
    }

    if (password.length < 6) {
        throw new UserValidationErrors(
            "Password must be at least 6 characters long!",
            400
        );
    }

    if (password !== confirmPassword) {
        throw new UserValidationErrors("Passwords do not match!", 400);
    }

    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            throw new UserValidationErrors("User not found!", 404);
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
    try {
        const updatedUser = await userService.updateUserStatus(req, "active");

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
