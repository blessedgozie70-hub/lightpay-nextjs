-- LightPay database schema (MySQL 8+)
-- Run from the project root after creating the database user:
-- mysql -u root -p < database/schema.sql
-- This schema is for a future backend integration. The current UI uses mock data.

CREATE DATABASE IF NOT EXISTS lightpay
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE lightpay;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(24) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wallets (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL UNIQUE,
  currency CHAR(3) NOT NULL DEFAULT 'NGN',
  balance_minor BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_wallet_user FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
  CONSTRAINT chk_wallet_nonnegative CHECK (balance_minor >= 0)
);

CREATE TABLE IF NOT EXISTS transactions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  public_reference VARCHAR(40) NOT NULL UNIQUE,
  user_id BIGINT UNSIGNED NOT NULL,
  transaction_type ENUM('transfer','deposit','airtime','data','electricity','bill','card') NOT NULL,
  direction ENUM('debit','credit') NOT NULL,
  amount_minor BIGINT NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'NGN',
  status ENUM('pending','successful','failed','reversed') NOT NULL DEFAULT 'pending',
  description VARCHAR(255) NULL,
  recipient_name VARCHAR(120) NULL,
  recipient_account_masked VARCHAR(32) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_transaction_user FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_transactions_user_date (user_id, created_at),
  INDEX idx_transactions_status (status),
  CONSTRAINT chk_transaction_amount_positive CHECK (amount_minor > 0)
);

CREATE TABLE IF NOT EXISTS audit_events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NULL,
  event_type VARCHAR(80) NOT NULL,
  metadata JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_audit_events_date (created_at)
);
