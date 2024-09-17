const router = require("express").Router();

const getJwtToken = require("../middlewares/getUserTokenMiddleware");

const userService = require("../services/userService");

router.get("/", (req, res) => {
    res.json({
        message: "It works!",
        env: `ENV: ${process.env.ENV}`,
        dev_address: `DEV_ADDRESS: ${process.env.DEV_ADDRESS}`,
    });
});

router.post("/login", async (req, res, next) => {
    try {
        const { user, token } = await userService.login(req);

        res.cookie("authCookie", token, {
            httpOnly: true,
            // secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

router.post("/login/google/:token", async (req, res, next) => {
    try {
        const { user, token } = await userService.googleLogin(req);
        res.cookie("authCookie", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json(user);
    } catch (error) {
        next(error);
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

router.post("/credentials/validation", getJwtToken, async (req, res, next) => {
    try {
        await userService.validateCredentials(req);

        res.status(200).json({ message: "Valid credentials" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
