const Admin = require("../models/admin");
exports.isAdmin = async (req, res, next) => {
  const findAdmin = await Admin.findById(req.user._id);
  if (findAdmin) {
    next();
  } else {
    return res.status(403).send({ message: "You are not admin" });
  }
};
