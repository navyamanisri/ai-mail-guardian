require("dotenv").config();
const express = require("express");
const cors = require("cors");
const config = require("./config/constants");
const emailRoutes = require("./routes/emailRoutes");
const authRoutes = require("./routes/authRoutes");
const gmailService = require("./services/gmailService");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route (Status endpoint)
app.get("/", (req, res) => {
    res.send("AI Mail Guardian Backend Running 🚀");
});

// Google OAuth Callback endpoint
app.get("/oauth2callback", async (req, res) => {
    const { code } = req.query;
    if (!code) {
        console.error("[OAuth Callback] No authorization code found in request.");
        return res.redirect("http://localhost:5173/?error=no_code");
    }

    try {
        console.log("[OAuth Callback] Received authorization code. Exchanging for tokens...");
        const tokens = await gmailService.getTokens(code);
        const accessToken = tokens.access_token;
        
        console.log("[OAuth Callback] Tokens successfully retrieved. Redirecting to frontend dashboard...");
        // Redirect the user back to the React Vite frontend with the access token in query params
        res.redirect(`http://localhost:5173/?token=${accessToken}`);
    } catch (error) {
        console.error("[OAuth Callback] Error exchanging code for tokens:", error);
        res.redirect("http://localhost:5173/?error=auth_failed");
    }
});

// Mounted routes
app.use("/emails", emailRoutes);
app.use("/auth", authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("[Global Error Handler]:", err);
    res.status(500).json({
        success: false,
        message: "An unexpected error occurred on the server.",
        error: process.env.NODE_ENV === "development" ? err.message : {}
    });
});

// Startup Server
app.listen(config.PORT, () => {
    console.log("=========================================");
    console.log(`🚀 AI Mail Guardian Server Running!`);
    console.log(`📡 Port: ${config.PORT}`);
    console.log(`🔑 Gemini API status: ${config.GEMINI.API_KEY_EXISTS ? "ACTIVE ✅" : "MOCK MODE ⚠️"}`);
    console.log(`📧 Gmail Credentials status: ${config.GMAIL.CLIENT_ID_EXISTS ? "ACTIVE ✅" : "MOCK MODE ⚠️"}`);
    console.log("=========================================");
});