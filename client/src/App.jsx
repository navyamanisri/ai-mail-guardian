import { useState, useEffect } from 'react';
import './App.css';

// ==========================================
// Inline SVG Icon Components (Self-Contained)
// ==========================================

const ShieldIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const RefreshIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

const SearchIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
  </svg>
);

const AlertIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

const ShieldAlertIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
  </svg>
);

const SafeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
);

const MailIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const GoogleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

const LogOutIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
  </svg>
);

const SparklesIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.096L15 15l-5.187.904zM18.007 7.5L17 10l-1.007-2.5L13.5 6.5l2.493-1.007L17 3l1.007 2.493L20.5 6.5l-2.493 1.007z" />
  </svg>
);

function App() {
  // OAuth & Session token state
  const [token, setToken] = useState(() => localStorage.getItem("gmail_access_token") || null);
  
  // Dashboard emails states
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("mock"); // "live" or "mock"
  
  // UX UI Interactive States
  const [expandedEmailId, setExpandedEmailId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Custom Manual Scanner Playground Form States
  const [customFrom, setCustomFrom] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [customSnippet, setCustomSnippet] = useState("");
  const [customResult, setCustomResult] = useState(null);
  const [customScanning, setCustomScanning] = useState(false);

  // 1. Detect tokens passed from callback in the URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    const authError = params.get("error");

    if (urlToken) {
      console.log("[App] Found Google access token in URL callback. Saving to session...");
      localStorage.setItem("gmail_access_token", urlToken);
      setToken(urlToken);
      
      // Clean query parameters from URL bar to prevent token leakage
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (authError) {
      console.error("[App] Authentication error callback detected:", authError);
      setError(`Google Account connection failed: ${authError}`);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // 2. Fetch emails either from Google API (live) or local heuristics (mock)
  const fetchEmails = async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      console.log(`[App] Fetching email data. Auth Status: ${token ? "LIVE" : "MOCK"}`);
      const response = await fetch("http://localhost:5000/emails", {
        method: "GET",
        headers
      });
      
      const result = await response.json();
      if (result.success) {
        setEmails(result.data || []);
        setMode(result.mode || "mock");
      } else {
        throw new Error(result.message || "Unknown error occurred on server.");
      }
    } catch (err) {
      console.error("[App] Fetch failed:", err.message);
      setError(`Could not fetch data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch emails when token state changes
  useEffect(() => {
    fetchEmails();
  }, [token]);

  // 3. Initiate Google Sign In Flow
  const handleGoogleConnect = () => {
    // Redirect browser directly to the server's OAuth initiation route
    window.location.href = "http://localhost:5000/auth/google";
  };

  // 4. Disconnect Google Account (Logout)
  const handleDisconnect = () => {
    console.log("[App] Disconnecting Google Account...");
    localStorage.removeItem("gmail_access_token");
    setToken(null);
    setExpandedEmailId(null);
    setCustomResult(null);
  };

  // 5. Scan a custom email text manually in the scanner playground
  const handleCustomScan = async (e) => {
    e.preventDefault();
    if (!customFrom || !customSubject || !customSnippet) return;

    setCustomScanning(true);
    setCustomResult(null);
    try {
      console.log("[App] Submitting custom email analysis...");
      const response = await fetch("http://localhost:5000/emails/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: customFrom,
          subject: customSubject,
          snippet: customSnippet
        })
      });

      const result = await response.json();
      if (result.success) {
        setCustomResult(result.data);
      } else {
        throw new Error(result.message || "Failed to analyze custom email.");
      }
    } catch (err) {
      console.error("[App] Custom scan error:", err);
      alert(`Manual scan failed: ${err.message}`);
    } finally {
      setCustomScanning(false);
    }
  };

  // 6. Security & Stats Calculations
  const phishingCount = emails.filter(e => e.analysis?.isPhishing).length;
  const safeCount = emails.filter(e => e.analysis && !e.analysis.isPhishing).length;
  
  // Overall security score (0 - 100, where 100 is fully secure)
  const securityScore = emails.length > 0
    ? Math.max(0, Math.round(100 - (emails.reduce((acc, e) => acc + (e.analysis?.riskScore || 0), 0) / emails.length)))
    : 100;

  // Determine Overall Security Level Badge
  let overallSecurityLevel = "Secure";
  let overallSecurityClass = "secure";
  if (securityScore < 60) {
    overallSecurityLevel = "Critical Threat";
    overallSecurityClass = "critical";
  } else if (securityScore < 85) {
    overallSecurityLevel = "Elevated Threat";
    overallSecurityClass = "elevated";
  }

  // 7. Filter and Search Logic
  const filteredEmails = emails.filter(email => {
    // A. Apply Search Filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      (email.from || "").toLowerCase().includes(searchLower) ||
      (email.subject || "").toLowerCase().includes(searchLower) ||
      (email.snippet || "").toLowerCase().includes(searchLower);

    if (!matchesSearch) return false;

    // B. Apply Tab Category Filter
    if (activeFilter === "All") return true;
    
    const isPhishingOrSpam = email.analysis?.isPhishing;
    if (activeFilter === "Phishing & Spam") return isPhishingOrSpam;
    if (activeFilter === "Safe Inbox") return !isPhishingOrSpam;

    // Direct classification matching fallback
    const classification = (email.analysis?.classification || "").toLowerCase();
    if (activeFilter === "Work" && (classification.includes("work") || classification.includes("internal"))) return true;
    if (activeFilter === "Transactional" && classification.includes("transactional")) return true;
    if (activeFilter === "Newsletters" && (classification.includes("newsletter") || classification.includes("marketing"))) return true;
    
    return false;
  });

  // Categorization CSS helpers
  const getCategoryClass = (category) => {
    if (!category) return "personal";
    const cat = category.toLowerCase();
    if (cat.includes("phishing") || cat.includes("security")) return "phishing";
    if (cat.includes("spam") || cat.includes("scam")) return "spam";
    if (cat.includes("work") || cat.includes("internal")) return "work";
    if (cat.includes("transactional")) return "transactional";
    if (cat.includes("newsletter") || cat.includes("marketing")) return "newsletter";
    return "personal";
  };

  const getRiskScoreClass = (score) => {
    if (score >= 70) return "high";
    if (score >= 30) return "medium";
    return "low";
  };

  return (
    <div className="app-container">
      
      {/* Top Navbar */}
      <header className="navbar glass-panel">
        <div className="brand-section">
          <ShieldIcon className="brand-icon" />
          <h1 className="brand-title">AI Mail Guardian</h1>
        </div>
        
        <div className="nav-actions">
          {mode === "live" ? (
            <div className="status-badge live">
              <span className="status-dot"></span>
              Live Inbox Connected
            </div>
          ) : (
            <div className="status-badge mock">
              <span className="status-dot"></span>
              Mock Sandbox Mode
            </div>
          )}

          {token ? (
            <button className="btn btn-disconnect" onClick={handleDisconnect}>
              <LogOutIcon className="google-icon" />
              Disconnect Account
            </button>
          ) : (
            <button className="btn btn-google" onClick={handleGoogleConnect}>
              <GoogleIcon className="google-icon" />
              Connect Google Account
            </button>
          )}
        </div>
      </header>

      {/* Security Error Alert */}
      {error && (
        <div className="glass-panel" style={{ borderColor: 'rgba(239, 68, 68, 0.4)', background: 'rgba(239, 68, 68, 0.05)', padding: '16px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <AlertIcon className="brand-icon" style={{ width: '24px', height: '24px', color: '#ef4444' }} />
          <div>
            <strong style={{ color: '#ef4444' }}>Notice:</strong> <span style={{ fontSize: '14px', color: '#f3f4f6' }}>{error}</span>
          </div>
        </div>
      )}

      {/* Dashboard Statistics Overview */}
      <section className="stats-grid">
        <div className="stat-card glass-panel scanned">
          <span className="stat-label">Total Emails Scanned</span>
          <span className="stat-value">{emails.length}</span>
          <span className="stat-desc">Analyzing mail integrity</span>
        </div>
        
        <div className="stat-card glass-panel threats">
          <span className="stat-label">Phishing Threats Detected</span>
          <span className="stat-value" style={{ color: phishingCount > 0 ? '#ef4444' : 'inherit' }}>{phishingCount}</span>
          <span className="stat-desc">Flagged by Gemini AI</span>
        </div>

        <div className="stat-card glass-panel safe">
          <span className="stat-label">Safe Emails Verified</span>
          <span className="stat-value" style={{ color: '#10b981' }}>{safeCount}</span>
          <span className="stat-desc">Legitimate correspondence</span>
        </div>

        <div className="stat-card glass-panel overall">
          <span className="stat-label">Global Threat Index</span>
          <span className="stat-value">{securityScore}%</span>
          <div className={`overall-status-pill ${overallSecurityClass}`}>
            {overallSecurityLevel}
          </div>
        </div>
      </section>

      {/* Dual Column Layout: Emails Scan & Custom Scan Form */}
      <div className="main-dashboard-grid">
        
        {/* Left Side: Email Inbox Scanner */}
        <section className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          
          <div className="inbox-header">
            <div className="inbox-title-bar">
              <h2>
                <MailIcon className="inbox-icon" />
                Gmail Inbox Scanner
              </h2>
              <button 
                className={`btn btn-refresh ${loading ? 'loading' : ''}`}
                onClick={fetchEmails}
                disabled={loading}
              >
                <RefreshIcon className="refresh-icon" />
                {loading ? 'Scanning...' : 'Refresh Scan'}
              </button>
            </div>

            {/* Controls: Search and Filters */}
            <div className="inbox-controls">
              <div className="search-wrapper">
                <SearchIcon className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search by sender, subject, or content..." 
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="filter-tabs">
                {["All", "Phishing & Spam", "Safe Inbox", "Work", "Transactional", "Newsletters"].map((filter) => (
                  <button
                    key={filter}
                    className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Email Rows Section */}
          <div className="email-list">
            {loading ? (
              <div className="email-empty">
                <RefreshIcon className="refresh-icon" style={{ width: '40px', height: '40px', animation: 'spin 1s infinite linear', color: 'var(--color-primary)' }} />
                <h3>Scanning Gmail Security...</h3>
                <p>Gemini AI is parsing and evaluating risk metrics in your inbox.</p>
              </div>
            ) : filteredEmails.length === 0 ? (
              <div className="email-empty">
                <MailIcon className="empty-icon" />
                <h3>No Matching Emails Found</h3>
                <p>Try clearing your search query or connecting a live Google account to test real data.</p>
              </div>
            ) : (
              filteredEmails.map((email) => {
                const isExpanded = expandedEmailId === email.id;
                const isPhishing = email.analysis?.isPhishing;
                const classification = email.analysis?.classification || "Personal";
                const riskScore = email.analysis?.riskScore || 0;
                
                return (
                  <div key={email.id} className={`email-row ${isExpanded ? 'expanded' : ''}`}>
                    
                    {/* Collapsed Header */}
                    <div className="email-row-header" onClick={() => setExpandedEmailId(isExpanded ? null : email.id)}>
                      <div className="email-sender">
                        {email.from}
                      </div>
                      
                      <div className="email-info">
                        <span className="email-subject-line">{email.subject}</span>
                        {!isExpanded && <span className="email-snippet">{email.snippet}</span>}
                      </div>

                      <div className="email-badge-row">
                        <span className={`category-badge ${getCategoryClass(classification)}`}>
                          {classification}
                        </span>
                      </div>

                      <div className="email-risk-col">
                        <div className="risk-bar-container">
                          <div 
                            className={`risk-bar ${getRiskScoreClass(riskScore)}`} 
                            style={{ width: `${riskScore}%` }}
                          />
                        </div>
                        <span className={`risk-number-badge ${getRiskScoreClass(riskScore)}`}>
                          {riskScore}
                        </span>
                      </div>
                    </div>

                    {/* Expanded AI Insights Drawer */}
                    {isExpanded && (
                      <div className="email-expanded-content">
                        {/* 1. Raw Snippet Display */}
                        <div className="snippet-box">
                          <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>Email Content Preview</strong>
                          {email.snippet}
                        </div>

                        {/* 2. Gemini Security Breakdown */}
                        <div className={`ai-scan-card ${isPhishing ? 'alert-danger' : 'alert-safe'}`}>
                          <div className="ai-card-title">
                            {isPhishing ? (
                              <>
                                <ShieldAlertIcon className="ai-icon" />
                                Critical Threat Flagged by Gemini AI
                              </>
                            ) : (
                              <>
                                <SafeIcon className="ai-icon" />
                                Verified Safe by Gemini AI
                              </>
                            )}
                          </div>
                          
                          <p className="ai-summary">
                            <strong>AI Summary:</strong> {email.analysis?.summary || "No scan summary provided."}
                          </p>

                          <p className="ai-action-box" style={{ color: isPhishing ? '#ef4444' : '#10b981' }}>
                            <strong>Security Action Recommended:</strong> {email.analysis?.recommendedAction || "No recommendation."}
                          </p>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })
            )}
          </div>

        </section>

        {/* Right Side: Manual Scan Playground and Tools */}
        <aside className="scanner-sidebar">
          
          {/* Manual Scanner Panel */}
          <div className="scanner-card glass-panel">
            <h3>
              <SparklesIcon className="scanner-title-icon" />
              Manual Threat Scanner
            </h3>
            <p>
              Paste custom fields below to evaluate unknown text in real-time using Gemini AI scanning models.
            </p>

            <form onSubmit={handleCustomScan}>
              <div className="form-group">
                <label>From (Sender Address)</label>
                <input 
                  type="text" 
                  placeholder="e.g. boss.alert@comp-internal.com" 
                  className="form-control"
                  required
                  value={customFrom}
                  onChange={(e) => setCustomFrom(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input 
                  type="text" 
                  placeholder="e.g. Review invoice details immediately!" 
                  className="form-control"
                  required
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Email Snippet / Body</label>
                <textarea 
                  placeholder="e.g. Hi employee, please click this link to verify your invoice details before we cancel your access tomorrow morning." 
                  className="form-control"
                  required
                  value={customSnippet}
                  onChange={(e) => setCustomSnippet(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-scan" 
                disabled={customScanning}
              >
                {customScanning ? 'Running Threat Audit...' : 'Audit Custom Email'}
              </button>
            </form>

            {/* Custom Scan Gemini Result Displays */}
            {customResult && (
              <div className="custom-result-panel">
                <div className="custom-result-header">
                  <span className="custom-result-title">AI Analysis Result</span>
                  <span className={`category-badge ${getCategoryClass(customResult.analysis?.classification)}`}>
                    {customResult.analysis?.classification}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>AI Threat Level:</span>
                  <span className={`risk-number-badge ${getRiskScoreClass(customResult.analysis?.riskScore)}`}>
                    {customResult.analysis?.riskScore}%
                  </span>
                </div>

                <div className={`ai-scan-card ${customResult.analysis?.isPhishing ? 'alert-danger' : 'alert-safe'}`} style={{ padding: '12px' }}>
                  <p className="ai-summary" style={{ fontSize: '12px' }}>
                    <strong>Verdict:</strong> {customResult.analysis?.summary}
                  </p>
                  <p className="ai-action-box" style={{ fontSize: '12px', padding: '6px 10px', color: customResult.analysis?.isPhishing ? '#ef4444' : '#10b981' }}>
                    <strong>Action:</strong> {customResult.analysis?.recommendedAction}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Informational Notice */}
          <div className="glass-panel" style={{ padding: '20px 24px', fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
            <h4 style={{ margin: '0 0 6px', color: 'var(--color-text-main)', fontSize: '13px', fontWeight: '600' }}>Threat Classification Info</h4>
            <p style={{ margin: 0 }}>
              AI Mail Guardian utilizes natural language scanning heuristics powered by Gemini AI API and rules-based logic to cross-examine headers, urgent semantics, and links for optimal security.
            </p>
          </div>

        </aside>

      </div>
    </div>
  );
}

export default App;
