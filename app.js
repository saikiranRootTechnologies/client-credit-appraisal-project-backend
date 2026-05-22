const express = require("express");
const cors = require("cors");

const { requireAuth } = require("./middleware/auth");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth");
const clientRoutes = require("./routes/clients");
const debtRoutes = require("./routes/debts");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : true,
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/clients", requireAuth, clientRoutes);
app.use("/api/debts", requireAuth, debtRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
