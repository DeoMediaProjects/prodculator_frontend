/**
 * Email Delivery Service
 * Integrates with SendGrid to send transactional emails
 * Note: SendGrid API calls must be made server-side due to API key security
 */

import { API_CONFIG } from '@/config/api.config';

// Email template types
export enum EmailTemplate {
  REPORT_READY = 'report_ready',
  WELCOME = 'welcome',
  PAYMENT_CONFIRMATION = 'payment_confirmation',
  PROCESSING_STARTED = 'processing_started',
  GRANT_ALERT = 'grant_alert',
  FESTIVAL_DEADLINE = 'festival_deadline',
}

// Email data interfaces
export interface ReportReadyEmailData {
  userName: string;
  scriptTitle: string;
  reportUrl: string;
  pdfUrl?: string;
  processingTime: string;
  topRecommendation: string;
  estimatedIncentive: string;
}

export interface WelcomeEmailData {
  userName: string;
  freeCredits: number;
  dashboardUrl: string;
}

export interface PaymentConfirmationEmailData {
  userName: string;
  planName: string;
  amount: string;
  currency: string;
  scriptsIncluded: number;
  receiptUrl: string;
  billingDate: string;
}

export interface ProcessingStartedEmailData {
  userName: string;
  scriptTitle: string;
  estimatedTime: string;
  dashboardUrl: string;
}

export interface GrantAlertEmailData {
  userName: string;
  grantName: string;
  amount: string;
  deadline: string;
  eligibility: string;
  applyUrl: string;
}

export interface FestivalDeadlineEmailData {
  userName: string;
  festivalName: string;
  deadline: string;
  category: string;
  fee: string;
  festivalUrl: string;
}

type EmailData =
  | ReportReadyEmailData
  | WelcomeEmailData
  | PaymentConfirmationEmailData
  | ProcessingStartedEmailData
  | GrantAlertEmailData
  | FestivalDeadlineEmailData;

/**
 * Email service class - client-side interface
 * Actual API calls should be made through Supabase Edge Functions or backend API
 */
export class EmailService {
  private apiEndpoint: string;

  constructor() {
    // This should point to your backend API endpoint or Supabase Edge Function
    this.apiEndpoint = `${API_CONFIG.app.apiBaseURL}/api/emails`;
  }

