-- ============================================================================
-- PRODCULATOR SEED DATA
-- Initial data to populate the database for testing and production
-- ============================================================================

-- ============================================================================
-- INCENTIVE PROGRAMS (From your existing mock data)
-- ============================================================================

INSERT INTO incentive_programs (territory, country, state, program_name, rate_min, rate_max, cap_amount, cap_currency, status, source_type, source_url, last_updated, auto_sync_enabled) VALUES
-- UK
('United Kingdom (National)', 'United Kingdom', NULL, 'UK Film Tax Relief', 25.5, 25.5, NULL, 'GBP', 'active', 'manual', 'https://www.bfi.org.uk/film-industry/uk-film-tax-relief', '2026-01-15', FALSE),
('England', 'United Kingdom', 'England', 'England Production Fund', 0, 50000000, 50000000, 'GBP', 'active', 'manual', 'https://britishfilmcommission.org.uk', '2026-01-15', FALSE),
('Yorkshire (UK)', 'United Kingdom', 'Yorkshire', 'Yorkshire Content Fund', 0, 100000000, 100000000, 'GBP', 'active', 'manual', 'https://yorkshire.film', '2026-01-12', FALSE),
('Liverpool (UK)', 'United Kingdom', 'Liverpool', 'Liverpool City Region Production Fund', 0, 50000000, 50000000, 'GBP', 'active', 'manual', 'https://www.liverpoolf ilmoffice.com', '2026-01-10', FALSE),
('Scotland', 'United Kingdom', 'Scotland', 'Screen Scotland Production Growth Fund', 0, 200000000, 200000000, 'GBP', 'active', 'manual', 'https://www.screen.scot', '2026-01-14', FALSE),
('Wales', 'United Kingdom', 'Wales', 'Creative Wales Production Funding', 0, 200000000, 200000000, 'GBP', 'active', 'manual', 'https://businesswales.gov.wales/creative-wales', '2026-01-11', FALSE),
('Northern Ireland', 'United Kingdom', 'Northern Ireland', 'Northern Ireland Screen Production Fund', 0, 100000000, 100000000, 'GBP', 'active', 'manual', 'https://northernirelandscreen.co.uk', '2026-01-13', FALSE),

-- Canada
('British Columbia', 'Canada', 'British Columbia', 'BC Film Incentive', 35, 35, 1000000000, 'CAD', 'active', 'manual', 'https://www.creativebc.com', '2026-01-10', FALSE),
('Ontario', 'Canada', 'Ontario', 'Ontario Film & TV Tax Credit', 35, 35, NULL, 'CAD', 'active', 'manual', 'https://www.ontario.ca/page/film-tax-credits', '2026-01-12', FALSE),
('Quebec', 'Canada', 'Quebec', 'SODEC Tax Credit', 35, 35, NULL, 'CAD', 'active', 'manual', 'https://sodec.gouv.qc.ca', '2026-01-11', FALSE),
('Alberta', 'Canada', 'Alberta', 'Alberta Film Grant', 22, 22, 1000000000, 'CAD', 'active', 'manual', 'https://www.alberta.ca', '2026-01-09', FALSE),
('Manitoba', 'Canada', 'Manitoba', 'Manitoba Film & Music Tax Credit', 30, 45, NULL, 'CAD', 'active', 'manual', 'https://mbfilmmusic.ca', '2026-01-08', FALSE),
('Nova Scotia', 'Canada', 'Nova Scotia', 'Nova Scotia Film & TV Tax Credit', 32, 32, NULL, 'CAD', 'active', 'manual', 'https://film.novascotia.ca', '2026-01-10', FALSE),

-- United States
('Georgia (USA)', 'United States', 'Georgia', 'Film Tax Credit', 30, 30, NULL, 'USD', 'active', 'manual', 'https://georgia.org/industries/film-entertainment', '2026-01-08', FALSE),
('California (USA)', 'United States', 'California', 'California Film & TV Tax Credit', 20, 25, 33000000000, 'USD', 'active', 'manual', 'https://film.ca.gov', '2026-01-14', FALSE),
('New York (USA)', 'United States', 'New York', 'NY Film Production Tax Credit', 30, 30, 70000000000, 'USD', 'active', 'manual', 'https://esd.ny.gov/film-production-tax-credit-program', '2026-01-13', FALSE),
('Louisiana (USA)', 'United States', 'Louisiana', 'Louisiana Entertainment Tax Credit', 40, 40, 15000000000, 'USD', 'active', 'manual', 'https://louisianaentertainment.gov', '2026-01-11', FALSE),
('New Mexico (USA)', 'United States', 'New Mexico', 'NM Film Production Tax Credit', 25, 35, 11000000000, 'USD', 'active', 'manual', 'https://nmfilm.com', '2026-01-10', FALSE),
('North Carolina (USA)', 'United States', 'North Carolina', 'NC Film & Entertainment Grant', 25, 25, 3100000000, 'USD', 'active', 'manual', 'https://filmnc.com', '2026-01-09', FALSE),
('Illinois (USA)', 'United States', 'Illinois', 'Illinois Film Tax Credit', 30, 30, NULL, 'USD', 'active', 'manual', 'https://www.illinois.gov/dceo/filmoffice', '2026-01-12', FALSE),
('Massachusetts (USA)', 'United States', 'Massachusetts', 'MA Film Tax Incentive', 25, 25, NULL, 'USD', 'active', 'manual', 'https://mafilm.org', '2026-01-11', FALSE),

