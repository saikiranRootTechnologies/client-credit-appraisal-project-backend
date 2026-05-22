const mongoose = require("mongoose");
const { baseToJSON } = require("./baseSchema");

const valuationSchema = new mongoose.Schema(
  {
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true, index: true },
    name: { type: String, default: null },
    valuation_date: { type: Date, default: null },
    property_details: { type: String, default: null },
    area: { type: String, default: null },
    valuer: { type: String, default: null },
    market_value: { type: Number, default: null },
    realizable_value: { type: Number, default: null },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false }, toJSON: baseToJSON }
);

module.exports = mongoose.model("Valuation", valuationSchema);
