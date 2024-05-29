require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const { initializeRoles } = require("./models/Roles");
const initializeAdmin = require("./utils/initializeAdmin");

const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(routes);

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI).then(() => {
    initializeRoles();
    initializeAdmin();
    console.log("MongoDb Connected!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
