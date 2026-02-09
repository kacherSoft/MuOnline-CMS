-- ============================================================
-- MuCMS - MySQL Initialization Script
-- ============================================================
-- Creates test data for MuOnline Season 19.2 CMS
-- This script runs automatically when MySQL container starts

-- Create Character table (if not exists)
CREATE TABLE IF NOT EXISTS Character (
  Name varchar(10) NOT NULL,
  AccountID varchar(10) DEFAULT NULL,
  Class tinyint unsigned DEFAULT NULL,
  cLevel smallint DEFAULT 0,
  cExp bigint DEFAULT 0,
  Strength int DEFAULT 0,
  Dexterity int DEFAULT 0,
  Vitality int DEFAULT 0,
  Energy int DEFAULT 0,
  Leadership int DEFAULT 0,
  Resets int DEFAULT 0,
  PKCount int DEFAULT 0,
  PRIMARY KEY (Name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Guild table (if not exists)
CREATE TABLE IF NOT EXISTS Guild (
  G_Name varchar(50) NOT NULL,
  G_Master varchar(10) DEFAULT NULL,
  G_Score bigint DEFAULT 0,
  G_Count int DEFAULT 0,
  PRIMARY KEY (G_Name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Account table (if not exists) for CMS authentication
CREATE TABLE IF NOT EXISTS MEMB_INFO (
  memb___id INT IDENTITY(1,1) NOT NULL,
  memb___guid varchar(50) NOT NULL UNIQUE,
  memb___id varchar(50) NOT NULL,
  memb__pwd varchar(50) NOT NULL,
  memb_name varchar(50) NOT NULL,
  mail_addr varchar(50) NOT NULL,
  bloc_code varchar(50) NOT NULL,
  sno__numb varchar(50) NOT NULL,
  post__numb varchar(50) NOT NULL,
  fpas_ques varchar(50) NOT NULL,
  job__code varchar(50) NOT NULL,
  appl__days varchar(50) NOT NULL,
  modi__days varchar(50) NOT NULL,
  out__days varchar(50) NOT NULL,
  true__days varchar(50) NOT NULL,
  memb__pwd varchar(50) NOT NULL,
  isGameMaster BIT DEFAULT 0,
  PRIMARY KEY (memb___id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create chat_messages table (if not exists)
CREATE TABLE IF NOT EXISTS chat_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  character_name VARCHAR(50),
  message TEXT NOT NULL,
  message_type ENUM('text', 'image', 'system') DEFAULT 'text',
  channel VARCHAR(50) DEFAULT 'global',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_channel_created (channel, created_at),
  INDEX idx_account_id (account_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create admin_audit_log table (if not exists)
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  admin_account_id INT NOT NULL,
  action VARCHAR(50) NOT NULL,
  target_type VARCHAR(50),
  target_id VARCHAR(50),
  details TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_admin_action (admin_account_id, action, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Insert Test Data
-- ============================================================

-- Insert test accounts (passwords will be hashed by bcrypt)
INSERT IGNORE INTO MEMB_INFO (memb___guid, memb___id, memb__pwd, memb_name, mail_addr, bloc_code, sno__numb, post__numb, fpas_ques, job__code, appl__days, modi__days, out__days, true__days, isGameMaster) VALUES
('test-guid-1', 'testuser1', 'test123', 'TestUser1', 'test1@example.com', '0', '123456789', '123456', 'password', '0', '2024-01-01', '2024-01-01', '2024-01-01', '2024-01-01', 0),
('test-guid-2', 'testuser2', 'test123', 'TestUser2', 'test2@example.com', '0', '123456789', '123456', 'password', '0', '2024-01-01', '2024-01-01', '2024-01-01', '2024-01-01', 1),
('test-guid-admin', 'admin', 'admin123', 'Admin', 'admin@mucms.com', '0', '123456789', '123456', 'password', '0', '2024-01-01', '2024-01-01', '2024-01-01', '2024-01-01', 1);

-- Insert test characters
INSERT IGNORE INTO Character (Name, AccountID, Class, cLevel, Resets, Strength, Dexterity, Vitality, Energy, Leadership, PKCount) VALUES
('DarkKnight01', 'test-guid-1', 16, 400, 15, 5000, 3000, 5000, 2000, 100, 5),
('DarkWizard01', 'test-guid-1', 2, 400, 20, 200, 5000, 3000, 5000, 50, 3),
('FairyElf01', 'test-guid-1', 32, 400, 10, 3000, 3000, 2000, 2000, 200, 8),
('MagicGL01', 'test-guid-1', 48, 400, 12, 4000, 4000, 3000, 3000, 150, 4),
('DarkLord01', 'test-guid-1', 64, 400, 18, 5000, 3000, 5000, 2000, 500, 6);

-- Insert test guild
INSERT IGNORE INTO Guild (G_Name, G_Master, G_Score, G_Count) VALUES
('TestGuild', 'DarkKnight01', 10000, 5);

-- Insert some test chat messages
INSERT IGNORE INTO chat_messages (account_id, character_name, message, channel, message_type) VALUES
(1, 'DarkKnight01', 'Welcome to MuCMS chat!', 'global', 'text'),
(2, 'DarkWizard01', 'Hello everyone!', 'global', 'text'),
(1, 'DarkKnight01', 'Looking for guild members', 'global', 'text');

-- ============================================================
-- Create stored procedure for character name lookup
-- ============================================================
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS GetCharacterByName(IN charName VARCHAR(10))
BEGIN
  SELECT * FROM Character WHERE Name = charName;
END //
DELIMITER ;
