const mongoose = require("mongoose");
const { baseToJSON } = require("./baseSchema");

const debtChartSchema = new mongoose.Schema(
  {
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true, index: true },
    loan_type: { type: String, default: null },
    bank_name: { type: String, default: null },
    sanction_amount: { type: Number, default: null },
    emi: { type: Number, default: null },
    outstanding_amount: { type: Number, default: null },
    outstanding_date: { type: Date, default: null },
    enhancement: { type: String, default: null },
    renewal_date: { type: Date, default: null },
    sanction_date: { type: Date, default: null },
    collateral_offered: { type: String, default: null },
    market_value: { type: Number, default: null },
    realizable_value: { type: Number, default: null },
    valuer_name: { type: String, default: null },
    valuation_date: { type: Date, default: null },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false }, toJSON: baseToJSON }
);

module.exports = mongoose.model("DebtChart", debtChartSchema);
