const router = require("express").Router();

const hoursService = require("../services/hoursService");
const isEmployeeOrAdmin = require("../middlewares/isEmployeeOrAdmin");
const getJwtToken = require("../middlewares/getUserTokenMiddleware");

const HoursValidationErrors = require("../errors/hoursValidationErrors");

router.post("/", isEmployeeOrAdmin, getJwtToken, async (req, res, next) => {
    const userId = req.userToken._id;

    req.body.userId = userId;
    const hoursData = req.body;

    try {
        const hours = await hoursService.logHours(hoursData);
        if (!hours) {
            throw new HoursValidationErrors("Hours not logged", 400);
        }
        res.status(200).json(hours);
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const hours = await hoursService.getAllHours();

        if (!hours) {
            throw new HoursValidationErrors("Hours not found", 404);
        }

        res.status(200).json(hours);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
