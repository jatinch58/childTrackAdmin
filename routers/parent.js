const express = require("express");
const router = express.Router();
const parent = require("../controllers/parent");
const { verifyToken } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isAdmin");
router.get("/allParents", verifyToken, isAdmin, parent.getAllParents);
module.exports = router;
