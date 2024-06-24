require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const initializeAdmin = require("./utils/initializeAdmin");
const userValidationErrors = require("./errors/userValidationErrors");

const routes = require("./routes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(routes);
app.use((err, req, res, next) => {
    console.error("Error appeared in server:", err);

    if (err instanceof userValidationErrors) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    res.status(500).json({ message: "Internal server error!" });
});

const mongoURI = process.env.MONGODB_URI;

mongoose
    .connect(mongoURI)
    .then(() => {
        initializeAdmin();
        console.log("MongoDb Connected!");
    })
    .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
