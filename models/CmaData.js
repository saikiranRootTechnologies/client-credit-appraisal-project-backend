const mongoose = require("mongoose");
const { baseToJSON } = require("./baseSchema");

const cmaDataSchema = new mongoose.Schema(
  {
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true, index: true },
    year: { type: String, default: null },
    revenue: { type: Number, default: null },
    expenses: { type: Number, default: null },
    profit: { type: Number, default: null },
    total_assets: { type: Number, default: null },
    total_liabilities: { type: Number, default: null },
    net_worth: { type: Number, default: null },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false }, toJSON: baseToJSON }
);

module.exports = mongoose.model("CmaData", cmaDataSchema);
