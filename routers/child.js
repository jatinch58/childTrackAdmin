const express = require("express");
const router = express.Router();
const child = require("../controllers/child");
const { verifyToken } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isAdmin");
router.get("/allChildren", verifyToken, isAdmin, child.getAllChildren);
module.exports = router;
