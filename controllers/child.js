const childdb = require("../models/child");
exports.getAllChildren = async (req, res) => {
  try {
    const allChildren = await childdb.find().populate("parentId", {
      children: 0,
      isActive: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });
    if (allChildren) {
      return res.status(200).json({ result: allChildren });
    }
    return res.status(500).json({ message: "Something went wrong" });
  } catch (e) {
    return res.status(200).json({ message: "Something went wrong" });
  }
};
