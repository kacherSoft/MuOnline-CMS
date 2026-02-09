# MuCMS Database Documentation

## Overview

MuCMS connects to a MuOnline Season 19.2 database (MySQL 8.0) to manage player accounts, characters, guilds, and game data.

## Database Connection

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | Database host | `mysql` (Docker) or IP address |
| `DB_PORT` | Database port | `3306` |
| `DB_USER` | Database user | `root` or dedicated user |
| `DB_PASSWORD` | Database password | Secure password |
| `DB_NAME` | Database name | `muonline` |

### Local Docker Testing

```bash
# Start MySQL with production-like settings
docker-compose -f docker-compose.local.yml up -d mysql

# Connect to MySQL
mysql -h 127.0.0.1 -P 3307 -u root -p29051101 muonline
```

### External Database Connection

For connecting to an external MuOnline database server (production):

```bash
# Environment variables for external database
DB_HOST=180.93.42.237        # External database IP/hostname
DB_PORT=3306
DB_USER=mucms               # Dedicated database user
DB_PASSWORD=secure_password # Database user password
DB_NAME=muonline
```

**Connection from Docker:**
When running MuCMS in Docker and connecting to an external database, ensure:
1. The external database allows remote connections from your Docker host IP
2. Firewall rules permit MySQL port 3306
3. Database user has proper host access (`mucms@%` or specific IP)

**Test external database connection:**
```bash
# From host machine
mysql -h 180.93.42.237 -P 3306 -u mucms -p muonline

# From within Docker container
docker exec -it mucms-app sh
ping -c 3 180.93.42.233  # Test network connectivity
```

## Database Tables

### Core Tables

#### `Character`
Stores all player character data.

| Column | Type | Description |
|--------|------|-------------|
| `Name` | varchar(10) | Character name (unique) |
| `AccountId` | varchar(10) | Associated account |
| `Class` | tinyint | Character class (0-7) |
| `cLevel` | int | Character level |
| `Experience` | bigint | Current experience |
| `Strength` | int | Strength stat |
| `Dexterity` | int | Dexterity stat |
| `Vitality` | int | Vitality stat |
| `Energy` | int | Energy stat |
| `Leadership` | int | Leadership stat (DL only) |
| `Resets` | int | Number of resets |
| `Money` | bigint | Zen (currency) |
| `PkLevel` | int | Player killer level |
| `ConnectStat` | tinyint | Online status (0=offline, 1=online) |
| `MapNumber` | smallint | Current map |
| `MapX` | int | X coordinate |
| `MapY` | int | Y coordinate |

**Usage in MuCMS:**
- Rankings display (Level + Resets)
- Player search
- Character management
- Online status tracking

#### `Guild`
Stores guild information.

| Column | Type | Description |
|--------|------|-------------|
| `G_Name` | varchar(10) | Guild name (unique) |
| `G_Master` | varchar(10) | Guild master character |
| `G_Score` | int | Guild score (GvG wins) |
| `G_Level` | smallint | Guild level |
| `G_Mark` | varbinary(32) | Guild emblem |

**Usage in MuCMS:**
- Guild rankings
- Guild information display

#### `GuildMember`
Maps characters to guilds.

| Column | Type | Description |
|--------|------|-------------|
| `Name` | varchar(10) | Character name |
| `G_Name` | varchar(10) | Guild name |

**Usage in MuCMS:**
- Calculating guild member count
- Guild membership queries

#### `MEMB_INFO`
Stores account/member information.

| Column | Type | Description |
|--------|------|-------------|
| `memb___id` | varchar(10) | Account username |
| `memb__pwd` | varbinary(16) | Password hash |
| `memb_name` | varchar(20) | Real name |
| `mail_addr` | varchar(50) | Email address |
| `tel__numb` | varchar(20) | Phone number |
| `fpas_ques` | varchar(50) | Security question |
| `fpas_answ` | varchar(50) | Security answer |
| `bloc_code` | varchar(10) | Block code (ban status) |
| `IsUse` | tinyint | Account active (1) or blocked (0) |
| `IsVirgin` | tinyint | First login flag |

