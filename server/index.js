require("dotenv").config();
const express = require("express");
const cors = require("cors");
const config = require("./config/constants");
const emailRoutes = require("./routes/emailRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route (Status endpoint)
app.get("/", (req, res) => {
    res.send("AI Mail Guardian Backend Running 🚀");
});

// Mounted routes
app.use("/emails", emailRoutes);

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