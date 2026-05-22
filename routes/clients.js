const express = require("express");
const ctrl = require("../controllers/clientController");
const makeSub = require("../controllers/subResourceFactory");
const {
  ClientKyc, ClientRemark, CmaData, DebtChart, TcrDetails, Valuation, ClientFinancialProfile,
} = require("../models");

const router = express.Router();

router.get("/", ctrl.list);
router.post("/", ctrl.create);
router.get("/:id", ctrl.getOne);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

router.get("/:id/full", ctrl.getFullProfile);

const subResources = [
  ["kyc", ClientKyc],
  ["remarks", ClientRemark],
  ["cma", CmaData],
  ["debts", DebtChart],
  ["tcr", TcrDetails],
  ["valuations", Valuation],
  ["financials", ClientFinancialProfile],
];

for (const [path, Model] of subResources) {
  const sub = makeSub(Model);
  router.get(`/:clientId/${path}`, sub.listForClient);
  router.post(`/:clientId/${path}`, sub.create);
  router.put(`/:clientId/${path}/:id`, sub.update);
  router.delete(`/:clientId/${path}/:id`, sub.remove);
}

module.exports = router;
