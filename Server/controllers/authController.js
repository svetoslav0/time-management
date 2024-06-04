const router = require("express").Router();

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

module.exports = router;
