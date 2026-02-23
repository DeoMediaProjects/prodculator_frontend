-- ============================================================================
-- PRODCULATOR COMPLETE DATABASE SCHEMA
-- This includes ALL tables needed for production, including admin functions
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search

-- ============================================================================
-- CORE USER & SUBSCRIPTION TABLES
-- ============================================================================

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  company TEXT,
  role TEXT, -- producer, director, studio_exec, investor, other
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active TIMESTAMPTZ,
  stripe_customer_id TEXT UNIQUE,
  user_type TEXT DEFAULT 'free' CHECK (user_type IN ('free', 'paid', 'b2b', 'admin')),
  
  -- Credits system
  credits_remaining INTEGER DEFAULT 0,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'single', 'studio'))
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_price_id TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('Pro Monthly', 'Producer Annual', 'Studio')),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing', 'incomplete')),
  currency TEXT NOT NULL CHECK (currency IN ('usd', 'gbp')),
  amount_cents INTEGER NOT NULL,
  report_limit INTEGER, -- -1 for unlimited
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payment methods table
CREATE TABLE payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_payment_method_id TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  last4 TEXT,
  brand TEXT,
  exp_month INTEGER,
  exp_year INTEGER,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- REPORTS & SCRIPT ANALYSIS TABLES
-- ============================================================================

-- Reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  script_title TEXT NOT NULL,
  script_file_path TEXT,
  status TEXT NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
  report_type TEXT DEFAULT 'free' CHECK (report_type IN ('free', 'paid', 'b2b')),
  report_data JSONB,
  analysis_data JSONB, -- Stores AI-extracted data from script
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  pdf_url TEXT,
  pdf_size_bytes INTEGER,
  share_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
  download_count INTEGER DEFAULT 0,
  last_downloaded_at TIMESTAMPTZ,
  
  -- Credit and expiration tracking
  expires_at TIMESTAMPTZ, -- 30 days for single, 90 days for studio
  regeneration_count INTEGER DEFAULT 0, -- Track how many times territories were re-run
  selected_territories TEXT[] DEFAULT ARRAY[]::TEXT[] -- Currently selected territories for this report
);

-- Email gating table (abuse prevention)
CREATE TABLE email_gating_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  report_id UUID REFERENCES reports(id) ON DELETE SET NULL,
  report_generated BOOLEAN DEFAULT FALSE,
  blocked BOOLEAN DEFAULT FALSE,
  blocked_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT
);

-- ============================================================================
-- PRODUCTION INTELLIGENCE TABLES (For Admin Dashboard)
-- ============================================================================

-- Production signals extracted from script submissions
CREATE TABLE production_signals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  script_id UUID REFERENCES reports(id) ON DELETE CASCADE, -- Same as report_id
  territory TEXT NOT NULL,
  state TEXT,
  submission_date TIMESTAMPTZ DEFAULT NOW(),
  
  -- Equipment detected from script
  camera_equipment TEXT CHECK (camera_equipment IN ('arri', 'red', 'sony', 'panavision', 'blackmagic', 'canon', 'other')),
  
  -- Scale indicators
  crew_size TEXT CHECK (crew_size IN ('small', 'medium', 'large', 'extra_large')),
  principal_cast TEXT CHECK (principal_cast IN ('small', 'medium', 'large', 'extra_large')),
  supporting_cast TEXT CHECK (supporting_cast IN ('small', 'medium', 'large', 'extra_large')),
  background_extras TEXT CHECK (background_extras IN ('small', 'medium', 'large', 'extra_large')),
  
  -- Context
  budget_range TEXT,
  format TEXT,
  genres TEXT[],
  
  -- Metadata
  anonymized BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INCENTIVE DATA TABLES (Tax Credits & Rebates)
-- ============================================================================

