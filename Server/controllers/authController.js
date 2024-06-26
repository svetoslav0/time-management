const router = require("express").Router();

const userService = require("../services/userService");

router.post("/login", async (req, res) => {
    const userData = req.body;

    try {
        const { user, token } = await userService.login(userData);

        res.cookie("authCookie", token, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: "Invalid email or password!" });
    }
});

router.post("/logout", (req, res, next) => {
    try {
        res.clearCookie("authCookie");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
