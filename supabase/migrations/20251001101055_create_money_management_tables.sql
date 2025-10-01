/*
  # Money Management App Database Schema

  ## Overview
  Creates the database structure for a money management application that tracks
  transactions, user settings, and financial goals.

  ## New Tables
  
  ### `user_settings`
  Stores user preferences and financial settings:
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid) - References auth.users (for future auth implementation)
  - `initial_balance` (decimal) - Starting balance amount
  - `monthly_budget` (decimal) - Monthly spending budget
  - `savings_goal` (decimal) - Target savings amount
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `transactions`
  Stores all income and expense transactions:
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid) - References auth.users (for future auth implementation)
  - `type` (text) - Transaction type: 'income' or 'expense'
  - `category` (text) - Transaction category
  - `amount` (decimal) - Transaction amount
  - `description` (text) - Optional transaction description
  - `transaction_date` (timestamptz) - Date of transaction
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable RLS on all tables
  - Currently allow public access (no auth required)
  - Policies can be updated later when authentication is added

  ## Notes
  - All monetary values use decimal type for precision
  - Timestamps default to current time
  - Tables are designed to support future multi-user authentication
*/

-- Create user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT gen_random_uuid(),
  initial_balance decimal(10,2) DEFAULT 1000.00,
  monthly_budget decimal(10,2) DEFAULT 2000.00,
  savings_goal decimal(10,2) DEFAULT 5000.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('income', 'expense')),
  category text NOT NULL,
  amount decimal(10,2) NOT NULL CHECK (amount > 0),
  description text DEFAULT '',
  transaction_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no auth required for now)
CREATE POLICY "Allow public read access to user_settings"
  ON user_settings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access to user_settings"
  ON user_settings FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access to user_settings"
  ON user_settings FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to transactions"
  ON transactions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access to transactions"
  ON transactions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to transactions"
  ON transactions FOR DELETE
  TO public
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);

-- Insert default settings for initial user
INSERT INTO user_settings (initial_balance, monthly_budget, savings_goal)
VALUES (1000.00, 2000.00, 5000.00);