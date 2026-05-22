const mongoose = require("mongoose");
const { baseToJSON } = require("./baseSchema");

const clientKycSchema = new mongoose.Schema(
  {
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true, index: true },
    aadhar_number: { type: String, default: null },
    pan_number: { type: String, default: null },
    udyam: { type: String, default: null },
    gst: { type: String, default: null },
    iec: { type: String, default: null },
    line_of_activity: { type: String, default: null },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false }, toJSON: baseToJSON }
);

module.exports = mongoose.model("ClientKyc", clientKycSchema);
