const { OAuth2Client } = require("google-auth-library");

exports.verifyGoogleToken = async (googleToken) => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    return ticket;
};
