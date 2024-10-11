const router = require("express").Router();

const hoursService = require("../services/hoursService");
const isEmployeeOrAdmin = require("../middlewares/isEmployeeOrAdmin");
const getJwtToken = require("../middlewares/getUserTokenMiddleware");

router.post("/", isEmployeeOrAdmin, getJwtToken, async (req, res, next) => {
    try {
        const hours = await hoursService.logHours(req);

        res.status(200).json(hours);
    } catch (error) {
        next(error);
    }
});

router.get("/", getJwtToken, async (req, res, next) => {
    try {
        const hours = await hoursService.getAllHours(req);
        
        res.status(200).json(hours);
    } catch (error) {
        next(error);
    }
});

router.delete(
    "/:id",
    isEmployeeOrAdmin,
    getJwtToken,
    async (req, res, next) => {
        try {
            const deletedHours = await hoursService.deleteHourLog(req);

            res.status(200).json(deletedHours);
        } catch (error) {
            next(error);
        }
    }
);

router.get("/:id", async (req, res, next) => {
    try {
        const hour = await hoursService.getSingleHour(req);

        res.status(200).json(hour);
    } catch (error) {
        next(error);
    }
});

router.patch("/:id", isEmployeeOrAdmin, getJwtToken, async (req, res, next) => {
    try {
        const updatedHours = await hoursService.updateHourLog(req);

        res.status(200).json(updatedHours);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
