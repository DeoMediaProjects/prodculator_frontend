/**
 * Festival Deadline Email Templates for Prodculator
 * 
 * Email templates for festival submission deadline reminders
 */

// Import base styles from email-templates
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
`;

/**
 * FESTIVAL DEADLINE REMINDER EMAIL (14 Days Before)
 */
export const festivalDeadlineReminderEmail = (data: {
  userName: string;
  festivalName: string;
  festivalYear: number;
  deadlineTier: string;
  deadlineDate: string;
  daysRemaining: number;
  submissionFee: string;
  festivalLocation: string;
  festivalUrl: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Festival Deadline Reminder</title>
  <style>${emailBaseStyles}</style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <svg width="180" height="40"><text x="0" y="30" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#D4AF37">PRODCULATOR</text></svg>
    </div>
    <div class="content">
      <h1 class="hero-title">⏰ Festival Deadline Approaching</h1>
      <p class="hero-subtitle">${data.deadlineTier.replace('-', ' ')} deadline for ${data.festivalName} is in ${data.daysRemaining} days</p>

      <div class="highlight-box" style="background-color: #FFF8E7; border-left: 4px solid #ff9800;">
        <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 700; color: #ff9800;">🎬 ${data.festivalName} ${data.festivalYear}</h2>
        <p style="margin: 0 0 8px 0; font-size: 15px; color: #333333;">📍 ${data.festivalLocation}</p>
        <p style="margin: 0; font-size: 15px; color: #333333;">📅 <strong style="color: #ff9800;">${data.deadlineTier.replace('-', ' ')} Deadline:</strong> ${data.deadlineDate}</p>
        <p style="margin: 8px 0 0 0; font-size: 18px; font-weight: 700; color: #ff9800;">💰 Submission Fee: ${data.submissionFee}</p>
      </div>

      <p class="body-text">Hi ${data.userName},</p>
      <p class="body-text">Don't miss your chance to submit to ${data.festivalName}! The ${data.deadlineTier.replace('-', ' ')} deadline is approaching in <strong>${data.daysRemaining} days</strong>.</p>

      <div style="text-align: center;"><a href="${data.festivalUrl}" class="cta-button">Submit to ${data.festivalName} →</a></div>

      <div class="disclaimer">
        <p style="margin: 0; font-size: 12px; color: #666666;">Festival deadlines are sourced from official channels and verified regularly. You can manage your festival alerts in your Dashboard Settings.</p>
      </div>
    </div>
    <div class="footer">
      <p>Best of luck with your submission!</p>
      <p style="margin-top: 16px; color: #D4AF37; font-weight: 600;">– The Prodculator Team</p>
      <div style="text-align: center; margin-top: 24px;">
        <p style="margin: 0; font-size: 12px; color: #666666;">© ${new Date().getFullYear()} Prodculator. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
`;
