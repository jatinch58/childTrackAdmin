const mongoose = require("mongoose");
const parentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    children: [
      {
        type: String,
        ref: "Child",
      },
    ],
    terms: {
      type: Boolean,
    },
    isActive: { type: Number, default: 1 },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Parent", parentSchema);
