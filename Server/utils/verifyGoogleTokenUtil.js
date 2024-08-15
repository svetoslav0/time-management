const { OAuth2Client } = require("google-auth-library");
const InvitesValidationErrors = require("../errors/invitesValidationErrors");

exports.verifyGoogleToken = async (googleToken) => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    try {
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            throw new InvitesValidationErrors("Invalid google token!", 401);
        }

        return payload;
    } catch (error) {
        throw new InvitesValidationErrors("Invalid google token!", 401);
    }
};
