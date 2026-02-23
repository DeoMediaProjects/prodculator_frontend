/**
 * Supabase Database Types
 * Auto-generated types for type-safe database operations
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          company: string | null
          role: string | null
          country: string | null
          created_at: string
          last_active: string | null
          stripe_customer_id: string | null
          user_type: 'free' | 'paid' | 'b2b' | 'admin'
          credits_remaining: number
          plan: 'free' | 'single' | 'studio'
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          company?: string | null
          role?: string | null
          country?: string | null
          created_at?: string
          last_active?: string | null
          stripe_customer_id?: string | null
          user_type?: 'free' | 'paid' | 'b2b' | 'admin'
          credits_remaining?: number
          plan?: 'free' | 'single' | 'studio'
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          company?: string | null
          role?: string | null
          country?: string | null
          created_at?: string
          last_active?: string | null
          stripe_customer_id?: string | null
          user_type?: 'free' | 'paid' | 'b2b' | 'admin'
          credits_remaining?: number
          plan?: 'free' | 'single' | 'studio'
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_subscription_id: string
          stripe_price_id: string
          plan: 'Pro Monthly' | 'Producer Annual' | 'Studio'
          status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete'
          currency: 'usd' | 'gbp'
          amount_cents: number
          report_limit: number | null
          current_period_start: string
          current_period_end: string
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_subscription_id: string
          stripe_price_id: string
          plan: 'Pro Monthly' | 'Producer Annual' | 'Studio'
          status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete'
          currency: 'usd' | 'gbp'
          amount_cents: number
          report_limit?: number | null
          current_period_start: string
          current_period_end: string
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_subscription_id?: string
          stripe_price_id?: string
          plan?: 'Pro Monthly' | 'Producer Annual' | 'Studio'
          status?: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete'
          currency?: 'usd' | 'gbp'
          amount_cents?: number
          report_limit?: number | null
          current_period_start?: string
          current_period_end?: string
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          user_id: string | null
          script_title: string
          script_file_path: string | null
          status: 'processing' | 'completed' | 'failed'
          report_type: 'free' | 'paid' | 'b2b'
          report_data: Json | null
          analysis_data: Json | null
          created_at: string
          completed_at: string | null
          pdf_url: string | null
          pdf_size_bytes: number | null
          share_token: string
          download_count: number
          last_downloaded_at: string | null
          expires_at: string | null
          regeneration_count: number
          selected_territories: string[]
        }
        Insert: {
          id?: string
          user_id?: string | null
          script_title: string
          script_file_path?: string | null
          status?: 'processing' | 'completed' | 'failed'
          report_type?: 'free' | 'paid' | 'b2b'
          report_data?: Json | null
          analysis_data?: Json | null
          created_at?: string
          completed_at?: string | null
          pdf_url?: string | null
          pdf_size_bytes?: number | null
          share_token?: string
          download_count?: number
          last_downloaded_at?: string | null
          expires_at?: string | null
          regeneration_count?: number
          selected_territories?: string[]
        }
        Update: {
          id?: string
          user_id?: string | null
          script_title?: string
          script_file_path?: string | null
          status?: 'processing' | 'completed' | 'failed'
          report_type?: 'free' | 'paid' | 'b2b'
          report_data?: Json | null
          analysis_data?: Json | null
          created_at?: string
          completed_at?: string | null
          pdf_url?: string | null
          pdf_size_bytes?: number | null
          share_token?: string
          download_count?: number
          last_downloaded_at?: string | null
          expires_at?: string | null
          regeneration_count?: number
          selected_territories?: string[]
        }
      }
      payment_methods: {
        Row: {
          id: string
          user_id: string
          stripe_payment_method_id: string
          type: string
          last4: string | null
          brand: string | null
          exp_month: number | null
          exp_year: number | null
          is_default: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_payment_method_id: string
          type: string
          last4?: string | null
          brand?: string | null
          exp_month?: number | null
          exp_year?: number | null
          is_default?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_payment_method_id?: string
          type?: string
          last4?: string | null
          brand?: string | null
          exp_month?: number | null
          exp_year?: number | null
          is_default?: boolean
          created_at?: string
        }
      }
      email_gating_log: {
        Row: {
          id: string
          email: string
          report_id: string | null
          report_generated: boolean
          blocked: boolean
          blocked_reason: string | null
          created_at: string
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          email: string
          report_id?: string | null
          report_generated?: boolean
          blocked?: boolean
          blocked_reason?: string | null
          created_at?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          email?: string
          report_id?: string | null
          report_generated?: boolean
          blocked?: boolean
          blocked_reason?: string | null
          created_at?: string
          ip_address?: string | null
          user_agent?: string | null
        }
      }
      production_signals: {
        Row: {
          id: string
          report_id: string | null
          script_id: string | null
          territory: string
          state: string | null
          submission_date: string
          camera_equipment: 'arri' | 'red' | 'sony' | 'panavision' | 'blackmagic' | 'canon' | 'other' | null
          crew_size: 'small' | 'medium' | 'large' | 'extra_large' | null
          principal_cast: 'small' | 'medium' | 'large' | 'extra_large' | null
          supporting_cast: 'small' | 'medium' | 'large' | 'extra_large' | null
          background_extras: 'small' | 'medium' | 'large' | 'extra_large' | null
          budget_range: string | null
          format: string | null
          genres: string[] | null
          anonymized: boolean
          created_at: string
        }
        Insert: {
          id?: string
          report_id?: string | null
          script_id?: string | null
          territory: string
          state?: string | null
          submission_date?: string
          camera_equipment?: 'arri' | 'red' | 'sony' | 'panavision' | 'blackmagic' | 'canon' | 'other' | null
          crew_size?: 'small' | 'medium' | 'large' | 'extra_large' | null
          principal_cast?: 'small' | 'medium' | 'large' | 'extra_large' | null
          supporting_cast?: 'small' | 'medium' | 'large' | 'extra_large' | null
          background_extras?: 'small' | 'medium' | 'large' | 'extra_large' | null
          budget_range?: string | null
          format?: string | null
          genres?: string[] | null
          anonymized?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          report_id?: string | null
          script_id?: string | null
          territory?: string
          state?: string | null
          submission_date?: string
          camera_equipment?: 'arri' | 'red' | 'sony' | 'panavision' | 'blackmagic' | 'canon' | 'other' | null
          crew_size?: 'small' | 'medium' | 'large' | 'extra_large' | null
          principal_cast?: 'small' | 'medium' | 'large' | 'extra_large' | null
          supporting_cast?: 'small' | 'medium' | 'large' | 'extra_large' | null
          background_extras?: 'small' | 'medium' | 'large' | 'extra_large' | null
          budget_range?: string | null
          format?: string | null
          genres?: string[] | null
          anonymized?: boolean
          created_at?: string
        }
      }
      incentive_programs: {
        Row: {
          id: string
          territory: string
          country: string
          state: string | null
          program_name: string
          rate_min: number | null
          rate_max: number | null
          cap_amount: number | null
          cap_currency: string
          status: 'active' | 'inactive' | 'suspended' | 'payment_issues'
          payment_issues_note: string | null
          last_updated: string
          last_verified: string | null
          auto_sync_enabled: boolean
          auto_sync_last_check: string | null
          source_url: string | null
          source_type: 'manual' | 'official_api' | 'web_scrape'
          pending_changes: Json | null
          change_detected_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          territory: string
          country: string
          state?: string | null
          program_name: string
          rate_min?: number | null
          rate_max?: number | null
          cap_amount?: number | null
          cap_currency?: string
          status?: 'active' | 'inactive' | 'suspended' | 'payment_issues'
          payment_issues_note?: string | null
          last_updated?: string
          last_verified?: string | null
          auto_sync_enabled?: boolean
          auto_sync_last_check?: string | null
          source_url?: string | null
          source_type?: 'manual' | 'official_api' | 'web_scrape'
          pending_changes?: Json | null
          change_detected_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          territory?: string
          country?: string
          state?: string | null
          program_name?: string
          rate_min?: number | null
          rate_max?: number | null
          cap_amount?: number | null
          cap_currency?: string
          status?: 'active' | 'inactive' | 'suspended' | 'payment_issues'
          payment_issues_note?: string | null
          last_updated?: string
          last_verified?: string | null
          auto_sync_enabled?: boolean
          auto_sync_last_check?: string | null
          source_url?: string | null
          source_type?: 'manual' | 'official_api' | 'web_scrape'
          pending_changes?: Json | null
          change_detected_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      crew_costs: {
        Row: {
          id: string
          territory: string
          country: string
          state: string | null
          role: string
          category: string
          day_rate_cents: number | null
          week_rate_cents: number | null
          currency: string
          union_name: string | null
          union_local: string | null
          source: string
          source_url: string | null
          last_updated: string
          auto_sync_enabled: boolean
          auto_sync_last_check: string | null
          pending_updates: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          territory: string
          country: string
          state?: string | null
          role: string
          category: string
          day_rate_cents?: number | null
          week_rate_cents?: number | null
          currency?: string
          union_name?: string | null
          union_local?: string | null
          source: string
          source_url?: string | null
          last_updated?: string
          auto_sync_enabled?: boolean
          auto_sync_last_check?: string | null
          pending_updates?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          territory?: string
          country?: string
          state?: string | null
          role?: string
          category?: string
          day_rate_cents?: number | null
          week_rate_cents?: number | null
          currency?: string
          union_name?: string | null
          union_local?: string | null
          source?: string
          source_url?: string | null
          last_updated?: string
          auto_sync_enabled?: boolean
          auto_sync_last_check?: string | null
          pending_updates?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      comparable_productions: {
        Row: {
          id: string
          title: string
          year: number | null
          tmdb_id: number | null
          imdb_id: string | null
          genre: string[] | null
          budget_usd: number | null
          production_type: 'feature' | 'tv_series' | 'limited_series' | 'documentary' | 'short' | null
          primary_territory: string
          additional_territories: string[] | null
          incentive_used: string | null
          incentive_program_id: string | null
          source: 'tmdb' | 'manual' | 'bfi' | 'public_records'
          source_url: string | null
          last_updated: string
          verified: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          year?: number | null
          tmdb_id?: number | null
          imdb_id?: string | null
          genre?: string[] | null
          budget_usd?: number | null
          production_type?: 'feature' | 'tv_series' | 'limited_series' | 'documentary' | 'short' | null
          primary_territory: string
          additional_territories?: string[] | null
          incentive_used?: string | null
          incentive_program_id?: string | null
          source: 'tmdb' | 'manual' | 'bfi' | 'public_records'
          source_url?: string | null
          last_updated?: string
          verified?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          year?: number | null
          tmdb_id?: number | null
          imdb_id?: string | null
          genre?: string[] | null
          budget_usd?: number | null
          production_type?: 'feature' | 'tv_series' | 'limited_series' | 'documentary' | 'short' | null
          primary_territory?: string
          additional_territories?: string[] | null
          incentive_used?: string | null
          incentive_program_id?: string | null
          source?: 'tmdb' | 'manual' | 'bfi' | 'public_records'
          source_url?: string | null
          last_updated?: string
          verified?: boolean
          created_at?: string
        }
      }
      grant_opportunities: {
        Row: {
          id: string
          title: string
          organization: string
          amount_min: number | null
          amount_max: number | null
          currency: string
          deadline: string | null
          notification_date: string | null
          territory: string
          eligible_countries: string[] | null
          eligibility_criteria: string | null
          application_url: string | null
          grant_type: 'production' | 'development' | 'post_production' | 'distribution' | 'marketing' | null
          status: 'opening_soon' | 'open' | 'closing_soon' | 'closed'
          source: 'manual' | 'rss' | 'grantify_api' | 'web_scrape'
          grantify_id: string | null
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          organization: string
          amount_min?: number | null
          amount_max?: number | null
          currency?: string
          deadline?: string | null
          notification_date?: string | null
          territory: string
          eligible_countries?: string[] | null
          eligibility_criteria?: string | null
          application_url?: string | null
          grant_type?: 'production' | 'development' | 'post_production' | 'distribution' | 'marketing' | null
          status?: 'opening_soon' | 'open' | 'closing_soon' | 'closed'
          source?: 'manual' | 'rss' | 'grantify_api' | 'web_scrape'
          grantify_id?: string | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          organization?: string
          amount_min?: number | null
          amount_max?: number | null
          currency?: string
          deadline?: string | null
          notification_date?: string | null
          territory?: string
          eligible_countries?: string[] | null
          eligibility_criteria?: string | null
          application_url?: string | null
          grant_type?: 'production' | 'development' | 'post_production' | 'distribution' | 'marketing' | null
          status?: 'opening_soon' | 'open' | 'closing_soon' | 'closed'
          source?: 'manual' | 'rss' | 'grantify_api' | 'web_scrape'
          grantify_id?: string | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      film_festivals: {
        Row: {
          id: string
          name: string
          location: string
          country: string | null
          submission_deadline: string | null
          notification_date: string | null
          festival_start_date: string | null
          festival_end_date: string | null
          submission_fee_min: number | null
          submission_fee_max: number | null
          currency: string
          website_url: string | null
          categories: string[] | null
          prestige_tier: 'a-list' | 'tier-2' | 'specialized' | null
          status: 'upcoming' | 'open' | 'closed' | 'past'
          source: 'manual' | 'filmfreeway' | 'web_scrape'
          filmfreeway_id: string | null
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          location: string
          country?: string | null
          submission_deadline?: string | null
          notification_date?: string | null
          festival_start_date?: string | null
          festival_end_date?: string | null
          submission_fee_min?: number | null
          submission_fee_max?: number | null
          currency?: string
          website_url?: string | null
          categories?: string[] | null
          prestige_tier?: 'a-list' | 'tier-2' | 'specialized' | null
          status?: 'upcoming' | 'open' | 'closed' | 'past'
          source?: 'manual' | 'filmfreeway' | 'web_scrape'
          filmfreeway_id?: string | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string
          country?: string | null
          submission_deadline?: string | null
          notification_date?: string | null
          festival_start_date?: string | null
          festival_end_date?: string | null
          submission_fee_min?: number | null
          submission_fee_max?: number | null
          currency?: string
          website_url?: string | null
          categories?: string[] | null
          prestige_tier?: 'a-list' | 'tier-2' | 'specialized' | null
          status?: 'upcoming' | 'open' | 'closed' | 'past'
          source?: 'manual' | 'filmfreeway' | 'web_scrape'
          filmfreeway_id?: string | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      territory_watchlist: {
        Row: {
          id: string
          user_id: string
          territory: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          territory: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          territory?: string
          created_at?: string
        }
      }
      b2b_clients: {
        Row: {
          id: string
          user_id: string
          company_name: string
          contract_type: 'monthly' | 'annual' | 'custom'
          report_quota: number
          reports_used: number
          contract_start: string
          contract_end: string | null
          custom_branding: boolean
          api_access: boolean
          api_key: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_name: string
          contract_type: 'monthly' | 'annual' | 'custom'
          report_quota: number
          reports_used?: number
          contract_start: string
          contract_end?: string | null
          custom_branding?: boolean
          api_access?: boolean
          api_key?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_name?: string
          contract_type?: 'monthly' | 'annual' | 'custom'
          report_quota?: number
          reports_used?: number
          contract_start?: string
          contract_end?: string | null
          custom_branding?: boolean
          api_access?: boolean
          api_key?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}