const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
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
      type: String,
      enum: ["admin", "employee", "customer"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    description: {
      type: String,
    },
    experienceLevel: {
      type: String,
      enum: ["Junior", "Mid-Level", "Senior", "Architect"],
    },
    companyName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    isGoogleLogin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