  /**
   * Send email through backend API
   */
  private async sendEmail(
    template: EmailTemplate,
    to: string,
    data: EmailData,
    attachments?: Array<{ filename: string; content: string | Buffer; type: string }>
  ): Promise<void> {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template,
          to,
          data,
          attachments,
        }),
      });

      if (!response.ok) {
        throw new Error(`Email API error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Email sent successfully:', result);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  /**
   * Send report ready notification
   */
  async sendReportReadyEmail(to: string, data: ReportReadyEmailData): Promise<void> {
    await this.sendEmail(EmailTemplate.REPORT_READY, to, data);
  }

  /**
   * Send welcome email to new users
   */
  async sendWelcomeEmail(to: string, data: WelcomeEmailData): Promise<void> {
    await this.sendEmail(EmailTemplate.WELCOME, to, data);
  }

  /**
   * Send payment confirmation
   */
  async sendPaymentConfirmation(
    to: string,
    data: PaymentConfirmationEmailData
  ): Promise<void> {
    await this.sendEmail(EmailTemplate.PAYMENT_CONFIRMATION, to, data);
  }

  /**
   * Send processing started notification
   */
  async sendProcessingStartedEmail(to: string, data: ProcessingStartedEmailData): Promise<void> {
    await this.sendEmail(EmailTemplate.PROCESSING_STARTED, to, data);
  }

  /**
   * Send grant alert notification
   */
  async sendGrantAlert(to: string, data: GrantAlertEmailData): Promise<void> {
    await this.sendEmail(EmailTemplate.GRANT_ALERT, to, data);
  }

  /**
   * Send festival deadline reminder
   */
  async sendFestivalDeadlineReminder(to: string, data: FestivalDeadlineEmailData): Promise<void> {
    await this.sendEmail(EmailTemplate.FESTIVAL_DEADLINE, to, data);
  }
}

// Export singleton instance
export const emailService = new EmailService();

/**
 * SERVER-SIDE ONLY: SendGrid Email Templates
 * These functions should only be called from server-side code (Supabase Edge Functions, backend API)
 */

/**
 * Generate HTML for Report Ready Email
 */
export function generateReportReadyEmailHTML(data: ReportReadyEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background-color: #000000; padding: 40px 20px; text-align: center; }
    .logo { color: #FFFFFF; font-size: 28px; font-weight: bold; margin: 0; }
    .subtitle { color: #D4AF37; font-size: 14px; margin-top: 10px; }
    .content { padding: 40px 20px; }
    .highlight-box { background-color: #FFF9E6; border-left: 4px solid #D4AF37; padding: 20px; margin: 20px 0; }
    .gold-text { color: #D4AF37; font-weight: bold; }
    .btn { display: inline-block; background-color: #D4AF37; color: #000000; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 5px; margin: 10px 5px; }
    .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666666; }
    .badge { background-color: #D4AF37; color: #000000; padding: 5px 10px; border-radius: 3px; font-size: 11px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">PRODCULATOR</h1>
      <p class="subtitle">Scripteligence v6.8</p>
    </div>
    
    <div class="content">
      <h2>Your Scripteligence Report is Ready! 🎬</h2>
      <p>Hi ${data.userName},</p>
      <p>Great news! Your production intelligence report for <strong>"${data.scriptTitle}"</strong> has been completed.</p>
      
      <div class="highlight-box">
        <p style="margin: 0 0 10px 0;"><span class="gold-text">TOP RECOMMENDATION</span></p>
        <h3 style="margin: 0 0 10px 0; color: #000000;">${data.topRecommendation}</h3>
        <p style="margin: 0;"><span class="gold-text">Estimated Incentive:</span> ${data.estimatedIncentive}</p>
        <p style="margin: 10px 0 0 0; font-size: 12px; color: #666666;">Processing Time: ${data.processingTime}</p>
      </div>
      
      <h3>Your Report Includes:</h3>
      <ul style="line-height: 2;">
        <li>✅ Script Analysis & Production Requirements</li>
        <li>✅ Location Strategy (Top 5 Territories)</li>
        <li>✅ Tax Incentives & Rebates</li>
        <li>✅ Crew Cost Comparisons</li>
        <li>✅ Comparable Productions</li>
        <li>✅ Grant & Funding Opportunities</li>
        <li>✅ Production Economics Analysis</li>
        <li>✅ Next Steps & Recommendations</li>
      </ul>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${data.reportUrl}" class="btn">View Full Report</a>
        ${data.pdfUrl ? `<a href="${data.pdfUrl}" class="btn" style="background-color: #000000; color: #D4AF37;">Download PDF</a>` : ''}
      </div>
      
      <div style="background-color: #f9f9f9; padding: 15px; margin-top: 30px; border-radius: 5px;">
        <p style="margin: 0; font-size: 12px; color: #666666;">
          <span class="badge">DATA VERIFIED</span> This report uses verified data from Film Commissions, KFTV, ProductionHUB, and government databases.
        </p>
      </div>
      
      <p style="margin-top: 30px; font-size: 14px; color: #666666;">
        <strong>Need help?</strong> Contact our team at support@prodculator.com
      </p>
    </div>
    
    <div class="footer">
      <p>© 2026 Prodculator. All rights reserved.</p>
      <p>Professional production intelligence for film producers worldwide.</p>
      <p><a href="${API_CONFIG.app.url}/dashboard" style="color: #D4AF37;">Dashboard</a> | <a href="${API_CONFIG.app.url}/faq" style="color: #D4AF37;">FAQ</a> | <a href="${API_CONFIG.app.url}/terms" style="color: #D4AF37;">Terms</a></p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generate HTML for Welcome Email
 */
export function generateWelcomeEmailHTML(data: WelcomeEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background-color: #000000; padding: 40px 20px; text-align: center; }
    .logo { color: #FFFFFF; font-size: 28px; font-weight: bold; margin: 0; }
    .subtitle { color: #D4AF37; font-size: 14px; margin-top: 10px; }
    .content { padding: 40px 20px; }
    .btn { display: inline-block; background-color: #D4AF37; color: #000000; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 5px; margin: 10px 0; }
    .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">WELCOME TO PRODCULATOR</h1>
      <p class="subtitle">Scripteligence v6.8</p>
    </div>
    
    <div class="content">
      <h2>Welcome, ${data.userName}! 🎉</h2>
      <p>You've just joined the future of film production intelligence.</p>
      
      <p>Your account includes <strong>${data.freeCredits} free credits</strong> to get started.</p>
      
      <h3>What You Can Do:</h3>
      <ul style="line-height: 2;">
        <li>📄 Upload scripts for AI analysis</li>
        <li>🌍 Compare production locations across 6 territories</li>
        <li>💰 Calculate tax incentives & rebates</li>
        <li>👥 Estimate crew costs by department</li>
        <li>🎬 Research comparable productions</li>
        <li>💸 Find grants & funding opportunities</li>
      </ul>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${data.dashboardUrl}" class="btn">Get Started</a>
      </div>
    </div>
    
    <div class="footer">
      <p>© 2026 Prodculator. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generate HTML for Payment Confirmation Email
 */
export function generatePaymentConfirmationEmailHTML(data: PaymentConfirmationEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background-color: #000000; padding: 40px 20px; text-align: center; }
    .logo { color: #FFFFFF; font-size: 28px; font-weight: bold; margin: 0; }
    .content { padding: 40px 20px; }
    .receipt-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .receipt-table td { padding: 10px; border-bottom: 1px solid #e0e0e0; }
    .receipt-table .label { font-weight: bold; color: #666666; }
    .receipt-table .value { text-align: right; }
    .total-row { background-color: #FFF9E6; font-weight: bold; }
    .btn { display: inline-block; background-color: #D4AF37; color: #000000; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 5px; margin: 10px 0; }
    .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">PAYMENT CONFIRMATION</h1>
    </div>
    
    <div class="content">
      <h2>Thank you for your payment! ✅</h2>
      <p>Hi ${data.userName},</p>
      <p>Your payment has been successfully processed.</p>
      
      <table class="receipt-table">
        <tr>
          <td class="label">Plan:</td>
          <td class="value">${data.planName}</td>
        </tr>
        <tr>
          <td class="label">Scripts Included:</td>
          <td class="value">${data.scriptsIncluded}</td>
        </tr>
        <tr>
          <td class="label">Billing Date:</td>
          <td class="value">${data.billingDate}</td>
        </tr>
        <tr class="total-row">
          <td class="label">Total Amount:</td>
          <td class="value">${data.amount} ${data.currency}</td>
        </tr>
      </table>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${data.receiptUrl}" class="btn">View Receipt</a>
      </div>
      
      <p style="font-size: 14px; color: #666666;">
        Your subscription will automatically renew on the next billing date. You can manage your billing preferences in your account settings.
      </p>
    </div>
    
    <div class="footer">
      <p>© 2026 Prodculator. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generate HTML for Processing Started Email
 */
export function generateProcessingStartedEmailHTML(data: ProcessingStartedEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background-color: #000000; padding: 40px 20px; text-align: center; }
    .logo { color: #FFFFFF; font-size: 28px; font-weight: bold; margin: 0; }
    .content { padding: 40px 20px; }
    .btn { display: inline-block; background-color: #D4AF37; color: #000000; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 5px; margin: 10px 0; }
    .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">ANALYSIS IN PROGRESS</h1>
    </div>
    
    <div class="content">
      <h2>We're analyzing your script! ⚡</h2>
      <p>Hi ${data.userName},</p>
      <p>Your script "<strong>${data.scriptTitle}</strong>" has been received and is being analyzed by our Scripteligence AI system.</p>
      
      <p><strong>Estimated completion time:</strong> ${data.estimatedTime}</p>
      
      <h3>What we're analyzing:</h3>
      <ul style="line-height: 2;">
        <li>📍 Production locations & requirements</li>
        <li>🎭 Character breakdown & casting needs</li>
        <li>🌍 Optimal filming territories</li>
        <li>💰 Tax incentive opportunities</li>
        <li>👥 Crew cost estimates</li>
        <li>🎬 Comparable productions</li>
      </ul>
      
      <p>You'll receive an email notification as soon as your report is ready!</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${data.dashboardUrl}" class="btn">Track Status</a>
      </div>
    </div>
    
    <div class="footer">
      <p>© 2026 Prodculator. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}