**Usage in MuCMS:**
- User authentication
- Account registration
- Password verification (SHA256 legacy, bcrypt for new)

#### `AccountCharacter`
Maps accounts to their characters.

| Column | Type | Description |
|--------|------|-------------|
| `Id` | int | Auto-increment ID |
| `AccountId` | varchar(10) | Account username |
| `GameID1` - `GameID5` | varchar(10) | Character names (max 5 per account) |
| `ServerCode` | tinyint | Server code |

**Usage in MuCMS:**
- Listing account characters
- Character slot management

### Additional Tables

#### `PvPStats` (Optional)
Custom table for PvP rankings if using a dedicated PvP system.

| Column | Type | Description |
|--------|------|-------------|
| `CharName` | varchar(10) | Character name |
| `Wins` | int | PvP wins |
| `Losses` | int | PvP losses |

#### `ExtShipData` (Alternative)
Alternative PvP data source (legacy MuOnline table).

| Column | Type | Description |
|--------|------|-------------|
| `AccountID` | varchar(10) | Account ID |
| `Wins` | int | PvP wins |
| `Losses` | int | PvP losses |

## Character Classes

| Value | Class Name |
|-------|------------|
| 0 | Dark Knight |
| 1 | Dark Wizard |
| 2 | Fairy Elf |
| 3 | Magic Gladiator |
| 4 | Dark Lord |
| 5 | Summoner (Season 6+) |
| 6 | Rage Fighter (Season 6+) |
| 7 | Grow Lancer (Season 10+) |

## Database Queries

### Rankings

#### Individual Ranking
```sql
SELECT Name, Class, cLevel, Resets, Strength, Dexterity, Vitality, Energy
FROM Character
WHERE Name IS NOT NULL AND Name != ''
ORDER BY Resets DESC, cLevel DESC
LIMIT 100;
```

#### Guild Ranking
```sql
SELECT
  G_Name,
  G_Master,
  G_Score,
  G_Level,
  (SELECT COUNT(*) FROM GuildMember WHERE G_Name = g.G_Name) as MemberCount
FROM Guild g
WHERE G_Name IS NOT NULL AND G_Name != ''
ORDER BY G_Score DESC, G_Level DESC
LIMIT 100;
```

#### Player Search
```sql
SELECT Name, AccountId, Class, cLevel, Resets, ConnectStat
FROM Character
WHERE Name LIKE '%search_term%'
LIMIT 20;
```

### Authentication

#### Verify Login (SHA256 Legacy)
```sql
SELECT memb___id, memb_name, mail_addr, bloc_code, IsUse
FROM MEMB_INFO
WHERE memb___id = ?
  AND memb__pwd = HASHBYTES('SHA1', ?);  -- MuOnline uses SHA1 for passwords
```

#### Register Account
```sql
INSERT INTO MEMB_INFO (memb___id, memb__pwd, memb_name, mail_addr, bloc_code, IsUse)
VALUES (?, ?, ?, ?, '0', 1);
```

## Database Permissions

### Required Permissions

For MuCMS to function, the database user needs:

```sql
-- Read permissions
SELECT ON muonline.Character;
SELECT ON muonline.Guild;
SELECT ON muonline.GuildMember;
SELECT ON muonline.MEMB_INFO;
SELECT ON muonline.AccountCharacter;
SELECT ON muonline.PvPStats;

-- Write permissions (for registration)
INSERT ON muonline.MEMB_INFO;
UPDATE ON muonline.MEMB_INFO;
```

### Create Dedicated User (Recommended)

