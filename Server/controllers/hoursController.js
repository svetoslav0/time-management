const router = require("express").Router();

const hoursService = require("../services/hoursService");
const isEmployeeOrAdmin = require("../middlewares/isEmployeeOrAdmin");
const getJwtToken = require("../middlewares/getUserTokenMiddleware");
const { validateObjectId } = require("../utils/validateObjectIdUtil");

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
        const { userId, projectId } = req.query;
        const filter = {};

        if (userId) {
            if (!validateObjectId(userId)) {
                throw new HoursValidationErrors("Invalid user ID!", 400);
            }
            filter.userId = userId;
        }

        if (projectId) {
            if (!validateObjectId(projectId)) {
                throw new HoursValidationErrors("Invalid project ID!", 400);
            }
            filter.projectId = projectId;
        }

        const hours = await hoursService.getAllHours(filter);

        if (!hours) {
            throw new HoursValidationErrors("Hours not found", 404);
        }

        res.status(200).json(hours);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", isEmployeeOrAdmin, getJwtToken, async (req, res) => {
    try {
        const deletedHours = await hoursService.deleteHourLog(req);

        res.status(200).json(deletedHours);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch("/:id", isEmployeeOrAdmin, getJwtToken, async (req, res) => {
    try {
        const updatedHours = await hoursService.updateHourLog(req);

        res.status(200).json(updatedHours);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
