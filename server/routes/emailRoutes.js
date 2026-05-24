const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

// Route to fetch emails (either returns detailed mock emails or logs into Google Gmail API if tokens are provided)
router.get("/", emailController.getEmails);

// Route to scan/analyze custom user-inputted emails (useful for a playground or test form on the frontend!)
router.post("/analyze", emailController.analyzeCustomEmail);

module.exports = router;
