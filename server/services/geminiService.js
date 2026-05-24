const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Placeholder & Real Service for Gemini API operations
 */
class GeminiService {
    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        this.enabled = !!(apiKey && apiKey !== "your_gemini_api_key_here");
        
        if (this.enabled) {
            try {
                this.ai = new GoogleGenerativeAI(apiKey);
            } catch (err) {
                this.enabled = false;
                console.log("⚠️ Could not initialize Gemini API. Running in smart mock mode.", err);
            }
        } else {
            console.log("⚠️ Gemini API Key not set. Running in smart mock mode.");
        }
    }

    /**
     * Scan an email using Gemini to detect phishing threats, summarize, and classify
     * @param {Object} email { from, subject, snippet }
     */
    async analyzeEmail(email) {
        if (!this.enabled) {
            return this.generateMockAnalysis(email);
        }

        try {
            // We use the recommended gemini-2.5-flash model for fast, high-quality analysis
            const model = this.ai.getGenerativeModel({ model: "gemini-2.5-flash" });

            const prompt = `
                You are AI Mail Guardian, an advanced email security and classification system.
                Analyze the following email and return a JSON object with your security assessment.
                
                Email Details:
                - From: ${email.from}
                - Subject: ${email.subject}
                - Snippet: ${email.snippet}

                Return your output EXACTLY as a JSON object with this structure:
                {
                    "isPhishing": boolean (true if email is a phishing attempt, suspicious, or malicious scam),
                    "classification": string (e.g. "Work", "Personal", "Phishing / Security Alert", "Transactional", "Newsletter", "Spam / Scam"),
                    "riskScore": number (0 to 100, representing threat level),
                    "summary": string (brief 1-sentence summary of the email content),
                    "recommendedAction": string (what the user should do, e.g. "Safe to open", "Do not click links", "Reply when free")
                }
                Do not include markdown code block formatting (like \`\`\`json) in your final output, just clean raw JSON string.
            `;

            const result = await model.generateContent(prompt);
            const responseText = result.response.text().trim();
            
            // Safe JSON parse with cleanup in case the LLM returned markdown code blocks
            const cleanJsonText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
            return JSON.parse(cleanJsonText);
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            // Graceful fallback to smart mock generator so the app never crashes
            return this.generateMockAnalysis(email);
        }
    }

    /**
     * Smart heuristic-based mock analysis for offline / beginner-friendly testing
     */
    generateMockAnalysis(email) {
        const fromLower = (email.from || "").toLowerCase();
        const subjectLower = (email.subject || "").toLowerCase();
        const snippetLower = (email.snippet || "").toLowerCase();

        // 1. Phishing heuristics
        const hasUrgency = subjectLower.includes("urgent") || subjectLower.includes("immediate action") || subjectLower.includes("verify") || subjectLower.includes("suspend");
        const hasSuspiciousSender = fromLower.includes("-security-") || fromLower.includes("verify") || fromLower.includes("giftcard") || fromLower.includes("win-big") || fromLower.includes("free-prizes");
        const hasFinancialScam = snippetLower.includes("gift card") || snippetLower.includes("won") || snippetLower.includes("winner") || snippetLower.includes("claim your code");

        let isPhishing = false;
        let classification = "Personal";
        let riskScore = 10;
        let summary = `Email from ${email.from} concerning: ${email.subject}`;
        let recommendedAction = "Safe to read.";

        if (hasSuspiciousSender || (hasUrgency && hasFinancialScam)) {
            isPhishing = true;
            classification = "Phishing / Security Alert";
            riskScore = 90;
            summary = `Suspicious message from unknown sender requesting urgent action.`;
            recommendedAction = "Do not click any links or attachments. Mark as Phishing.";
        } else if (hasFinancialScam) {
            isPhishing = true;
            classification = "Spam / Scam";
            riskScore = 75;
            summary = `Likely spam promising free financial rewards or sweepstakes.`;
            recommendedAction = "Do not reply or click. Move to Spam folder.";
        } else if (fromLower.includes("netflix") || fromLower.includes("spotify") || fromLower.includes("receipt") || fromLower.includes("invoice")) {
            classification = "Transactional";
            riskScore = 5;
            summary = `Subscription, billing, or transaction receipt.`;
            recommendedAction = "Keep for your records.";
        } else if (fromLower.includes("newsletter") || fromLower.includes("marketing") || snippetLower.includes("unsubscribe")) {
            classification = "Newsletter / Marketing";
            riskScore = 12;
            summary = `Marketing updates or regular newsletter subscription.`;
            recommendedAction = "Safe to read. Unsubscribe if no longer interested.";
        } else if (fromLower.includes("company.com") || fromLower.includes("work") || subjectLower.includes("project") || subjectLower.includes("meeting")) {
            classification = "Work / Internal";
            riskScore = 0;
            summary = `Work-related correspondence regarding ${email.subject}.`;
            recommendedAction = "Read and follow up as necessary.";
        }

        return {
            isPhishing,
            classification,
            riskScore,
            summary,
            recommendedAction
        };
    }
}

module.exports = new GeminiService();
