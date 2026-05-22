const {
  Client, ClientKyc, ClientRemark, CmaData, DebtChart, TcrDetails, Valuation,
  ClientFinancialProfile,
} = require("../models");

exports.list = async (req, res) => {
  const { search, analyst, dateFrom, dateTo } = req.query;
  const filter = {};
  if (search) filter.firm_name = { $regex: search, $options: "i" };
  if (analyst) filter.analyst_name = analyst;
  if (dateFrom || dateTo) {
    filter.created_at = {};
    if (dateFrom) filter.created_at.$gte = new Date(dateFrom);
    if (dateTo) filter.created_at.$lte = new Date(dateTo);
  }
  const clients = await Client.find(filter).sort({ created_at: -1 });
  res.json(clients);
};

exports.create = async (req, res) => {
  const {
    firm_name, promoter_name, contact, email,
    analyst_name, employee_code, additional_details,
    valuer_remarks, tcr_remarks,
  } = req.body;
  if (!firm_name || !promoter_name) {
    return res.status(400).json({ message: "firm_name and promoter_name are required" });
  }
  const client = await Client.create({
    firm_name,
    promoter_name,
    contact: contact || null,
    email: email || null,
    analyst_name: analyst_name || null,
    employee_code: employee_code || null,
    valuer_remarks: valuer_remarks || null,
    tcr_remarks: tcr_remarks || null,
    additional_details: Array.isArray(additional_details) ? additional_details : [],
    created_by: req.user.id,
  });
  res.status(201).json(client);
};

exports.getOne = async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (!client) return res.status(404).json({ message: "Client not found" });
  res.json(client);
};

exports.update = async (req, res) => {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!client) return res.status(404).json({ message: "Client not found" });
  res.json(client);
};

exports.remove = async (req, res) => {
  const client = await Client.findByIdAndDelete(req.params.id);
  if (!client) return res.status(404).json({ message: "Client not found" });
  await Promise.all([
    ClientKyc.deleteMany({ client_id: client.id }),
    ClientRemark.deleteMany({ client_id: client.id }),
    CmaData.deleteMany({ client_id: client.id }),
    DebtChart.deleteMany({ client_id: client.id }),
    TcrDetails.deleteMany({ client_id: client.id }),
    Valuation.deleteMany({ client_id: client.id }),
    ClientFinancialProfile.deleteMany({ client_id: client.id }),
  ]);
  res.json({ ok: true });
};

exports.getFullProfile = async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (!client) return res.status(404).json({ message: "Client not found" });
  const cid = client.id;
  const [kyc, debts, valuations, tcr, cma, remarks, financials] = await Promise.all([
    ClientKyc.find({ client_id: cid }),
    DebtChart.find({ client_id: cid }),
    Valuation.find({ client_id: cid }),
    TcrDetails.find({ client_id: cid }),
    CmaData.find({ client_id: cid }),
    ClientRemark.find({ client_id: cid }).sort({ created_at: -1 }),
    ClientFinancialProfile.find({ client_id: cid }),
  ]);
  res.json({ client, kyc, debts, valuations, tcr, cma, remarks, financials });
};
