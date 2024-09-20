const nodemailer = require("nodemailer");
const UserValidationErrors = require("../errors/userValidationErrors");
const generateInviteEmail = require("../templates/inviteEmailTemplate");

const sendInviteEmails = async (inviteEmails) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const emailPromises = inviteEmails.map(async (invite) => {
            const inviteLink = `http://142.93.163.217:5173/invite/${invite.uuid}`;

            const htmlContent = generateInviteEmail(inviteLink, invite.expiresOn);

            let mailOptions = {
                from: `"OpsHero Team" <${process.env.SMTP_USER}>`,
                to: invite.email,
                subject: "OpsHero - Project Monitoring Invitation",
                html: htmlContent,
            };

            await transporter.sendMail(mailOptions);
        });

        await Promise.all(emailPromises);

        console.log("All emails sent successfully!");
    } catch (error) {
        console.error("Error sending invite emails:", error);
        throw new UserValidationErrors("Error sending invite emails!");
    }
};

module.exports = sendInviteEmails;