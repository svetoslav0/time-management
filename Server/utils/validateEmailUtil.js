const validator = require("validator");

const validateEmail = async (email) => {
    return validator.isEmail(email);
}

module.exports = validateEmail;