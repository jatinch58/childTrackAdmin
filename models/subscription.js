const { Schema, model } = require("mongoose");
const subscriptionSchema = new Schema({
  subscriptionPrice: {
    type: Number,
    required: true,
  },
  subscriptionTenure: {
    type: String,
    required: true,
  },
  subscriptionName: {
    type: String,
    required: true,
  },
});
module.exports = model("subscription", subscriptionSchema);
