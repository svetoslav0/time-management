const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
    {
        name: "Admin",
        name: "Emloyee",
        name: "Customer"
    },
)


const Role = mongoose.model("Role", roleSchema);

module.exports = Role;