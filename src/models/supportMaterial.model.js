const { Schema, model } = require("mongoose");

const supportMaterialSchema = new Schema(
  {
    format: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SupportMaterial = model("SupportMaterial", supportMaterialSchema);
module.exports = SupportMaterial;