-- Malta
('Malta', 'Malta', NULL, 'Cash Rebate', 40, 40, NULL, 'EUR', 'active', 'manual', 'https://maltafilmcommission.com', '2025-12-20', FALSE),

-- South Africa
('South Africa (National)', 'South Africa', NULL, 'Foreign Film & TV Production Incentive', 20, 35, 5000000000, 'ZAR', 'active', 'manual', 'https://www.nfvf.co.za', '2026-01-01', FALSE),
('Western Cape (SA)', 'South Africa', 'Western Cape', 'Western Cape Film Commission Support', 20, 35, 5000000000, 'ZAR', 'active', 'manual', 'https://www.capefilmcommission.co.za', '2026-01-01', FALSE),
('KwaZulu-Natal (SA)', 'South Africa', 'KwaZulu-Natal', 'KZN Film Commission Support', 20, 35, 5000000000, 'ZAR', 'active', 'manual', 'https://www.kznfilmcommission.co.za', '2026-01-01', FALSE),
('Gauteng (SA)', 'South Africa', 'Gauteng', 'Gauteng Film Commission Support', 20, 35, 5000000000, 'ZAR', 'active', 'manual', 'https://www.gautengfilm.org.za', '2026-01-01', FALSE);

-- ============================================================================
-- CREW COSTS (Sample data)
-- ============================================================================

INSERT INTO crew_costs (territory, country, state, role, category, day_rate_cents, week_rate_cents, currency, union_name, source, last_updated, auto_sync_enabled) VALUES
('United Kingdom', 'United Kingdom', NULL, 'Director of Photography', 'Camera', 65000, 325000, 'USD', 'BECTU', 'BECTU Rate Card 2026', '2026-01-15', FALSE),
('British Columbia', 'Canada', 'British Columbia', 'Gaffer', 'Lighting', 55000, 275000, 'USD', 'IATSE 891', 'IATSE 891 Agreement', '2026-01-10', FALSE),
('Georgia (USA)', 'United States', 'Georgia', 'Production Designer', 'Art Department', 70000, 350000, 'USD', 'IATSE Local 479', 'IATSE 479 Minimums', '2026-01-08', FALSE),
('Malta', 'Malta', NULL, 'Assistant Director', 'Production', 40000, 200000, 'USD', 'Non-Union', 'Malta Film Commission Survey', '2025-12-20', FALSE);

-- ============================================================================
-- COMPARABLE PRODUCTIONS (Sample data)
-- ============================================================================

INSERT INTO comparable_productions (title, year, tmdb_id, genre, budget_usd, production_type, primary_territory, incentive_used, source, verified) VALUES
('The Crown (Season 6)', 2023, 1399, ARRAY['Drama'], 1300000000, 'tv_series', 'United Kingdom', 'UK Film Tax Relief', 'manual', TRUE),
('Deadpool 3', 2024, 533535, ARRAY['Action', 'Comedy'], 20000000000, 'feature', 'British Columbia', 'BC Film Incentive', 'manual', TRUE),
('Stranger Things (Season 4)', 2022, 66732, ARRAY['Sci-Fi', 'Horror'], 3000000000, 'tv_series', 'Georgia (USA)', 'Georgia Film Tax Credit', 'manual', TRUE),
('Jurassic World Dominion', 2022, 507086, ARRAY['Action', 'Adventure'], 16500000000, 'feature', 'Malta', 'Malta Cash Rebate', 'manual', TRUE);

-- ============================================================================
-- GRANT OPPORTUNITIES (Sample data)
-- ============================================================================

