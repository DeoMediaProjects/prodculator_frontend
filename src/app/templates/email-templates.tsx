/**
 * Professional Email Templates for Prodculator
 * 
 * These are HTML email templates that should be rendered server-side
 * and sent via email service (SendGrid, AWS SES, etc.)
 * 
 * Features:
 * - Professional black and gold branding
 * - Mobile-responsive design
 * - Clear call-to-actions
 * - Trust indicators and disclaimers
 */

// Base email wrapper with consistent styling
const emailBaseStyles = `
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #f5f5f5;
  }
  .email-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
  }
  .header {
    background-color: #000000;
    padding: 32px 24px;
    text-align: center;
    border-bottom: 3px solid #D4AF37;
  }
  .logo {
    height: 40px;
    width: auto;
  }
  .content {
    padding: 40px 24px;
    background-color: #ffffff;
  }
  .hero-title {
    font-size: 28px;
    font-weight: 700;
    color: #000000;
    margin: 0 0 16px 0;
    line-height: 1.3;
  }
  .hero-subtitle {
    font-size: 16px;
    color: #666666;
    margin: 0 0 32px 0;
    line-height: 1.5;
  }
  .cta-button {
    display: inline-block;
    background-color: #D4AF37;
    color: #000000;
    padding: 16px 32px;
    text-decoration: none;
    font-weight: 700;
    font-size: 16px;
    border-radius: 4px;
    margin: 24px 0;
  }
  .section-title {
    font-size: 18px;
    font-weight: 700;
    color: #000000;
    margin: 32px 0 16px 0;
  }
  .body-text {
    font-size: 15px;
    color: #333333;
    line-height: 1.6;
    margin: 0 0 16px 0;
  }
  .highlight-box {
    background-color: #FFFEF7;
    border-left: 4px solid #D4AF37;
    padding: 20px;
    margin: 24px 0;
  }
  .feature-list {
    list-style: none;
    padding: 0;
    margin: 24px 0;
  }
  .feature-item {
    padding: 12px 0;
    border-bottom: 1px solid #eeeeee;
    font-size: 15px;
    color: #333333;
  }
  .feature-icon {
    color: #D4AF37;
    margin-right: 8px;
    font-weight: bold;
  }
  .disclaimer {
    background-color: #f9f9f9;
    padding: 20px;
    margin: 32px 0;
    border-radius: 4px;
    font-size: 13px;
    color: #666666;
    line-height: 1.5;
  }
  .footer {
    background-color: #1a1a1a;
    padding: 32px 24px;
    color: #999999;
    font-size: 13px;
    line-height: 1.6;
  }
  .footer-links {
    margin: 16px 0;
  }
  .footer-link {
    color: #D4AF37;
    text-decoration: none;
    margin: 0 12px;
  }
  .social-icons {
    margin: 20px 0;
  }
  .social-icon {
    display: inline-block;
    margin: 0 8px;
    width: 32px;
    height: 32px;
  }
  .data-badge {
    background-color: #f0f0f0;
    padding: 4px 8px;
    border-radius: 3px;
    font-size: 11px;
    color: #666666;
    margin-left: 8px;
  }
`;

/**
 * EMAIL 1: REPORT READY NOTIFICATION
 * Sent when the Scripteligence report is completed
 */
