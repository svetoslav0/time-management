const ApiException = require("../errors/ApiException");

const generalErrorHandlerMiddleware = (err, req, res, next) => {
    console.error("Error appeared in server:", {
        error: err,
        method: req.method,
        path: req.path,
        body: req.body,
    });

    if (err instanceof ApiException) {
        return res.status(err.statusCode)
            .json({message: err.message});
    }

    res.status(500)
        .json({ message: "Internal server error!" });
};

module.exports = generalErrorHandlerMiddleware;