INSERT INTO grant_opportunities (title, organization, amount_min, amount_max, currency, deadline, territory, status, source, verified) VALUES
('BFI Production Fund - High-End TV', 'British Film Institute', 0, 120000000, 'GBP', '2026-02-28', 'UK', 'opening_soon', 'manual', TRUE),
('Canada Media Fund - Convergent Stream', 'Canada Media Fund', 0, 250000000, 'CAD', '2026-02-15', 'Canada', 'open', 'manual', TRUE),
('Sundance Institute Documentary Fund', 'Sundance Institute', 0, 5000000, 'USD', '2026-01-31', 'USA', 'closing_soon', 'manual', TRUE);

-- ============================================================================
-- FILM FESTIVALS (Sample data)
-- ============================================================================

INSERT INTO film_festivals (name, location, country, submission_deadline, festival_start_date, festival_end_date, prestige_tier, status, verified) VALUES
('Sundance Film Festival 2027', 'Park City, Utah, USA', 'United States', '2026-12-09', '2027-01-21', '2027-01-31', 'a-list', 'upcoming', TRUE),
('Cannes Film Festival 2027', 'Cannes, France', 'France', '2026-03-15', '2027-05-11', '2027-05-22', 'a-list', 'upcoming', TRUE),
('Toronto International Film Festival (TIFF) 2026', 'Toronto, Canada', 'Canada', '2026-05-15', '2026-09-09', '2026-09-19', 'a-list', 'upcoming', TRUE),
('Venice Film Festival 2026', 'Venice, Italy', 'Italy', '2026-06-01', '2026-08-27', '2026-09-06', 'a-list', 'upcoming', TRUE),
('Berlin International Film Festival (Berlinale) 2027', 'Berlin, Germany', 'Germany', '2026-11-20', '2027-02-11', '2027-02-21', 'a-list', 'upcoming', TRUE),
('Tribeca Film Festival 2026', 'New York City, USA', 'United States', NULL, '2026-06-10', '2026-06-21', 'a-list', 'closed', TRUE),
('Telluride Film Festival 2026', 'Telluride, Colorado, USA', 'United States', '2026-06-01', '2026-08-28', '2026-09-01', 'a-list', 'upcoming', TRUE),
('AFI Fest 2026', 'Los Angeles, USA', 'United States', '2026-06-15', '2026-10-22', '2026-10-30', 'tier-2', 'upcoming', TRUE),
('New York Film Festival 2026', 'New York City, USA', 'United States', '2026-06-15', '2026-09-25', '2026-10-11', 'tier-2', 'upcoming', TRUE),
('BFI London Film Festival 2026', 'London, UK', 'United Kingdom', '2026-05-01', '2026-10-07', '2026-10-18', 'tier-2', 'upcoming', TRUE),
('Hot Docs Canadian International Documentary Festival 2026', 'Toronto, Canada', 'Canada', NULL, '2026-04-23', '2026-05-03', 'specialized', 'closed', TRUE),
('IDFA Amsterdam 2026', 'Amsterdam, Netherlands', 'Netherlands', '2026-05-31', '2026-11-18', '2026-11-29', 'specialized', 'upcoming', TRUE),
('Locarno Film Festival 2026', 'Locarno, Switzerland', 'Switzerland', '2026-05-15', '2026-08-05', '2026-08-15', 'tier-2', 'upcoming', TRUE),
('San Sebastián International Film Festival 2026', 'San Sebastián, Spain', 'Spain', '2026-06-30', '2026-09-18', '2026-09-26', 'tier-2', 'upcoming', TRUE),
('Fantastic Fest 2026', 'Austin, Texas, USA', 'United States', '2026-03-15', '2026-09-24', '2026-10-01', 'specialized', 'upcoming', TRUE),
('DOC NYC 2026', 'New York City, USA', 'United States', '2026-05-31', '2026-11-11', '2026-11-19', 'specialized', 'upcoming', TRUE),
('Palm Springs International Film Festival 2027', 'Palm Springs, California, USA', 'United States', '2026-08-01', '2027-01-02', '2027-01-13', 'tier-2', 'upcoming', TRUE),
('Clermont-Ferrand International Short Film Festival 2027', 'Clermont-Ferrand, France', 'France', '2026-09-30', '2027-01-30', '2027-02-07', 'specialized', 'upcoming', TRUE);

-- ============================================================================
-- STORAGE BUCKETS SETUP
-- Note: These need to be created via Supabase UI or Storage API
-- ============================================================================

-- Create buckets (run this via Supabase Dashboard → Storage):
-- 1. Bucket name: "scripts" (Private)
-- 2. Bucket name: "reports" (Public)

-- ============================================================================
-- COMPLETE! 
-- ============================================================================
