const validator = require("validator");

const ProjectValidationErrors = require("../errors/projectsValidationErrors");
const validateEmail = (email) => {
    return validator.isEmail(email);
};

const validateInviteEmails = async (inviteEmails) => {
    if (inviteEmails && inviteEmails.length > 0) {
        const invalidEmails = inviteEmails.filter(
            (email) => !validateEmail(email)
        );

        if (invalidEmails.length > 0) {
            throw new ProjectValidationErrors(
                `Invalid email(s) found: ${invalidEmails.join(", ")}`,
                400
            );
        }
    }
};

module.exports = {
    validateEmail,
    validateInviteEmails,
};
