const router = require("express").Router();

const reportService = require("../services/reportsService");
const isAdmin = require("../middlewares/isAdminMiddleware");
const getJwtToken = require("../middlewares/getUserTokenMiddleware");

router.post("/", isAdmin, getJwtToken, async (req, res, next) => {
    try {
        const report = await reportService.createReport(req);

        res.status(200).json(report);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", isAdmin, async (req, res, next) => {
    try {
        await reportService.deleteReport(req);

        res.status(200).send({ message: "Report was deleted successfully!" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
