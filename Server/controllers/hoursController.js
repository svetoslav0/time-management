const router = require("express").Router();

const hoursService = require("../services/hoursService");
const isEmployeeOrAdmin = require("../middlewares/isEmployeeOrAdmin");
const getJwtToken = require("../middlewares/getUserTokenMiddleware");

const HoursValidationErrors = require("../errors/hoursValidationErrors");

router.post("/", isEmployeeOrAdmin, getJwtToken, async (req, res, next) => {
    try {
        const hours = await hoursService.logHours(req);

        if (!hours) {
            throw new HoursValidationErrors("Hours not logged", 400);
        }

        res.status(200).json(hours);
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const hours = await hoursService.getAllHours(req);

        if (!hours) {
            throw new HoursValidationErrors("Hours not found", 404);
        }

        res.status(200).json(hours);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", isEmployeeOrAdmin, getJwtToken, async (req, res, next) => {
    try {
        const deletedHours = await hoursService.deleteHourLog(req);

        res.status(200).json(deletedHours);
    } catch (error) {
        next(error);
    }
}
);

router.get("/:id", async (req, res) => {
    try {
        const hour = await hoursService.getSingleHour(req);

        res.status(200).json(hour);
    } catch (error) {
        res.status(404).json({ message: "Hour does not exist!" });
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
