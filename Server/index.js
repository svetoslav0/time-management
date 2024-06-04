require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { initializeRoles } = require("./models/Roles");
const initializeAdmin = require("./utils/initializeAdmin");

const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(routes);

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
.then(() => {
  initializeRoles();
  initializeAdmin();
  console.log("MongoDb Connected!");
})
.catch(err => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
