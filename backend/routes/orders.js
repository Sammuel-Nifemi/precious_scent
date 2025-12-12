const express = require("express");
const router = express.Router();
const auth = require("./auth");

router.get("/", auth.staffOrAdmin, (req, res) => {
    res.json({ message: "Orders list" });
});

router.post("/update-status", auth.staffOrAdmin, (req, res) => {
    res.json({ message: "Order status updated" });
});

module.exports = router;