CREATE TABLE incentive_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  territory TEXT NOT NULL,
  country TEXT NOT NULL,
  state TEXT,
  program_name TEXT NOT NULL,
  rate_min NUMERIC(5,2), -- e.g., 25.50 for 25.5%
  rate_max NUMERIC(5,2),
  cap_amount BIGINT, -- In cents, NULL for uncapped
  cap_currency TEXT DEFAULT 'USD',
  
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'payment_issues')),
  payment_issues_note TEXT,
  
  -- Auto-sync tracking
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  last_verified TIMESTAMPTZ,
  auto_sync_enabled BOOLEAN DEFAULT FALSE,
  auto_sync_last_check TIMESTAMPTZ,
  source_url TEXT,
  source_type TEXT DEFAULT 'manual' CHECK (source_type IN ('manual', 'official_api', 'web_scrape')),
  
  -- Change detection
  pending_changes JSONB, -- Stores AI-detected changes awaiting approval
  change_detected_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Incentive change history (audit trail)
CREATE TABLE incentive_changes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  incentive_id UUID REFERENCES incentive_programs(id) ON DELETE CASCADE,
  field_changed TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  changed_by TEXT, -- 'admin' or 'auto_sync'
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- CREW COSTS & UNION RATES TABLES
-- ============================================================================

CREATE TABLE crew_costs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  territory TEXT NOT NULL,
  country TEXT NOT NULL,
  state TEXT,
  role TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Camera', 'Lighting', 'Sound', 'Art Department', 'Production', 'Post-Production', 'Hair/Makeup', 'Wardrobe', 'Transport', 'Stunts', 'VFX')),
  
  -- Rates (stored in cents)
  day_rate_cents INTEGER,
  week_rate_cents INTEGER,
  currency TEXT DEFAULT 'USD',
  
  -- Union info
  union_name TEXT,
  union_local TEXT,
  
  -- Data source
  source TEXT NOT NULL,
  source_url TEXT,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  
  -- Auto-sync
  auto_sync_enabled BOOLEAN DEFAULT FALSE,
  auto_sync_last_check TIMESTAMPTZ,
  pending_updates JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- COMPARABLE PRODUCTIONS DATABASE
-- ============================================================================

CREATE TABLE comparable_productions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  year INTEGER,
  tmdb_id INTEGER UNIQUE,
  imdb_id TEXT,
  
  -- Production details
  genre TEXT[],
  budget_usd BIGINT, -- In cents
  production_type TEXT CHECK (production_type IN ('feature', 'tv_series', 'limited_series', 'documentary', 'short')),
  
  -- Location & Incentive
  primary_territory TEXT NOT NULL,
  additional_territories TEXT[],
  incentive_used TEXT,
  incentive_program_id UUID REFERENCES incentive_programs(id),
  
  -- Data source
  source TEXT NOT NULL CHECK (source IN ('tmdb', 'manual', 'bfi', 'public_records')),
  source_url TEXT,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  verified BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- GRANT OPPORTUNITIES TABLES
-- ============================================================================

CREATE TABLE grant_opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  
  -- Amounts
  amount_min INTEGER,
  amount_max INTEGER,
  currency TEXT DEFAULT 'USD',
  
  -- Deadlines
  deadline TIMESTAMPTZ,
  notification_date TIMESTAMPTZ,
  
  -- Territory
  territory TEXT NOT NULL,
  eligible_countries TEXT[],
  
  -- Details
  eligibility_criteria TEXT,
  application_url TEXT,
  grant_type TEXT CHECK (grant_type IN ('production', 'development', 'post_production', 'distribution', 'marketing')),
  
  -- Status
  status TEXT DEFAULT 'open' CHECK (status IN ('opening_soon', 'open', 'closing_soon', 'closed')),
  
  -- Source
  source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'rss', 'grantify_api', 'web_scrape')),
  grantify_id TEXT UNIQUE,
  verified BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- FILM FESTIVALS TABLES
-- ============================================================================

