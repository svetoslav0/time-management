const router = require("express").Router();

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

module.exports = router;