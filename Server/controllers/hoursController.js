const router = require("express").Router();

const hoursService = require("../services/hoursService");
const isEmployeeOrAdmin = require("../middlewares/isEmployeeOrAdmin");
const getJwtToken = require("../middlewares/getUserTokenMiddleware");

router.post("/", isEmployeeOrAdmin, getJwtToken, async (req, res) => {
    const userId = req.userToken._id;

    req.body.userId = userId;
    const hoursData = req.body;

    try {
        await hoursService.logHours(hoursData);

        res.status(200).json({ message: "Hours logged successfully!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const hours = await hoursService.getAllHours();
        res.status(200).json(hours);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
