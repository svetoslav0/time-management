require("dotenv").config();
const https = require("https");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");


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

if (process.env.ENV === "DEV") {
    const options = {
        key: fs.readFileSync(path.resolve(__dirname, 'ssl/private.key')),
        cert: fs.readFileSync(path.resolve(__dirname, 'ssl/cert.crt')),
    }

    const server = https.createServer(options, app);

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} (HTTPS)`);
    });
} else {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
