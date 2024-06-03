const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        userRole: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
