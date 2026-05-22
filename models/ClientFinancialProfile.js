const mongoose = require("mongoose");
const { baseToJSON } = require("./baseSchema");

const financialRowSchema = new mongoose.Schema(
  {
    particular: { type: String, required: true },
    fy_2024_25: { type: String, default: null },
    fy_2023_24: { type: String, default: null },
    fy_2022_23: { type: String, default: null },
    fy_2021_22: { type: String, default: null },
    fy_2020_21: { type: String, default: null },
  },
  { _id: true, toJSON: baseToJSON }
);

const clientFinancialProfileSchema = new mongoose.Schema(
  {
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true, index: true },
    rows: { type: [financialRowSchema], default: [] },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, toJSON: baseToJSON }
);

module.exports = mongoose.model("ClientFinancialProfile", clientFinancialProfileSchema);