CREATE TABLE film_festivals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  country TEXT,
  
  -- Dates
  submission_deadline TIMESTAMPTZ,
  notification_date TIMESTAMPTZ,
  festival_start_date TIMESTAMPTZ,
  festival_end_date TIMESTAMPTZ,
  
  -- Fees
  submission_fee_min INTEGER, -- In cents
  submission_fee_max INTEGER,
  currency TEXT DEFAULT 'USD',
  
  -- Details
  website_url TEXT,
  categories TEXT[],
  prestige_tier TEXT CHECK (prestige_tier IN ('a-list', 'tier-2', 'specialized')),
  
  -- Status
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'open', 'closed', 'past')),
  
  -- Source
  source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'filmfreeway', 'web_scrape')),
  filmfreeway_id TEXT,
  verified BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- USER ENGAGEMENT TABLES
-- ============================================================================

-- User watchlist for territories (Engagement Trio feature)
CREATE TABLE territory_watchlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  territory TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, territory)
);

-- B2B Client Management
CREATE TABLE b2b_clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  contract_type TEXT CHECK (contract_type IN ('monthly', 'annual', 'custom')),
  report_quota INTEGER, -- -1 for unlimited
  reports_used INTEGER DEFAULT 0,
  contract_start TIMESTAMPTZ NOT NULL,
  contract_end TIMESTAMPTZ,
  custom_branding BOOLEAN DEFAULT FALSE,
  api_access BOOLEAN DEFAULT FALSE,
  api_key TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- CREDITS & TRANSACTIONS TABLES
-- ============================================================================

-- Credit transactions table (track all credit purchases and usage)
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  credits_added INTEGER DEFAULT 0,
  credits_used INTEGER DEFAULT 0,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('purchase', 'usage', 'refund', 'bonus', 'subscription_grant')),
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  report_id UUID REFERENCES reports(id) ON DELETE SET NULL, -- For usage transactions
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- What-If Calculator saved scenarios
CREATE TABLE saved_scenarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  scenario_name TEXT NOT NULL,
  budget INTEGER NOT NULL,
  crew_size INTEGER NOT NULL,
  shoot_days INTEGER NOT NULL,
  include_post_production BOOLEAN DEFAULT true,
  selected_currency TEXT DEFAULT 'USD',
  results JSONB, -- Store calculated results
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Users & Auth
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_stripe_customer_id ON users(stripe_customer_id);
CREATE INDEX idx_users_user_type ON users(user_type);

-- Subscriptions
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);

-- Reports
CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_reports_created_at ON reports(created_at);
CREATE INDEX idx_reports_share_token ON reports(share_token);
CREATE INDEX idx_reports_status ON reports(status);

-- Email Gating
CREATE INDEX idx_email_gating_email ON email_gating_log(email);
CREATE INDEX idx_email_gating_created_at ON email_gating_log(created_at);

-- Production Signals
CREATE INDEX idx_production_signals_territory ON production_signals(territory);
CREATE INDEX idx_production_signals_submission_date ON production_signals(submission_date);
CREATE INDEX idx_production_signals_camera_equipment ON production_signals(camera_equipment);

-- Incentive Programs
CREATE INDEX idx_incentive_programs_territory ON incentive_programs(territory);
CREATE INDEX idx_incentive_programs_status ON incentive_programs(status);
CREATE INDEX idx_incentive_programs_last_updated ON incentive_programs(last_updated);

-- Crew Costs
CREATE INDEX idx_crew_costs_territory ON crew_costs(territory);
CREATE INDEX idx_crew_costs_role ON crew_costs(role);
CREATE INDEX idx_crew_costs_category ON crew_costs(category);

-- Comparable Productions
CREATE INDEX idx_comparable_productions_territory ON comparable_productions(primary_territory);
CREATE INDEX idx_comparable_productions_tmdb_id ON comparable_productions(tmdb_id);
CREATE INDEX idx_comparable_productions_year ON comparable_productions(year);
CREATE INDEX idx_comparable_productions_genre ON comparable_productions USING GIN (genre);

-- Grant Opportunities
CREATE INDEX idx_grant_opportunities_deadline ON grant_opportunities(deadline);
CREATE INDEX idx_grant_opportunities_territory ON grant_opportunities(territory);
CREATE INDEX idx_grant_opportunities_status ON grant_opportunities(status);

