const router = require("express").Router();

const isAdmin = require("../middlewares/isAdminMiddleware");

const invitesService = require("../services/invitesService");

router.get("/validate/:id", async (req, res, next) => {
    try {
        const invite = await invitesService.validateInvite(req);

        res.status(200).json(invite);
    } catch (error) {
        next(error);
    }
});

router.post("/register", async (req, res, next) => {
    try {
        const customer = await invitesService.createCustomerOnInvite(req);

        res.status(200).json(customer);
    } catch (error) {
        next(error);
    }
});

router.post("/", isAdmin, async (req, res, next) => {
    try {
        await invitesService.sendInvite(req);

        res.status(200).send({ message: "Email was sent successfully!" });
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const deletedInvite = await invitesService.deleteInvite(req);
        res.send(deletedInvite);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
