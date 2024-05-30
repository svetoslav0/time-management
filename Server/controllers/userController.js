const router = require("express").Router();

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
        const user = await userService.createUser(userData);

        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
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
