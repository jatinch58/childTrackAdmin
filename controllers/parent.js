const parentdb = require("../models/parent");
exports.getAllParents = async (req, res) => {
  try {
    const allParents = await parentdb.find().populate("children");
    if (allParents) {
      return res.status(200).json({ result: allParents });
    }
    return res.status(500).json({ message: "Something went wrong" });
  } catch (e) {
    return res.status(200).json({ message: "Something went wrong" });
  }
};
