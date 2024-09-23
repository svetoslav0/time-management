class HoursValidationErrors extends Error {
    constructor(message, statusCode = 500) {
        super(message);

        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = HoursValidationErrors;
