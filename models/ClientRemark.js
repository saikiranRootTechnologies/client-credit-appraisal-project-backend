const mongoose = require("mongoose");
const { baseToJSON } = require("./baseSchema");

const clientRemarkSchema = new mongoose.Schema(
  {
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true, index: true },
    remark: { type: String, required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false }, toJSON: baseToJSON }
);

module.exports = mongoose.model("ClientRemark", clientRemarkSchema);
