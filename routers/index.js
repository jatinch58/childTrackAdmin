const express = require("express");
const router = express.Router();
const loginRoutes = require("./login");
const parentRoutes = require("./parent");
const childRoutes = require("./child");
router.use("/admin", loginRoutes);
router.use("/parent", parentRoutes);
router.use("/child", childRoutes);
module.exports = router;
