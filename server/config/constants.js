/**
 * Global application constants and configuration loaders
 */
module.exports = {
    PORT: process.env.PORT || 5000,
    GEMINI: {
        MODEL_NAME: "gemini-2.5-flash",
        API_KEY_EXISTS: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here")
    },
    GMAIL: {
        CLIENT_ID_EXISTS: !!process.env.GOOGLE_CLIENT_ID,
        CLIENT_SECRET_EXISTS: !!process.env.GOOGLE_CLIENT_SECRET,
        REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI || "http://localhost:5000/oauth2callback"
    }
};
