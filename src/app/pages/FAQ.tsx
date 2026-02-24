import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Shield, Globe, DollarSign, Film, BarChart, Lock, Mail } from 'lucide-react';
import '@/styles/faq-utilities.css';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQSection {
  title: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

export default function FAQ() {
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [openQuestion, setOpenQuestion] = useState<{ [key: string]: boolean }>({
    '0-0': true, // First question open by default
  });

  const toggleQuestion = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setOpenQuestion(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const faqSections: FAQSection[] = [
    {
      title: 'About Prodculator',
      icon: <Film className="w-5 h-5" />,
      items: [
        {
          question: 'What is Prodculator?',
          answer: (
            <div className="space-y-3">
              <p>
                Prodculator is a professional production intelligence platform for film and television producers, investors, commissioning editors, and production executives.
              </p>
              <p>
                Upload your screenplay and receive a comprehensive <strong>Scripteligence Report</strong> covering:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Production Location Strategy</strong> – Where your script makes the most financial sense to shoot, based on what's actually in it</li>
                <li><strong>Full Financial Picture</strong> – Tax incentives, currency purchasing power, crew cost differentials, and infrastructure — all calculated together, not just the headline rebate</li>
                <li><strong>Investor Summary Panel</strong> – A structured financial breakdown designed for use with investors, gap financiers, and co-production partners</li>
                <li><strong>Comparable Productions</strong> – Real films and series with similar profiles, showing where they shot and what incentives they used</li>
                <li><strong>Strategic Festival Recommendations</strong> – Ranked festival targets based on your script's genre, format, and territory profile</li>
                <li><strong>What-If Calculator</strong> – An interactive tool to model how your financial picture shifts across all 15 territories as your budget changes</li>
              </ul>
              <p>
                We cover <strong>15 international territories</strong> with detailed four-layer financial analysis: UK, France, Ireland, Malta, Hungary, Czech Republic, Spain, Italy, Georgia (USA), New Mexico (USA), British Columbia (Canada), Australia, New Zealand, South Africa, and an emerging tier including Serbia and Romania.
              </p>
            </div>
          ),
        },
        {
          question: 'Who is Prodculator for?',
          answer: (
            <div className="space-y-3">
              <p>Prodculator is built for film and television industry professionals at every stage of development and pre-production:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Producers & Executive Producers</strong> – Make the financial case for a location before committing to it</li>
                <li><strong>Investors & Gap Financiers</strong> – Evaluate the incentive return and total financial upside of a production's location choices</li>
                <li><strong>Commissioning Editors & Studio Executives</strong> – Assess location feasibility and budget efficiency at script stage</li>
                <li><strong>Line Producers & Production Managers</strong> – Get a credible starting point for crew costs, territory comparisons, and schedule planning</li>
                <li><strong>Entertainment Accountants & Tax Advisors</strong> – Use our Studio plan to generate white-label reports for multiple clients simultaneously</li>
                <li><strong>Directors & Writers/Showrunners</strong> – Understand what your script's production requirements mean financially</li>
                <li><strong>Development Executives</strong> – Conduct early-stage location and budget feasibility before greenlight</li>
                <li><strong>Film Commissions</strong> – Our B2B intelligence product gives commissions real-time visibility into production pipeline and territory demand trends</li>
              </ul>
            </div>
          ),
        },
        {
          question: 'How does Prodculator work?',
          answer: (
            <div className="space-y-3">
              <p><strong>Three steps:</strong></p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Upload Your Script</strong> — PDF, DOCX, or TXT format, up to 10MB. We support feature films, TV series, limited series, documentaries, short films, and more.
                </li>
                <li>
                  <strong>Scripteligence Analysis</strong> — Our AI reads your screenplay and extracts production signals: interior vs exterior scene counts, shoot day estimates, period and setting requirements, special production needs (stunts, VFX, water work, child actors). You provide additional context — your budget range, genre, format, filming timeline, and territory preferences. Your original script file is deleted immediately after analysis. We never store your full screenplay.
                </li>
                <li>
                  <strong>Receive Your Scripteligence Report</strong> — Within minutes, your report is ready. It covers location recommendations, full financial analysis across 15 territories, an investor-ready summary, comparable productions, available funding sources, and strategic festival recommendations. Download as PDF (Professional plan) or use the interactive online viewer.
                </li>
              </ol>
            </div>
          ),
        },
        {
          question: 'What makes Prodculator different?',
          answer: (
            <div className="space-y-3">
              <p>Most tools give you a rebate percentage and leave you to do the rest. Prodculator thinks for the producer.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Scripteligence, not just a calculator</strong> — We read your actual screenplay to understand what your production physically requires, not just what you tell a form. A script with 78% interior scenes has very different location logic than one shot mostly outdoors.</li>
                <li><strong>Four-layer financial analysis</strong> — Every territory is assessed on incentive return, currency purchasing power, crew cost differential, and infrastructure — combined into one total saving figure. The incentive is often not the biggest number.</li>
                <li><strong>The full picture, for investors</strong> — Our Investor Summary panel separates "safe for investor documents" figures from figures that require verification. This is a real distinction that matters in production finance.</li>
                <li><strong>15 territories, deeply analysed</strong> — Not 5 countries with surface-level data. Every territory includes programme reliability scoring, payment timeline, minimum spend thresholds, and investor safety flags.</li>
                <li><strong>Production viability intelligence</strong> — If you have exterior scenes and a filming date, we cross-reference your schedule against historical climate data for each territory and flag any conflicts. We think about what your shoot will actually encounter.</li>
                <li><strong>Privacy First</strong> — Your script is deleted immediately after analysis. You retain 100% IP ownership. We never train on your content.</li>
                <li><strong>Data Transparency</strong> — Every data point includes its source and last verification date. We don't pretend our figures are guaranteed — we show you exactly where they come from.</li>
              </ul>
            </div>
          ),
        },
        {
          question: 'Who is behind Prodculator?',
          answer: (
            <div className="space-y-3">
              <p>
                Prodculator is operated by <strong>Deo Media Limited</strong> (Company Number: 15426752), a UK-registered company specialising in film production intelligence and data services.
              </p>
              <p>
                The platform was built by people who have worked in and around film production and understand the gap between what producers need at script stage and what existing tools actually provide. Prodculator was created to close that gap.
              </p>
            </div>
          ),
        },
      ],
    },
    {
      title: 'Your Script & Privacy',
      icon: <Lock className="w-5 h-5" />,
      items: [
        {
          question: 'Is my script safe? Do you store it?',
          answer: (
            <div className="space-y-3">
              <p>
                Your script is used solely to extract production metadata — scene counts, locations, cast requirements, period and setting, and special production signals. The moment that extraction is complete, your original file is permanently deleted from our servers.
              </p>
              <p>
                We store only the extracted metadata (scene counts, INT/EXT ratio, production signals) needed to generate your report. We never store, archive, read, or share your screenplay text. You retain 100% IP ownership of your work at all times.
              </p>
            </div>
          ),
        },
        {
          question: 'Do you claim any rights to my script or intellectual property?',
          answer: (
            <div className="space-y-2">
              <p>
                <strong>No.</strong> Uploading your script to Prodculator does not grant us any rights to your screenplay, story, characters, or any creative content. We extract production metadata and immediately discard the source file. See our Terms of Service for the full IP clause.
              </p>
            </div>
          ),
        },
        {
          question: 'Is my script used to train AI models?',
          answer: (
            <div className="space-y-2">
              <p>
                <strong>No.</strong> Your script is never used for AI training purposes. It is processed in a single, isolated analysis pass and then deleted. We use the Anthropic Claude API for script analysis — see Anthropic's data processing terms at anthropic.com for details of how API inputs are handled.
              </p>
            </div>
          ),
        },
        {
          question: 'What format does my script need to be in?',
          answer: (
            <div className="space-y-2">
              <p>
                We accept <strong>PDF, DOCX, and TXT</strong> formats up to 10MB. Standard screenplay formatting (Final Draft exports, industry PDFs) works best. Unformatted treatments or outlines will produce lower-quality analysis — the tool is designed for scripts with scene headings (INT./EXT.).
              </p>
            </div>
          ),
        },
        {
          question: 'What happens if my script is not yet complete?',
          answer: (
            <div className="space-y-2">
              <p>
                Partial scripts will still generate a report, but the analysis will reflect only the scenes provided. If you have 60 pages of a 120-page feature, our scene counts and INT/EXT ratios will be based on what's there. We recommend uploading the most complete draft available for accurate results. You can re-run analysis on an updated draft — each submission counts as one of your monthly script allowances.
              </p>
            </div>
          ),
        },
      ],
    },
    {
      title: 'The Scripteligence Report',
      icon: <BarChart className="w-5 h-5" />,
      items: [
        {
          question: 'What is a Scripteligence Report?',
          answer: (
            <div className="space-y-3">
              <p>
                <strong>Scripteligence</strong> is our coined term for script-driven production intelligence. A Scripteligence Report is the full output of our analysis — it goes beyond a simple incentive comparison to give you a complete financial and strategic picture of where to make your production.
              </p>
              <p>
                A full report (Professional and Studio plans) includes <strong>8 sections:</strong>
              </p>
              <ol className="list-decimal pl-6 space-y-1">
                <li>Key findings and recommendations</li>
                <li>Territory rankings and analysis — all 15 territories scored and ranked</li>
                <li>Budget scenarios and ROI analysis</li>
                <li>Detailed breakdown — Rank #1 territory</li>
                <li>Detailed breakdown — Rank #2 territory</li>
                <li>Detailed breakdown — Rank #3 territory</li>
                <li>Available funding sources — grants, soft money, co-production treaties</li>
                <li>Strategic festival recommendations</li>
              </ol>
            </div>
          ),
        },
        {
          question: 'What is the Investor Summary panel?',
          answer: (
            <div className="space-y-3">
              <p>
                The <strong>Investor Summary panel</strong> is a structured financial overview that appears at the top of your report. It shows your top 3 recommended territories side by side with a clear breakdown of the financial advantage each offers — and, critically, flags which figures are "safe for investor documents" and which require independent verification before being presented to investors or gap financiers.
              </p>
              <p>
                This matters because some territory incentive programmes are reliable and can legitimately be included in production finance projections. Others have had payment delays or programme changes and should not be presented as guaranteed income to investors without verification. We make this distinction clear so you know exactly what you're working with.
              </p>
            </div>
          ),
        },
        {
          question: 'How does the four-layer financial analysis work?',
          answer: (
            <div className="space-y-3">
              <p>
                This is the core of what Prodculator does. For every territory, we calculate four separate financial layers and combine them into a total figure:
              </p>
              <div className="space-y-2">
                <p><strong>Layer 1 — Tax Incentive:</strong> The rebate or credit available from the territory's government programme, applied to your qualifying spend. Rate, minimum spend, payment timeline, and reliability score are all shown.</p>
                <p><strong>Layer 2 — Currency Purchasing Power:</strong> If your budget is in GBP and you're shooting somewhere with a weaker currency, your money buys more locally. We calculate what your GBP budget is actually worth in local purchasing power for all local costs — crew, locations, catering, transport, accommodation, extras. This is shown as a concrete GBP-equivalent saving, not just an exchange rate.</p>
                <p><strong>Layer 3 — Crew Cost Differential:</strong> We compare UK BECTU minimum rates against published local crew rate guides for each territory. For the number of crew and shoot days you've specified, we calculate the saving from paying local rates instead of UK rates.</p>
                <p><strong>Layer 4 — Infrastructure & Logistics:</strong> Practical notes on studio facilities, visa requirements, seasonal viability, and any production-specific flags raised by your script or camera equipment choices.</p>
              </div>
              <p>
                The <strong>Total Saving</strong> figure you see is the sum of Layers 1–3, with Layer 4 as contextual information. This is why South Africa can show a larger total saving than Malta even though Malta's incentive rate is higher — because South Africa's currency and crew advantages can exceed the incentive difference for many productions.
              </p>
            </div>
          ),
        },
        {
          question: 'What is the Production Viability Advisory?',
          answer: (
            <div className="space-y-3">
              <p>
                If your script has more than 30% exterior scenes and you've provided a filming start date and duration, we cross-reference your schedule against historical climate data for each territory using the Open-Meteo API.
              </p>
              <p>
                The result appears on each territory card as a colour-coded advisory:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong className="text-green-400">Green</strong> — Good filming window: Your exterior scenes fall within this territory's optimal season</li>
                <li><strong className="text-amber-400">Amber</strong> — Weather consideration: A scheduling factor to be aware of — short daylight hours, rainy season risk, or temperature extremes that affect outdoor filming</li>
                <li><strong className="text-red-400">Red</strong> — Scheduling conflict flagged: Your planned dates coincide with conditions that may make this territory impractical for the exterior volume in your script</li>
              </ul>
              <p>
                Importantly, a red advisory does not remove or hide the territory's financial figures. If the financial case for a territory is strong, that remains visible alongside the scheduling flag. The advisory helps you make an informed decision — it doesn't make the decision for you.
              </p>
              <p className="text-sm text-gray-400">
                If your production is predominantly interior (studio-flexible), this advisory does not appear — it isn't relevant.
              </p>
            </div>
          ),
        },
        {
          question: 'What are "comparable productions"?',
          answer: (
            <div className="space-y-3">
              <p>
                The <strong>Comparables</strong> section shows real films and series that share characteristics with your project — similar genre, budget range, and interior/exterior profile — and records where they were produced, which incentive programme they used, and what that territory delivered.
              </p>
              <p>
                This serves two purposes: it gives you production precedent (if a film with a similar profile to yours shot in Malta and used the 40% rebate successfully, that's meaningful context), and it helps investors and financiers see that the territory and incentive combination you're proposing has been used in practice.
              </p>
              <p className="text-sm text-gray-400">
                Comparable productions are sourced from IMDb Pro and The Movie Database (TMDb) and matched algorithmically to your script's profile.
              </p>
            </div>
          ),
        },
        {
          question: 'What is the Strategic Festival Recommendations section?',
          answer: (
            <div className="space-y-2">
              <p>
                Section 8 of a full report recommends film festivals ranked by strategic fit for your specific production. This isn't a generic festival list — it's filtered by your script's genre, format, production territory, and budget tier.
              </p>
              <p>
                Each recommendation includes the festival's strategic positioning, typical submission window, entry fee range, and why it's a match for your production profile. The data is sourced from our internal festivals database, updated quarterly.
              </p>
              <p className="text-sm text-gray-400">
                This section is available on Professional and Studio plans only.
              </p>
            </div>
          ),
        },
      ],
    },
    {
      title: 'Territories & Incentives',
      icon: <Globe className="w-5 h-5" />,
      items: [
        {
          question: 'Which territories does Prodculator cover?',
          answer: (
            <div className="space-y-3">
              <p>We cover <strong>15 international territories</strong> with full four-layer financial analysis:</p>
              <div className="space-y-2">
                <div>
                  <p className="font-semibold text-gold">Europe:</p>
                  <p className="text-sm">United Kingdom (AVEC/IFTC + regional stacking: Scotland, Wales, Northern Ireland), France (TRIP — 30%, 40% VFX), Ireland (Section 481 — 32%), Malta (Cash Rebate — 40%), Hungary (Film Tax Rebate — 30%), Czech Republic (Cash Rebate — 20–28%), Spain (20–25% mainland, 30–45% Canary Islands), Italy (Italian Tax Credit — 40%)</p>
                </div>
                <div>
                  <p className="font-semibold text-gold">Americas:</p>
                  <p className="text-sm">Georgia USA (Film Tax Credit — 30% + 10% VFX), New Mexico USA (25–35%), British Columbia Canada (28–35%)</p>
                </div>
                <div>
                  <p className="font-semibold text-gold">Rest of world:</p>
                  <p className="text-sm">Australia (16.5–30% via Screen Australia and state agencies), New Zealand (20–25%), South Africa (DTI/NFVF — 35%, with reliability advisory)</p>
                </div>
                <div>
                  <p className="font-semibold text-gold">Emerging tier:</p>
                  <p className="text-sm">Serbia and Romania are tracked and included in our territory database. Incentive programmes in these territories are flagged for verification due to programme changes in 2024–2025.</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Each territory record includes: incentive rate, qualifying spend rules, minimum spend threshold, payment timeline, investor safety flag, and reliability score. All data is reviewed quarterly.
              </p>
            </div>
          ),
        },
        {
          question: 'What is a "reliability score" and why does it matter?',
          answer: (
            <div className="space-y-3">
              <p>
                Every territory incentive programme in our database carries a <strong>reliability score from 0 to 1.0</strong>. This reflects how consistently and predictably the programme pays out, based on published payment records, industry reports, and producer feedback.
              </p>
              <p>
                A score of 1.0 means the programme is fully reliable — payments are made on the stated schedule and the programme is well established. A score below 0.5 means there have been significant issues — funding delays, programme changes, or uncertainty that makes us flag the territory for verification before investor use.
              </p>
              <p>
                <strong>South Africa</strong> is the most important example. Its DTI/NFVF programme has experienced funding delays in 2023–2025, giving it a reliability score below 0.5. Our report flags this clearly — the incentive figure is shown with a caution indicator and is not marked as safe for investor documents. However — and this is critical — South Africa's currency and crew advantages are completely separate from the incentive programme and are shown normally. A producer can still benefit enormously from shooting in South Africa on the strength of those two layers alone, without relying on the incentive.
              </p>
            </div>
          ),
        },
        {
          question: 'What does "safe for investor documents" mean?',
          answer: (
            <div className="space-y-3">
              <p>
                The Investor Summary panel marks each territory's figures as <strong>"Safe for investor documents," "Verify before including in investor projections," or "Status unconfirmed."</strong>
              </p>
              <p>
                This distinction exists because production finance is a specific context. Including projected incentive income in a production finance plan presented to investors has legal and reputational implications if the programme fails to pay. Some programmes — Malta's cash rebate, the UK's IFTC, Ireland's Section 481 — are well-established, pay reliably, and can reasonably be included in investor-facing financial projections. Others require independent verification before doing so.
              </p>
              <p className="text-sm text-gray-400">
                We make this call using our reliability score, publicly available information about programme status, and industry knowledge. It is an assessment, not legal advice — always verify with a qualified entertainment accountant before presenting incentive projections to investors.
              </p>
            </div>
          ),
        },
        {
          question: 'Does Prodculator cover regional and stacking incentives within territories?',
          answer: (
            <div className="space-y-3">
              <p>
                <strong>Yes, for the UK specifically.</strong> Our UK territory analysis includes the base AVEC/IFTC calculation plus regional stacking opportunities:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Screen Scotland</strong> — additional funding for productions shooting in Scotland</li>
                <li><strong>Creative Wales</strong> — additional funding for productions shooting in Wales</li>
                <li><strong>Northern Ireland Screen</strong> — recoupable loan scheme for productions shooting in Northern Ireland</li>
              </ul>
              <p>
                Regional stacking can add materially to the UK financial case. For a production that genuinely fits a regional profile, the combined figure can be more competitive than it first appears.
              </p>
              <p className="text-sm text-gray-400">
                For other territories, we note regional variations where they are significant (e.g. Spain's Canary Islands rate of 30–45% vs mainland 20–25%).
              </p>
            </div>
          ),
        },
        {
          question: 'Can I trust the incentive figures in my report?',
          answer: (
            <div className="space-y-3">
              <p>
                Our figures are <strong>indicative estimates</strong> based on publicly available programme information, reviewed quarterly. They are starting points for planning, not guarantees.
              </p>
              <p>
                Incentive programmes change. Rates, qualifying spend definitions, minimum thresholds, and payment timelines are all subject to revision by the relevant government or agency. Our data includes a last-verified date for each territory record so you can see how current our information is.
              </p>
              <p className="font-semibold text-amber-500">
                You must verify all figures with the relevant film commission and a qualified entertainment accountant before making financial commitments, entering into production finance arrangements, or presenting figures to investors. See our Legal & Disclaimers section for the full position on this.
              </p>
            </div>
          ),
        },
      ],
    },
    {
      title: 'Pricing & Plans',
      icon: <DollarSign className="w-5 h-5" />,
      items: [
        {
          question: 'How does the free plan work?',
          answer: (
            <div className="space-y-3">
              <p>
                Create an account with your email address and you receive <strong>one Scripteligence Report, free</strong>, with no credit card required. This is a one-time allocation — not a monthly allowance.
              </p>
              <p>
                The free report gives you: key findings and top 3 territory recommendations with headline saving figures, a full territory ranking showing where all 15 territories sit in order, and a preview of the Scripteligence analysis of your script.
              </p>
              <p>
                Sections 3–8 (budget scenarios, detailed territory breakdowns, funding sources, festival recommendations) are locked on the free plan. You'll see what they contain and can unlock them by upgrading to Professional.
              </p>
              <p className="text-sm text-gray-400">
                This is intentional. Most producers work on one script for months. A monthly free plan would be abused — we'd rather give you something genuinely useful once than something limited every month.
              </p>
            </div>
          ),
        },
        {
          question: 'What does the Professional plan include?',
          answer: (
            <div className="space-y-3">
              <p>
                Professional is <strong>£49/month (£39/month billed annually)</strong> and gives you <strong>3 Scripteligence Reports per month</strong>.
              </p>
              <p>
                Every report includes all 8 sections: full 15-territory analysis with four-layer breakdowns, Investor Summary panel, budget scenarios and ROI analysis, detailed breakdowns for your top 3 territories, available funding sources (grants, soft money, co-production treaties), strategic festival recommendations, and comparable productions.
              </p>
              <p>
                <strong>Additional features:</strong> PDF report download (Prodculator branded), What-If Calculator (interactive, for the duration of your session), and data source attribution throughout.
              </p>
            </div>
          ),
        },
        {
          question: 'What does the Studio plan include?',
          answer: (
            <div className="space-y-3">
              <p>
                Studio is <strong>£239/month</strong> and gives you <strong>10 Scripteligence Reports per month</strong>. It includes everything in Professional, plus:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>White-label PDF output</strong> — Your logo on every PDF report. "Prepared by [Your Firm]" footer. Custom cover. Designed for production companies delivering reports to clients.</li>
                <li><strong>Permanent shareable links</strong> — Report links that don't expire. Share with investors, financiers, or co-production partners.</li>
                <li><strong>Save What-If scenarios</strong> — Save and revisit multiple budget scenarios per report, across sessions.</li>
                <li><strong>Excel data export</strong> — The full territory data table exported to Excel for your own analysis or to share with line producers and accountants.</li>
                <li><strong>Multiple team seats</strong> — Suitable for production companies running multiple projects simultaneously.</li>
                <li><strong>Incentive alert system</strong> — Get notified when a programme you're monitoring changes rate or status.</li>
              </ul>
            </div>
          ),
        },
        {
          question: 'What is the Production Services Intelligence product?',
          answer: (
            <div className="space-y-3">
              <p>
                This is a separate B2B product for organisations that serve the film industry — entertainment accountants, entertainment lawyers, payroll companies, film commissions, and equipment rental houses.
              </p>
              <p>
                At <strong>£750/month</strong>, it delivers anonymised market intelligence derived from production activity on the Prodculator platform: which territories are being selected by producers, what budget ranges are in the pipeline, what genres and formats are coming to market, crew size distribution, and camera equipment demand signals.
              </p>
              <p className="text-sm text-gray-400">
                This is not a script analysis product. It answers a different question: "What productions are heading to my territory or using my services?" It is not visible on the main pricing page and is accessed via the B2B route or by contacting us directly.
              </p>
            </div>
          ),
        },
        {
          question: 'Can I cancel at any time?',
          answer: (
            <div className="space-y-2">
              <p>
                <strong>Yes.</strong> Prodculator subscriptions are monthly (or annual, if you've taken the annual pricing). Monthly subscriptions can be cancelled at any time — you retain access until the end of the billing period. Annual subscriptions are non-refundable after the initial 14-day period. Manage your subscription from your account dashboard.
              </p>
            </div>
          ),
        },
        {
          question: 'Do you offer discounts for film schools, emerging producers, or non-profits?',
          answer: (
            <div className="space-y-2">
              <p>
                We are currently exploring an educational access programme. If you represent a film school, emerging producer scheme, or non-profit film organisation, contact us at <a href="mailto:hello@prodculator.com" className="text-gold hover-text-gold-light">hello@prodculator.com</a> to discuss options.
              </p>
            </div>
          ),
        },
      ],
    },
    {
      title: 'Legal & Disclaimers',
      icon: <Shield className="w-5 h-5" />,
      items: [
        {
          question: 'Is Prodculator providing legal, tax, or financial advice?',
          answer: (
            <div className="space-y-3">
              <div className="bg-amber-900-20 border-l-4 border-amber-500 p-4">
                <p className="font-bold text-amber-400 text-lg mb-3">
                  NO. Prodculator does NOT provide professional legal, tax, financial, or production advice.
                </p>
                <p className="mb-2">
                  <strong>What we provide:</strong> Informational intelligence reports based on verified datasets, for preliminary planning and research purposes only.
                </p>
                <p className="mb-3">
                  <strong>What we DON'T provide:</strong> Professional advice, guarantees, real-time data, or recommendations that should be relied upon without independent verification.
                </p>
                <p className="font-semibold text-amber-300 mb-2">You MUST consult qualified professionals:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Entertainment Attorneys</strong> — For legal matters, contracts, co-production agreements, and IP rights</li>
                  <li><strong>Tax Professionals (CPAs / Chartered Accountants)</strong> — For tax incentive applications, qualifying spend verification, and compliance</li>
                  <li><strong>Financial Advisors / Entertainment Accountants</strong> — For investment decisions, production finance structures, and investor-facing projections</li>
                  <li><strong>Line Producers</strong> — For accurate production budgets, crew rates, and logistics</li>
                  <li><strong>Film Commissions</strong> — For official programme requirements, applications, and current programme status</li>
                </ul>
              </div>
              <p className="text-sm text-gray-400">
                See our <a href="/terms-of-service" className="text-gold hover-text-gold-light">Terms of Service</a> Section 9 for complete legal disclaimers.
              </p>
            </div>
          ),
        },
        {
          question: 'What does "indicative estimates only" mean?',
          answer: (
            <div className="space-y-3">
              <p>
                Every financial figure in a Prodculator report — incentive amounts, currency savings, crew cost differentials — is an estimate based on our datasets at the time of calculation. It is <strong>indicative:</strong> directionally accurate and useful for planning, but not a quote, not a guarantee, and not a figure you can contractually rely upon.
              </p>
              <p>
                Incentive programme rates change. Exchange rates move daily. Crew costs vary by role, experience level, and negotiation. We give you the best estimate we can from the data we have — but the actual numbers for your specific production will be determined by qualified professionals working with current, verified information.
              </p>
            </div>
          ),
        },
        {
          question: 'What are my legal responsibilities when using Prodculator?',
          answer: (
            <div className="space-y-2">
              <p>
                By using Prodculator, you confirm that you are using the reports for your own internal research and planning purposes. You are responsible for verifying all figures with qualified professionals before acting on them. You must not present Prodculator reports to investors, financiers, or other third parties as professional advice or guaranteed projections without disclosure that the figures are indicative estimates from a planning tool.
              </p>
            </div>
          ),
        },
        {
          question: 'What is Prodculator\'s liability if data is inaccurate?',
          answer: (
            <div className="space-y-2">
              <p>
                Prodculator's liability is limited as set out in our Terms of Service. We make every effort to maintain accurate, current data — every territory record includes a last-verified date and source attribution so you can see exactly when the data was last checked. However, we are not liable for decisions made on the basis of our reports. Always verify before acting.
              </p>
            </div>
          ),
        },
        {
          question: 'Do you claim any rights to my script or intellectual property?',
          answer: (
            <div className="space-y-2">
              <p>
                <strong>No.</strong> See "Your Script & Privacy" section above. Uploading your script grants us no rights whatsoever to your creative work. We extract production metadata and delete the source file. You retain 100% IP ownership.
              </p>
            </div>
          ),
        },
        {
          question: 'How should I use Prodculator reports in my workflow?',
          answer: (
            <div className="space-y-3">
              <p>
                Prodculator reports are designed as a first-stage planning and research tool — something you use before you're spending money on location scouts, detailed budgets, or production accountants. The right workflow:
              </p>
              <ol className="list-decimal pl-6 space-y-1">
                <li>Upload your script at development or early pre-production stage</li>
                <li>Use the territory rankings and financial analysis to shortlist 2–3 territories worth investigating further</li>
                <li>Share the Investor Summary with financiers as a discussion starting point (noting it is indicative)</li>
                <li>Commission a qualified entertainment accountant to verify the incentive figures for your shortlisted territories</li>
                <li>Engage the relevant film commissions directly for official programme guidance</li>
                <li>Use the What-If Calculator and budget scenarios to model changes as your budget evolves</li>
              </ol>
              <p>
                We are the starting point for an intelligent conversation — not the final word.
              </p>
            </div>
          ),
        },
        {
          question: 'Where can I find your full legal terms and privacy policy?',
          answer: (
            <div className="space-y-3">
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Terms of Service:</strong> <a href="/terms-of-service" className="text-gold hover-text-gold-light">prodculator.com/terms</a></li>
                <li><strong>Privacy Policy:</strong> <a href="/privacy-policy" className="text-gold hover-text-gold-light">prodculator.com/privacy</a></li>
                <li><strong>Acceptable Use Policy:</strong> <a href="/acceptable-use" className="text-gold hover-text-gold-light">prodculator.com/acceptable-use</a></li>
                <li><strong>Data Attribution Guide:</strong> <a href="/data-attribution" className="text-gold hover-text-gold-light">prodculator.com/data-attribution</a></li>
              </ul>
              <p className="text-sm text-gray-400 mt-3">
                Prodculator is operated by <strong>Deo Media Limited, Company Number 15426752</strong>, registered in England and Wales. Our privacy practices comply with UK GDPR and, where applicable, EU GDPR.
              </p>
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <div className="faq-page min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black-50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <a href="/" className="text-2xl font-bold text-gold hover-text-gold-light transition-colors">
                Prodculator
              </a>
            </div>
            <nav className="flex gap-6">
              <a href="/" className="text-gray-300 hover-text-white transition-colors">Home</a>
              <a href="/pricing" className="text-gray-300 hover-text-white transition-colors">Pricing</a>
              <a href="/dashboard" className="text-gray-300 hover-text-white transition-colors">Dashboard</a>
              <a href="/login" className="text-gray-300 hover-text-white transition-colors">Login</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-gray-800 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <HelpCircle className="w-8 h-8 text-gold" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about Prodculator's Scripteligence AI, from getting started to advanced features.
            Can't find what you're looking for? <a href="mailto:support@prodculator.com" className="text-gold hover-text-gold-light">Contact us</a>.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6">
            {faqSections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="border border-gray-800 rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-black"
              >
                {/* Section Header */}
                <button
                  onClick={() => setOpenSection(openSection === sectionIndex ? null : sectionIndex)}
                  className="w-full px-6 py-4 flex items-center justify-between hover-bg-gray-800-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-gold">
                      {section.icon}
                    </div>
                    <h2 className="text-xl font-semibold text-left">{section.title}</h2>
                    <span className="text-sm text-gray-400">({section.items.length})</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      openSection === sectionIndex ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Section Content */}
                {openSection === sectionIndex && (
                  <div className="border-t border-gray-800">
                    {section.items.map((item, itemIndex) => {
                      const questionKey = `${sectionIndex}-${itemIndex}`;
                      const isOpen = openQuestion[questionKey];

                      return (
                        <div key={itemIndex} className="border-b border-gray-800 last:border-b-0">
                          {/* Question */}
                          <button
                            onClick={() => toggleQuestion(sectionIndex, itemIndex)}
                            className="w-full px-6 py-4 flex items-start justify-between hover-bg-gray-800-30 transition-colors text-left"
                          >
                            <div className="flex items-start gap-3 flex-1">
                              <div className="mt-1">
                                <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-gold' : 'bg-gray-600'}`} />
                              </div>
                              <span className="font-medium text-gray-100">{item.question}</span>
                            </div>
                            <ChevronDown
                              className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ml-4 mt-1 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {/* Answer */}
                          {isOpen && (
                            <div className="px-6 pb-4 pl-14">
                              <div className="text-gray-300 leading-relaxed">
                                {typeof item.answer === 'string' ? (
                                  <p>{item.answer}</p>
                                ) : (
                                  item.answer
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-gray-800 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <Mail className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Our team is here to help. Get in touch and we'll respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@prodculator.com"
              className="px-8 py-3 bg-gold text-black font-semibold rounded-lg hover-bg-gold-light transition-colors inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Email Support
            </a>
            <a
              href="/dashboard"
              className="px-8 py-3 border-2 border-gold text-gold font-semibold rounded-lg hover-bg-gold hover-text-black transition-colors"
            >
              Go to Dashboard
            </a>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              <strong>Email Support:</strong> support@prodculator.com<br />
              <strong>Privacy:</strong> privacyprod@deomedia.net<br />
              <strong>Response Time:</strong> Within 24 hours (business days)<br />
              <strong>Company:</strong> Deo Media Limited (15426752)<br />
              Springhead Road, Northfleet, Kent, DA11 8HN, United Kingdom
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Deo Media Limited. All rights reserved.
            </p>
            <nav className="flex gap-6 text-sm">
              <a href="/terms-of-service" className="text-gray-400 hover-text-white transition-colors">Terms of Service</a>
              <a href="/privacy-policy" className="text-gray-400 hover-text-white transition-colors">Privacy Policy</a>
              <a href="/acceptable-use" className="text-gray-400 hover-text-white transition-colors">Acceptable Use</a>
              <a href="/b2b-solutions" className="text-gray-400 hover-text-white transition-colors">B2B Solutions</a>
              <a href="/faq" className="text-gray-400 hover-text-white transition-colors">FAQ</a>
              <a href="mailto:info@prodculator.com" className="text-gray-400 hover-text-white transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

export { FAQ };
