const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // middleware 불러오기
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;