```sql
-- Create database user
CREATE USER 'mucms'@'%' IDENTIFIED BY 'secure_password_here';

-- Grant permissions
GRANT SELECT ON muonline.Character TO 'mucms'@'%';
GRANT SELECT ON muonline.Guild TO 'mucms'@'%';
GRANT SELECT ON muonline.GuildMember TO 'mucms'@'%';
GRANT SELECT, INSERT, UPDATE ON muonline.MEMB_INFO TO 'mucms'@'%';
GRANT SELECT ON muonline.AccountCharacter TO 'mucms'@'%';
GRANT SELECT ON muonline.PvPStats TO 'mucms'@'%';

FLUSH PRIVILEGES;
```

## Indexes

### Recommended Indexes

For optimal performance, ensure these indexes exist:

```sql
-- Character table
CREATE INDEX idx_character_level ON Character(cLevel DESC, Resets DESC);
CREATE INDEX idx_character_account ON Character(AccountId);
CREATE INDEX idx_character_name ON Character(Name);
CREATE INDEX idx_character_online ON Character(ConnectStat);

-- Guild table
CREATE INDEX idx_guild_score ON Guild(G_Score DESC, G_Level DESC);

-- MEMB_INFO table
CREATE INDEX idx_memb_id ON MEMB_INFO(memb___id);

-- GuildMember table
CREATE INDEX idx_guildmember_name ON GuildMember(G_Name);
```

## Connection Pool Configuration

MuCMS uses a connection pool with these defaults:

| Setting | Value | Description |
|---------|-------|-------------|
| `connectionLimit` | 10 | Max concurrent connections |
| `connectTimeout` | 10000 | Connection timeout (ms) |
| `acquireTimeout` | 60000 | Acquire timeout (ms) |
| `timeout` | 60000 | Query timeout (ms) |

Configure via environment:

```env
DB_POOL_SIZE=20
DB_CONNECTION_TIMEOUT=15000
DB_QUERY_TIMEOUT=30000
```

## Troubleshooting

### Common Issues

#### Connection Refused
- Verify MySQL is running: `docker ps | grep mysql`
- Check port mapping: `- "3307:3306"`
- Verify credentials in `.env`

#### Access Denied
- Check DB_USER and DB_PASSWORD match
- Verify user has required permissions
- For local Docker: use `root` / `29051101`

#### Slow Queries
- Add missing indexes (see above)
- Check connection pool size
- Enable slow query log for debugging

#### Character Not Found
- Verify Character table has data
- Check Name is not NULL/empty
- Ensure correct database/collation (utf8mb4)

## Backup & Restore

### Backup Database

```bash
# Full backup
mysqldump -h 127.0.0.1 -P 3307 -u root -p29051101 \
  --single-transaction --routines --triggers \
  muonline > muonline_backup_$(date +%Y%m%d).sql

# Backup specific tables
mysqldump -h 127.0.0.1 -P 3307 -u root -p29051101 \
  muonline Character Guild MEMB_INFO > tables_backup.sql
```

### Restore Database

```bash
mysql -h 127.0.0.1 -P 3307 -u root -p29051101 \
  muonline < muonline_backup_20250101.sql
```

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit `.env` files** to version control
2. **Use strong passwords** for database users (min 32 chars)
3. **Limit database user permissions** to only what's needed
4. **Use SSL/TLS** for remote database connections
5. **Regular backups** with encryption at rest
6. **Monitor access logs** for suspicious activity
7. **Keep MySQL updated** for security patches

## Migration Notes

When migrating from development to production:

1. Update `DB_HOST` to production server IP
2. Change `DB_USER` from `root` to dedicated user
3. Set strong `DB_PASSWORD` (32+ chars)
4. Update `DB_NAME` if using different schema
5. Configure `REDIS_HOST` and `REDIS_PASSWORD`
6. Set `NODE_ENV=production`
7. Test database connection before going live

## References

- [MuOnline Database Schema](https://forum.ragezone.com/f197/)
- [MySQL 8.0 Documentation](https://dev.mysql.com/doc/refman/8.0/en/)
- [Docker MySQL Image](https://hub.docker.com/_/mysql)
