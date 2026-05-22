const mongoose = require("mongoose");
const { baseToJSON } = require("./baseSchema");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password_hash: { type: String, required: true },
    full_name: { type: String, default: null },
    employee_code: { type: String, default: null },
    role: { type: String, default: "analyst" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, toJSON: baseToJSON }
);

module.exports = mongoose.model("User", userSchema);
