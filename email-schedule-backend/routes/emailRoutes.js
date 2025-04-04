const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const { scheduleEmail } = require("../controllers/emailController");

router.post("/schedule-email", verifyToken, scheduleEmail);

module.exports = router;