export const reportReadyEmail = (data: {
  userName: string;
  scriptTitle: string;
  reportUrl: string;
  pdfUrl?: string;
  processingTime: string;
  topRecommendation: string;
  estimatedIncentive: string;
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Scripteligence Report is Ready</title>
  <style>${emailBaseStyles}</style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      <img src="https://prodculator.com/logo-white.png" alt="Prodculator" class="logo" />
    </div>

    <!-- Content -->
    <div class="content">
      <h1 class="hero-title">Your Scripteligence Report is Ready 🎬</h1>
      <p class="hero-subtitle">
        Hi ${data.userName}, we've completed the comprehensive analysis of <strong>"${data.scriptTitle}"</strong>
      </p>

      <!-- Highlight Box with Key Finding -->
      <div class="highlight-box">
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #D4AF37; font-weight: 700; letter-spacing: 0.5px;">
          TOP RECOMMENDATION
        </p>
        <p style="margin: 0; font-size: 18px; font-weight: 700; color: #000000;">
          ${data.topRecommendation}
        </p>
        <p style="margin: 8px 0 0 0; font-size: 15px; color: #666666;">
          Estimated Incentive: <strong>${data.estimatedIncentive}</strong>
        </p>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 32px 0;">
        <a href="${data.reportUrl}" class="cta-button">View Full Report</a>
        ${data.pdfUrl ? `<br/><a href="${data.pdfUrl}" style="color: #D4AF37; text-decoration: none; font-size: 14px; margin-top: 12px; display: inline-block;">↓ Download PDF</a>` : ''}
      </div>

      <!-- What's Included -->
      <h2 class="section-title">Your Report Includes:</h2>
      <ul class="feature-list">
        <li class="feature-item"><span class="feature-icon">✓</span> Production Location Strategy (5 recommended territories)</li>
        <li class="feature-item"><span class="feature-icon">✓</span> Tax Incentive Analysis (UK, Canada, US, Malta, South Africa)</li>
        <li class="feature-item"><span class="feature-icon">✓</span> Crew Cost Estimates by Territory</li>
        <li class="feature-item"><span class="feature-icon">✓</span> Comparable Productions Analysis</li>
        <li class="feature-item"><span class="feature-icon">✓</span> Regional Film Fund Opportunities</li>
        <li class="feature-item"><span class="feature-icon">✓</span> Production Economics Summary</li>
        <li class="feature-item"><span class="feature-icon">✓</span> Script Breakdown Insights</li>
        <li class="feature-item"><span class="feature-icon">✓</span> Next Steps & Actionable Recommendations</li>
      </ul>

      <p class="body-text">
        Processing completed in <strong>${data.processingTime}</strong> using our curated production datasets and AI analysis engine.
      </p>

      <!-- Disclaimer -->
      <div class="disclaimer">
        <strong>Important:</strong> This report uses indicative data from third-party APIs and internally curated datasets. 
        All incentive calculations, crew costs, and recommendations are estimates for preliminary planning purposes only. 
        <span class="data-badge">Data verified: January 2026</span>
        <br/><br/>
        Always consult with qualified tax advisors, legal counsel, and local film commissions before making final production decisions.
      </div>

      <p class="body-text">
        Questions about your report? Our team is here to help at 
        <a href="mailto:support@prodculator.com" style="color: #D4AF37;">support@prodculator.com</a>
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div style="text-align: center; margin-bottom: 20px;">
        <strong style="color: #D4AF37;">PRODCULATOR</strong>
      </div>
      
      <div class="footer-links" style="text-align: center;">
        <a href="https://prodculator.com/dashboard" class="footer-link">Dashboard</a>
        <a href="https://prodculator.com/faq" class="footer-link">FAQ</a>
        <a href="https://prodculator.com/terms" class="footer-link">Terms</a>
        <a href="https://prodculator.com/privacy" class="footer-link">Privacy</a>
      </div>

      <div style="text-align: center; margin-top: 24px; padding-top: 24px; border-top: 1px solid #333333;">
        <p style="margin: 0; font-size: 12px; color: #666666;">
          © ${new Date().getFullYear()} Prodculator. All rights reserved.<br/>
          Professional production intelligence for film producers worldwide.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;

/**
 * EMAIL 2: WELCOME EMAIL
 * Sent when user creates account
 */
export const welcomeEmail = (data: {
  userName: string;
  loginUrl: string;
  freeCredits: number;
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Scripteligence</title>
  <style>${emailBaseStyles}</style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="https://prodculator.com/logo-white.png" alt="Prodculator" class="logo" />
    </div>

    <div class="content">
      <h1 class="hero-title">Welcome to Prodculator 🎬</h1>
      <p class="hero-subtitle">
        Hi ${data.userName}, your account is ready! You have <strong>${data.freeCredits} free script analysis</strong> waiting for you.
      </p>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${data.loginUrl}" class="cta-button">Get Started</a>
      </div>

      <h2 class="section-title">What You Can Do:</h2>
      <ul class="feature-list">
        <li class="feature-item"><span class="feature-icon">📤</span> Upload your screenplay (PDF, Final Draft, Fountain)</li>
        <li class="feature-item"><span class="feature-icon">🌍</span> Get location recommendations across 30+ territories</li>
        <li class="feature-item"><span class="feature-icon">💰</span> Analyze tax incentives (UK, Canada, US, Malta, South Africa)</li>
        <li class="feature-item"><span class="feature-icon">📊</span> View crew costs and production economics</li>
        <li class="feature-item"><span class="feature-icon">📄</span> Download investor-ready PDF reports</li>
      </ul>

      <div class="highlight-box">
        <p style="margin: 0; font-size: 15px; color: #333333;">
          <strong>Professional Grade Data:</strong> Our reports use curated production datasets, regional film commission data, 
          and third-party APIs to deliver investor-grade intelligence for pre-production planning.
        </p>
      </div>

      <p class="body-text">
        Need help? Check out our <a href="https://prodculator.com/faq" style="color: #D4AF37;">FAQ</a> or 
        email us at <a href="mailto:support@prodculator.com" style="color: #D4AF37;">support@prodculator.com</a>
      </p>
    </div>

    <div class="footer">
      <div style="text-align: center; margin-bottom: 20px;">
        <strong style="color: #D4AF37;">PRODCULATOR</strong>
      </div>
      <div style="text-align: center; margin-top: 24px;">
        <p style="margin: 0; font-size: 12px; color: #666666;">
          © ${new Date().getFullYear()} Prodculator. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;

/**
 * EMAIL 3: PAYMENT CONFIRMATION
 * Sent after successful payment
 */
export const paymentConfirmationEmail = (data: {
  userName: string;
  planName: string;
  amount: string;
  currency: string;
  scriptsIncluded: number;
  receiptUrl: string;
  dashboardUrl: string;
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Confirmation</title>
  <style>${emailBaseStyles}</style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="https://prodculator.com/logo-white.png" alt="Prodculator" class="logo" />
    </div>

    <div class="content">
      <h1 class="hero-title">Payment Confirmed ✓</h1>
      <p class="hero-subtitle">
        Thank you ${data.userName}! Your ${data.planName} is now active.
      </p>

      <div class="highlight-box">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666666;">Plan:</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #000000;">${data.planName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666666;">Amount Paid:</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #D4AF37;">${data.currency}${data.amount}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666666;">Scripts Included:</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #000000;">${data.scriptsIncluded}${data.scriptsIncluded === 10 ? '/month' : ''}</td>
          </tr>
        </table>
      </div>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${data.dashboardUrl}" class="cta-button">Go to Dashboard</a>
        <br/>
        <a href="${data.receiptUrl}" style="color: #D4AF37; text-decoration: none; font-size: 14px; margin-top: 12px; display: inline-block;">View Receipt →</a>
      </div>

      <p class="body-text">
        Your receipt has been sent to your email. You can also access it anytime from your account settings.
      </p>

      <div class="disclaimer">
        <strong>Billing Information:</strong> You can manage your subscription, update payment methods, 
        or view billing history in your account dashboard. For Studio Plan subscribers, invoices are generated monthly.
      </div>
    </div>

    <div class="footer">
      <div style="text-align: center; margin-bottom: 20px;">
        <strong style="color: #D4AF37;">PRODCULATOR</strong>
      </div>
      <div style="text-align: center; margin-top: 24px;">
        <p style="margin: 0; font-size: 12px; color: #666666;">
          © ${new Date().getFullYear()} Prodculator. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;

/**
 * EMAIL 4: SCRIPT PROCESSING STARTED
 * Sent immediately when user uploads a script
 */
export const processingStartedEmail = (data: {
  userName: string;
  scriptTitle: string;
  estimatedTime: string;
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Processing Your Script</title>
  <style>${emailBaseStyles}</style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="https://prodculator.com/logo-white.png" alt="Prodculator" class="logo" />
    </div>

    <div class="content">
      <h1 class="hero-title">We're Analyzing Your Script 🔍</h1>
      <p class="hero-subtitle">
        Hi ${data.userName}, we've received <strong>"${data.scriptTitle}"</strong> and our analysis is underway.
      </p>

      <div class="highlight-box">
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #D4AF37; font-weight: 700; letter-spacing: 0.5px;">
          ESTIMATED COMPLETION
        </p>
        <p style="margin: 0; font-size: 24px; font-weight: 700; color: #000000;">
          ${data.estimatedTime}
        </p>
      </div>

      <h2 class="section-title">What We're Analyzing:</h2>
      <ul class="feature-list">
        <li class="feature-item"><span class="feature-icon">•</span> Script breakdown (scenes, locations, characters)</li>
        <li class="feature-item"><span class="feature-icon">•</span> Production scale and complexity assessment</li>
        <li class="feature-item"><span class="feature-icon">•</span> Location matching across 30+ territories</li>
        <li class="feature-item"><span class="feature-icon">•</span> Tax incentive eligibility analysis</li>
        <li class="feature-item"><span class="feature-icon">•</span> Crew and production cost estimates</li>
        <li class="feature-item"><span class="feature-icon">•</span> Comparable productions research</li>
      </ul>

      <p class="body-text">
        You'll receive an email notification as soon as your report is ready. In the meantime, 
        you can check the status in your <a href="https://prodculator.com/dashboard" style="color: #D4AF37;">dashboard</a>.
      </p>
    </div>

    <div class="footer">
      <div style="text-align: center; margin-bottom: 20px;">
        <strong style="color: #D4AF37;">PRODCULATOR</strong>
      </div>
      <div style="text-align: center; margin-top: 24px;">
        <p style="margin: 0; font-size: 12px; color: #666666;">
          © ${new Date().getFullYear()} Prodculator. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;