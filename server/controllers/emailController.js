const gmailService = require("../services/gmailService");
const geminiService = require("../services/geminiService");

/**
 * Controller to handle all Email and AI analysis actions
 */
class EmailController {
    /**
     * GET /emails
     * Fetches emails (mock or real) and analyzes them with Gemini
     */
    async getEmails(req, res) {
        try {
            // Extract access token if client is authenticating via OAuth2
            let accessToken = null;
            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
                accessToken = req.headers.authorization.split(" ")[1];
            } else if (req.query.token) {
                accessToken = req.query.token;
            }

            console.log(`[EmailController] Fetching emails (Mode: ${accessToken ? "Gmail API" : "Mock Data"})...`);
            
            // 1. Fetch emails from the Gmail service
            const emails = await gmailService.getEmails(accessToken);

            // 2. For each email, ensure it has Gemini analysis. 
            // If it's a mock, it has it predefined. If it's real raw email, analyze it!
            const analyzedEmails = await Promise.all(
                emails.map(async (email) => {
                    if (email.analysis) {
                        return email; // Use already populated mock analysis
                    }

                    // Otherwise, perform real-time Gemini AI scanning
                    try {
                        console.log(`[EmailController] Scanning email ID ${email.id} with Gemini...`);
                        const analysis = await geminiService.analyzeEmail(email);
                        return { ...email, analysis };
                    } catch (err) {
                        console.error(`[EmailController] Failed to analyze email ID ${email.id}:`, err);
                        // Safe fallback inside mapping
                        return {
                            ...email,
                            analysis: geminiService.generateMockAnalysis(email)
                        };
                    }
                })
            );

            return res.status(200).json({
                success: true,
                count: analyzedEmails.length,
                mode: accessToken ? "live" : "mock",
                data: analyzedEmails
            });
        } catch (error) {
            console.error("[EmailController] getEmails error:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve or analyze emails.",
                error: error.message
            });
        }
    }

    /**
     * POST /emails/analyze
     * Endpoint to analyze a custom email text submitted manually (perfect for interactive UI scanner forms!)
     */
    async analyzeCustomEmail(req, res) {
        try {
            const { from, subject, snippet } = req.body;

            if (!from || !subject || !snippet) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide 'from', 'subject', and 'snippet' fields in request body."
                });
            }

            console.log(`[EmailController] Analyzing custom email submission from: ${from}...`);
            const analysis = await geminiService.analyzeEmail({ from, subject, snippet });

            return res.status(200).json({
                success: true,
                data: {
                    from,
                    subject,
                    snippet,
                    analysis
                }
            });
        } catch (error) {
            console.error("[EmailController] analyzeCustomEmail error:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to analyze custom email.",
                error: error.message
            });
        }
    }
}

module.exports = new EmailController();
