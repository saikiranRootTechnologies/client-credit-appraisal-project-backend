const express = require("express");
const { DebtChart } = require("../models");

const router = express.Router();

router.get("/", async (_req, res) => {
  const debts = await DebtChart.find({});
  res.json(debts);
});

module.exports = router;
