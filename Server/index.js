require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const initializeAdmin = require("./utils/initializeAdmin");
const generalErrorHandlerMiddleware = require("./middlewares/generalErrorHandlerMiddleware");
const routes = require("./routes");

const corsOrigin = process.env.ENV === "DEV"
    ? process.env.DEV_ADDRESS.split(',')
    : "http://localhost:5173";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: corsOrigin,
        credentials: true,
    })
);

app.use(routes);
app.use(generalErrorHandlerMiddleware);

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
