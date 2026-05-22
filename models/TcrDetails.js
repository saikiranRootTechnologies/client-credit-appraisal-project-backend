const mongoose = require("mongoose");
const { baseToJSON } = require("./baseSchema");

const tcrDetailsSchema = new mongoose.Schema(
  {
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true, index: true },
    name: { type: String, default: null },
    date: { type: Date, default: null },
    property_details: { type: String, default: null },
    cersai_details: { type: String, default: null },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false }, toJSON: baseToJSON }
);

module.exports = mongoose.model("TcrDetails", tcrDetailsSchema);
