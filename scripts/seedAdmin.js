require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const { User } = require("../models");

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";

(async () => {
  try {
    await connectDB();

    const existing = await User.findOne({ email: ADMIN_EMAIL });
    const password_hash = await bcrypt.hash(ADMIN_PASSWORD, 10);

    if (existing) {
      existing.password_hash = password_hash;
      existing.role = "admin";
      existing.full_name = existing.full_name || "Store Admin";
      await existing.save();
      console.log(`Updated admin user: ${ADMIN_EMAIL}`);
    } else {
      await User.create({
        email: ADMIN_EMAIL,
        password_hash,
        full_name: "Store Admin",
        role: "admin",
      });
      console.log(`Created admin user: ${ADMIN_EMAIL}`);
    }
  } catch (err) {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
})();
