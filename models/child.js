const mongoose = require("mongoose");
const childSchema = new mongoose.Schema({
  childName: {
    type: String,
  },
  dob: {
    type: String,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parent",
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  parentNumber: {
    type: String,
  },
  emergencyContact1: {
    type: String,
  },
  emergencyContact2: {
    type: String,
  },
  emergencyContact3: {
    type: String,
  },
  emergencyContact4: {
    type: String,
  },
  userId: {
    type: String,
  },
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [], //[22.2475, 14.2547] [longitude, latitude]
  },
});
childSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("Child", childSchema);