-- Film Festivals
CREATE INDEX idx_film_festivals_deadline ON film_festivals(submission_deadline);
CREATE INDEX idx_film_festivals_prestige_tier ON film_festivals(prestige_tier);
CREATE INDEX idx_film_festivals_status ON film_festivals(status);

-- B2B Clients
CREATE INDEX idx_b2b_clients_user_id ON b2b_clients(user_id);
CREATE INDEX idx_b2b_clients_api_key ON b2b_clients(api_key);

-- Credit Transactions
CREATE INDEX idx_credit_transactions_user_id ON credit_transactions(user_id);
CREATE INDEX idx_credit_transactions_transaction_type ON credit_transactions(transaction_type);
CREATE INDEX idx_credit_transactions_created_at ON credit_transactions(created_at);

-- Saved Scenarios
CREATE INDEX idx_saved_scenarios_user_id ON saved_scenarios(user_id);
CREATE INDEX idx_saved_scenarios_created_at ON saved_scenarios(created_at);

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE territory_watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE b2b_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_gating_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_scenarios ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Subscriptions policies
CREATE POLICY "Users can read own subscriptions" ON subscriptions
  FOR SELECT USING (user_id = auth.uid());

-- Reports policiess
CREATE POLICY "Users can read own reports" ON reports
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Anyone can read shared reports" ON reports
  FOR SELECT USING (share_token IS NOT NULL);

-- Payment methods policies
CREATE POLICY "Users can read own payment methods" ON payment_methods
  FOR SELECT USING (user_id = auth.uid());

-- Territory watchlist policies
CREATE POLICY "Users can manage own watchlist" ON territory_watchlist
  FOR ALL USING (user_id = auth.uid());

-- B2B clients policies
CREATE POLICY "Users can read own B2B client data" ON b2b_clients
  FOR SELECT USING (user_id = auth.uid());

-- Email gating policies (admin only can read)
CREATE POLICY "Admin can read email gating log" ON email_gating_log
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin')
  );

-- Credit transactions policies
CREATE POLICY "Users can read own credit transactions" ON credit_transactions
  FOR SELECT USING (user_id = auth.uid());

-- Saved scenarios policies
CREATE POLICY "Users can manage own saved scenarios" ON saved_scenarios
  FOR ALL USING (user_id = auth.uid());

-- Public read policies for reference data
CREATE POLICY "Grant opportunities are public" ON grant_opportunities
  FOR SELECT USING (true);

CREATE POLICY "Festivals are public" ON film_festivals
  FOR SELECT USING (true);

CREATE POLICY "Incentive programs are public" ON incentive_programs
  FOR SELECT USING (true);

CREATE POLICY "Crew costs are public" ON crew_costs
  FOR SELECT USING (true);

CREATE POLICY "Comparable productions are public" ON comparable_productions
  FOR SELECT USING (true);

CREATE POLICY "Production signals are public (anonymized)" ON production_signals
  FOR SELECT USING (anonymized = true);

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_incentive_programs_updated_at BEFORE UPDATE ON incentive_programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crew_costs_updated_at BEFORE UPDATE ON crew_costs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grant_opportunities_updated_at BEFORE UPDATE ON grant_opportunities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_film_festivals_updated_at BEFORE UPDATE ON film_festivals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_b2b_clients_updated_at BEFORE UPDATE ON b2b_clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE production_signals IS 'Aggregated anonymized data from script submissions for production intelligence dashboard';
COMMENT ON TABLE incentive_programs IS 'Tax incentive and rebate programs with AI auto-sync capabilities';
COMMENT ON TABLE crew_costs IS 'Crew rates and union data with auto-sync from public sources';
COMMENT ON TABLE comparable_productions IS 'Database of film/TV productions with budget and incentive data';
COMMENT ON TABLE email_gating_log IS 'Tracks free report usage per email for abuse prevention';
COMMENT ON TABLE b2b_clients IS 'B2B client contracts and API access management';

-- ============================================================================
-- COMPLETE! 
-- ============================================================================
-- Run this entire file in Supabase SQL Editor to create all tables
-- ============================================================================