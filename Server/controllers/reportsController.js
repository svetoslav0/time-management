const router = require("express").Router();

const reportService = require("../services/reportsService");
const isAdmin = require("../middlewares/isAdminMiddleware");
const getJwtToken = require("../middlewares/getUserTokenMiddleware");

router.post("/", isAdmin, getJwtToken, async (req, res, next) => {
    try {
        const report = await reportService.createReport(
            req.body.name,
            req.body.projectId,
            req.body.startDate,
            req.body.endDate,
            req.userToken.userId,
            req.userToken.userRole
        );
        res.status(200)
            .json(report);
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;