const express = require("express");
const router = express.Router();
const gmailService = require("../services/gmailService");

/**
 * GET /auth/google
 * Initiates the Google OAuth 2.0 flow by redirecting the user to the consent screen.
 */
router.get("/google", (req, res) => {
    try {
        console.log("[AuthRoutes] Generating Google OAuth URL...");
        const url = gmailService.getAuthUrl();
        res.redirect(url);
    } catch (error) {
        console.error("[AuthRoutes] Error generating Google OAuth URL:", error.message);
        res.status(500).json({
            success: false,
            message: "Google OAuth credentials are not fully configured in your .env file.",
            error: error.message
        });
    }
});

module.exports = router;
