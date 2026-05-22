require("dotenv").config();
const app = require("../app");
const connectDB = require("../config/db");

module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    console.error("DB connection failed:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ message: "Database connection failed" }));
  }
  return app(req, res);
};
