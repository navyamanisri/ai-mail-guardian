const { google } = require("googleapis");

// Mock emails data for immediate, beginner-friendly frontend testing
const mockEmails = [
    {
        id: "msg_001",
        threadId: "thread_001",
        from: "netflix@info.netflix.com",
        subject: "Your membership renewal confirmation",
        snippet: "Hi there, this is a confirmation that your Netflix subscription has successfully renewed for another month. Thank you for being a member!",
        date: new Date(Date.now() - 30 * 60000).toISOString(), // 30 mins ago
        labelIds: ["INBOX", "CATEGORY_UPDATES"],
        analysis: {
            isPhishing: false,
            classification: "Transactional",
            riskScore: 5,
            summary: "Confirmation of monthly Netflix subscription renewal.",
            recommendedAction: "None required."
        }
    },
    {
        id: "msg_002",
        threadId: "thread_002",
        from: "support-security-alert@amazon-security-update.com",
        subject: "IMMEDIATE ACTION REQUIRED: Unusual login detected on your Amazon account",
        snippet: "Alert! We detected an unusual sign-in attempt from a device in Russia. If this was not you, please verify your identity immediately by clicking here.",
        date: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
        labelIds: ["INBOX", "UNREAD"],
        analysis: {
            isPhishing: true,
            classification: "Phishing / Security Alert",
            riskScore: 95,
            summary: "Urgent warning of unauthorized login requesting immediate verification via external link.",
            recommendedAction: "Delete immediately. Do not click any links inside the email."
        }
    },
    {
        id: "msg_003",
        threadId: "thread_003",
        from: "boss.jones@company.com",
        subject: "Q3 Project Review Slides and Agenda",
        snippet: "Hi Team, please find attached the slide deck and agenda for our Q3 project review scheduled for tomorrow at 10 AM. Let me know if you have questions.",
        date: new Date(Date.now() - 5 * 3600000).toISOString(), // 5 hours ago
        labelIds: ["INBOX", "CATEGORY_PERSONAL", "UNREAD"],
        analysis: {
            isPhishing: false,
            classification: "Work / Internal",
            riskScore: 0,
            summary: "Sharing agenda and slide deck for tomorrow's Q3 review meeting.",
            recommendedAction: "Review slides before 10 AM tomorrow."
        }
    },
    {
        id: "msg_004",
        threadId: "thread_004",
        from: "sweepstakes@win-big-now-free-prizes.net",
        subject: "CONGRATULATIONS!!! You have won a $1,000 Walmart Gift Card!!!",
        snippet: "Dear Customer, you have been selected as our Grand Prize Winner of a brand new $1000 Walmart Gift Card! Click now to claim your code before it expires!",
        date: new Date(Date.now() - 24 * 3600000).toISOString(), // 1 day ago
        labelIds: ["INBOX", "CATEGORY_PROMOTIONS"],
        analysis: {
            isPhishing: true,
            classification: "Spam / Scam",
            riskScore: 88,
            summary: "Unsolicited sweepstakes win claim aiming to gather user information through clickbait links.",
            recommendedAction: "Mark as Spam. Avoid clicking the link or entering details."
        }
    }
];

/**
 * Placeholder Service for Gmail API operations
 */
class GmailService {
    constructor() {
        // Initialize Google OAuth2 client from env credentials (if provided)
        const clientId = process.env.GOOGLE_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
        const redirectUri = process.env.GOOGLE_REDIRECT_URI;

        if (clientId && clientSecret) {
            this.oauth2Client = new google.auth.OAuth2(
                clientId,
                clientSecret,
                redirectUri
            );
        } else {
            console.log("⚠️ Google API Credentials not fully configured in .env. Running in mock mode.");
        }
    }

    /**
     * Get authorization URL to redirect user for Google sign-in
     */
    getAuthUrl() {
        if (!this.oauth2Client) {
            throw new Error("OAuth2 client is not configured.");
        }
        
        const scopes = [
            "https://www.googleapis.com/auth/gmail.readonly",
            "https://www.googleapis.com/auth/gmail.modify"
        ];

        return this.oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: scopes,
            prompt: "consent"
        });
    }

    /**
     * Retrieve access and refresh tokens using the authorization code from callback
     */
    async getTokens(code) {
        if (!this.oauth2Client) {
            throw new Error("OAuth2 client is not configured.");
        }
        const { tokens } = await this.oauth2Client.getToken(code);
        return tokens;
    }

    /**
     * Fetch emails. Returns mock emails or fetches from active Gmail API if authorized.
     */
    async getEmails(accessToken = null) {
        // If no credentials/token are supplied, return standard mock emails for a frictionless start
        if (!this.oauth2Client || !accessToken) {
            return mockEmails;
        }

        try {
            // Configure temporary client with provided token
            const auth = new google.auth.OAuth2();
            auth.setCredentials({ access_token: accessToken });

            const gmail = google.gmail({ version: "v1", auth });
            
            // Fetch list of messages (limit to 10 for performance)
            const response = await gmail.users.messages.list({
                userId: "me",
                maxResults: 10,
                q: "is:inbox"
            });

            if (!response.data.messages || response.data.messages.length === 0) {
                return [];
            }

            // Fetch detailed details for each email in parallel
            const emailPromises = response.data.messages.map(async (msg) => {
                const detail = await gmail.users.messages.get({
                    userId: "me",
                    id: msg.id
                });
                
                // Parse basic headers (Subject, From, Date)
                const headers = detail.data.payload.headers;
                const subjectHeader = headers.find(h => h.name.toLowerCase() === "subject");
                const fromHeader = headers.find(h => h.name.toLowerCase() === "from");
                const dateHeader = headers.find(h => h.name.toLowerCase() === "date");

                return {
                    id: detail.data.id,
                    threadId: detail.data.threadId,
                    from: fromHeader ? fromHeader.value : "Unknown Sender",
                    subject: subjectHeader ? subjectHeader.value : "No Subject",
                    snippet: detail.data.snippet || "",
                    date: dateHeader ? new Date(dateHeader.value).toISOString() : new Date().toISOString(),
                    labelIds: detail.data.labelIds || []
                };
            });

            return await Promise.all(emailPromises);
        } catch (error) {
            console.error("Error fetching emails from Gmail API:", error);
            // Graceful fallback to mock data on error so the server never crashes
            return mockEmails;
        }
    }
}

module.exports = new GmailService();
