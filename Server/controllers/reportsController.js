const router = require("express").Router();

const reportService = require("../services/reportsService");
const isAdmin = require("../middlewares/isAdminMiddleware");
const getJwtToken = require("../middlewares/getUserTokenMiddleware");

const pdfContentType = "application/pdf";

router.post("/", isAdmin, getJwtToken, async (req, res, next) => {
    try {
        const report = await reportService.createReport(req);

        res.status(200).json(report);
    } catch (error) {
        next(error);
    }
});

router.get('/', getJwtToken, async (req, res, next) => {
    try {
        const reports = await reportService.getReports(req);

        return res.status(200).json(reports);
    } catch (error) {
        next(error);
    }
});

router.get("/:id/metadata", getJwtToken, async (req, res, next) => {
    try {
        const report = await reportService.getSingleReport(
            req.params.id,
            req.userToken.userId,
            req.userToken.userRole,
        );

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

router.get("/:id/pdf", getJwtToken, async (req, res, next) => {
    try {
        const pdfBuffer = await reportService.getReportBuffer(
            req.params.id,
            req.userToken.userId,
            req.userToken.userRole,
        );

        res.status(200)
            .contentType(pdfContentType)
            .send(pdfBuffer);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
