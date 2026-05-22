const mongoose = require("mongoose");
const { baseToJSON } = require("./baseSchema");

const additionalDetailSchema = new mongoose.Schema(
  {
    firm_name: { type: String, default: null },
    promoter_name: { type: String, default: null },
    contact: { type: String, default: null },
    email: { type: String, default: null },
    company_address: { type: String, default: null },
    factory_address: { type: String, default: null },
    promoter_address: { type: String, default: null },
    constitution_type: { type: String, default: null },
    constitution_date: { type: Date, default: null },
    nature_of_business: { type: String, default: null },
  },
  { _id: true, toJSON: baseToJSON }
);

const clientSchema = new mongoose.Schema(
  {
    firm_name: { type: String, required: true, trim: true },
    promoter_name: { type: String, required: true, trim: true },
    contact: { type: String, default: null },
    email: { type: String, default: null },
    analyst_name: { type: String, default: null },
    employee_code: { type: String, default: null },
    valuer_remarks: { type: String, default: null },
    tcr_remarks: { type: String, default: null },
    additional_details: { type: [additionalDetailSchema], default: [] },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, toJSON: baseToJSON }
);

clientSchema.index({ firm_name: 1 });

module.exports = mongoose.model("Client", clientSchema);
