-- MariaDB dump 10.19  Distrib 10.11.6-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: muonline
-- ------------------------------------------------------
-- Server version	10.11.6-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account_buff`
--

DROP TABLE IF EXISTS `account_buff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_buff` (
  `account_id` int(10) unsigned NOT NULL,
  `buff` smallint(5) unsigned NOT NULL,
  `effect_1` tinyint(3) unsigned NOT NULL,
  `value_1` int(11) NOT NULL,
  `effect_2` tinyint(3) unsigned NOT NULL,
  `value_2` int(11) NOT NULL,
  `effect_3` tinyint(3) unsigned NOT NULL,
  `value_3` int(11) NOT NULL,
  `duration` bigint(20) NOT NULL,
  `flags` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`account_id`,`buff`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_buff`
--

LOCK TABLES `account_buff` WRITE;
/*!40000 ALTER TABLE `account_buff` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_buff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_cash_shop_gift`
--

DROP TABLE IF EXISTS `account_cash_shop_gift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_cash_shop_gift` (
  `account_id` int(10) unsigned NOT NULL,
  `product` int(10) unsigned NOT NULL,
  `option` int(10) unsigned NOT NULL,
  `serial` int(10) unsigned NOT NULL,
  `serial_cash_shop` int(10) unsigned NOT NULL,
  `server` smallint(5) unsigned NOT NULL,
  `date` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_cash_shop_gift`
--

LOCK TABLES `account_cash_shop_gift` WRITE;
/*!40000 ALTER TABLE `account_cash_shop_gift` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_cash_shop_gift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_cash_shop_item`
--

DROP TABLE IF EXISTS `account_cash_shop_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_cash_shop_item` (
  `account_id` int(10) unsigned NOT NULL,
  `product` int(10) unsigned NOT NULL,
  `option` int(10) unsigned NOT NULL,
  `serial` int(10) unsigned NOT NULL,
  `serial_cash_shop` int(10) unsigned NOT NULL,
  `server` smallint(5) unsigned NOT NULL,
  `gift` tinyint(3) unsigned NOT NULL,
  `date` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_cash_shop_item`
--

LOCK TABLES `account_cash_shop_item` WRITE;
/*!40000 ALTER TABLE `account_cash_shop_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_cash_shop_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_data`
--

DROP TABLE IF EXISTS `account_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_data` (
  `account_id` int(10) unsigned NOT NULL,
  `vip_status` int(11) DEFAULT -1,
  `vip_duration` bigint(20) DEFAULT NULL,
  `expanded_warehouse` tinyint(3) unsigned DEFAULT NULL,
  `expanded_warehouse_time` bigint(20) DEFAULT NULL,
  `special_character` smallint(5) unsigned DEFAULT NULL,
  `credits` int(10) unsigned DEFAULT NULL,
  `web_credits` int(10) unsigned DEFAULT NULL,
  `current_character` int(10) unsigned DEFAULT NULL,
  `current_type` tinyint(3) unsigned DEFAULT NULL,
  `current_ip` varchar(16) DEFAULT NULL,
  `current_mac` varchar(50) DEFAULT NULL,
  `current_diskserial` int(10) unsigned DEFAULT NULL,
  `current_server` smallint(5) unsigned DEFAULT NULL,
  `cash_shop_discount_wc` tinyint(3) unsigned DEFAULT NULL,
  `cash_shop_discount_gp` tinyint(3) unsigned DEFAULT NULL,
  `cash_shop_discount_date` bigint(20) DEFAULT NULL,
  `goblin_points` int(11) DEFAULT NULL,
  PRIMARY KEY (`account_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_data`
--

LOCK TABLES `account_data` WRITE;
/*!40000 ALTER TABLE `account_data` DISABLE KEYS */;
INSERT INTO `account_data` VALUES
(3,-1,0,0,0,0,0,NULL,17,0,'123.21.159.233','F4:6D:3F:58:E4:76',240554067,65535,NULL,NULL,NULL,0),
(7,-1,NULL,0,0,NULL,NULL,NULL,NULL,NULL,'123.21.159.233','F4:6D:3F:58:E4:76',240554067,0,NULL,NULL,NULL,NULL),
(11,-1,0,0,0,0,0,NULL,20,0,'14.224.205.202','22:33:6C:06:02:97',416340047,0,NULL,NULL,NULL,0),
(12,-1,0,0,0,0,0,NULL,21,0,'14.224.205.202','22:33:6C:06:02:97',416340047,65535,NULL,NULL,NULL,0),
(13,-1,0,0,0,0,0,NULL,22,0,'117.5.143.69','22:09:6C:12:01:F5',175255183,65535,NULL,NULL,NULL,0),
(14,-1,0,0,0,0,0,NULL,28,0,'117.5.143.69','22:09:6C:12:01:F5',175255183,65535,NULL,NULL,NULL,0),
(15,-1,0,0,0,0,0,NULL,23,0,'42.115.187.154','88:88:88:88:87:88',3328758611,65535,NULL,NULL,NULL,0),
(17,-1,0,0,0,0,0,NULL,26,0,'104.164.168.7','22:24:6C:05:00:93',3711409074,65535,NULL,NULL,NULL,0),
(18,-1,0,0,0,0,0,NULL,24,0,'14.224.205.202','22:33:6C:06:02:97',416340047,65535,NULL,NULL,NULL,0),
(20,-1,0,0,0,0,0,NULL,25,0,'42.115.187.154','88:88:88:88:87:88',3328758611,65535,NULL,NULL,NULL,0),
(21,-1,0,0,0,0,0,NULL,27,0,'1.53.191.123','D8:9E:F3:47:67:F4',3197848855,65535,NULL,NULL,NULL,0),
(22,-1,0,0,0,0,0,NULL,29,0,'42.115.187.154','88:88:88:88:87:88',3328758611,65535,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `account_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_warehouse`
--

DROP TABLE IF EXISTS `account_warehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_warehouse` (
  `uid` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20) NOT NULL,
  `warehouse_id` tinyint(4) DEFAULT 0,
  `money` bigint(20) DEFAULT NULL,
  `password` bigint(20) unsigned DEFAULT NULL,
  `expanded` tinyint(4) DEFAULT 0,
  `expandedtime` bigint(20) DEFAULT 0,
  `inventory` varbinary(55000) DEFAULT NULL,
  `gremory_case_acc` varbinary(10000) DEFAULT NULL,
  `wingcoreinventory` text DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `account_warehouse_unique` (`account_id`,`warehouse_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_warehouse`
--

LOCK TABLES `account_warehouse` WRITE;
/*!40000 ALTER TABLE `account_warehouse` DISABLE KEYS */;
INSERT INTO `account_warehouse` VALUES
(29,20,0,0,0,0,0,'ezA7NDExMzswOzMxODI7MDswOzgwOzA7MDsxOzE7MzE7MDswOzA7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7MjU1OzA7MDswOzA7MDswOzA7MDswOzI1NTsyNTU7MjU1OzI1NTsyNTU7MjU1OzA7MDsyNTQ7MjU0OzI1NDsyNTR9LHsyOzQ2MzU7MDszNzgxOzA7MDs3MDswOzA7MTsxOzMyOzA7MDswOzY1NTM1OzY1NTM1OzY1NTM1OzY1NTM1OzY1NTM1OzI1NTswOzA7MDswOzA7MDswOzA7MDsyNTU7MjU1OzI1NTsyNTU7MjU1OzI1NTswOzA7MjU0OzI1NDsyNTQ7MjU0fSx7NDsyNTgyOzA7MzgxMzswOzA7NjU7MDswOzE7MTs4OzA7MDswOzY1NTM1OzY1NTM1OzY1NTM1OzY1NTM1OzY1NTM1OzI1NTswOzA7MDswOzA7MDswOzA7MDsyNTU7MjU1OzI1NTsyNTU7MjU1OzI1NTswOzA7MjU0OzI1NDsyNTQ7MjU0fSx7NTsyNTgyOzA7Mzc5NTswOzA7NjU7MDswOzE7MTszMjswOzA7MDs2NTUzNTs2NTUzNTs2NTUzNTs2NTUzNTs2NTUzNTsyNTU7MDswOzA7MDswOzA7MDswOzA7MjU1OzI1NTsyNTU7MjU1OzI1NTsyNTU7MDswOzI1NDsyNTQ7MjU0OzI1NH0sezY7NDE1NTswOzEwNjYxOzA7MDs1MjswOzA7MTsxOzU5OzA7MDswOzY1NTM1OzY1NTM1OzY1NTM1OzY1NTM1OzY1NTM1OzI1NTswOzA7MDswOzA7MDswOzA7MDsyNTU7MjU1OzI1NTsyNTU7MjU1OzI1NTswOzA7MjU0OzI1NDsyNTQ7MjU0fSw=','',''),
(30,13,0,0,0,0,0,'ezA7NjcxNjswOzI4MzE7MDswOzA7MDswOzA7MDswOzA7MDswOzY1NTM1OzY1NTM1OzY1NTM1OzY1NTM1OzY1NTM1OzI1NTswOzA7MDswOzA7MDswOzA7MDsyNTU7MjU1OzI1NTsyNTU7MjU1OzI1NTswOzA7MjU0OzI1NDsyNTQ7MjU0fSx7Mzs3Mjc5OzA7OTA2MjswOzA7MTswOzA7MDswOzA7MDswOzA7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7MjU1OzA7MDswOzA7MDswOzA7MDswOzI1NTsyNTU7MjU1OzI1NTsyNTU7MjU1OzA7MDsyNTQ7MjU0OzI1NDsyNTR9LHs1OzY2NzA7MDs2ODk4OzA7MDswOzA7MDswOzA7MDswOzA7MDs2NTUzNTs2NTUzNTs2NTUzNTs2NTUzNTs2NTUzNTsyNTU7MDswOzA7MDswOzA7MDswOzA7MjU1OzI1NTsyNTU7MjU1OzI1NTsyNTU7MDswOzI1NDsyNTQ7MjU0OzI1NH0s','',''),
(31,22,0,0,0,0,0,'ezA7MzYwMTswOzEwMTQxOzA7MDs4MDswOzA7MTsxOzQ7MDswOzA7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7MjU1OzA7MDswOzA7MDswOzA7MDswOzI1NTsyNTU7MjU1OzI1NTsyNTU7MjU1OzA7MDsyNTQ7MjU0OzI1NDsyNTR9LHs0OzIwNjU7MDsxMDE1NDswOzA7NzY7MDsxOzE7MTs3OzA7MDswOzY1NTM1OzY1NTM1OzY1NTM1OzY1NTM1OzY1NTM1OzI1NTswOzA7MDswOzA7MDswOzA7MDsyNTU7MjU1OzI1NTsyNTU7MjU1OzI1NTswOzA7MjU0OzI1NDsyNTQ7MjU0fSx7NTs2MTU5OzA7MTAxODQ7MDswOzM7MDswOzA7MDswOzA7MDswOzY1NTM1OzY1NTM1OzY1NTM1OzY1NTM1OzY1NTM1OzI1NTswOzA7MDswOzA7MDswOzA7MDsyNTU7MjU1OzI1NTsyNTU7MjU1OzI1NTswOzI1NTsyNTQ7MjU0OzI1NDsyNTR9LHs3OzE2OzA7MTAxODI7MDswOzg0OzA7MTsxOzE7MzI7MDswOzA7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7MjU1OzA7MDswOzA7MDswOzA7MDswOzI1NTsyNTU7MjU1OzI1NTsyNTU7MjU1OzA7MDsyNTQ7MjU0OzI1NDsyNTR9LHsxNjsxNjswOzEwMjMyOzA7MDs4NDswOzE7MTsxOzEwOzA7MDswOzY1NTM1OzY1NTM1OzY1NTM1OzY1NTM1OzY1NTM1OzI1NTswOzA7MDswOzA7MDswOzA7MDsyNTU7MjU1OzI1NTsyNTU7MjU1OzI1NTswOzA7MjU0OzI1NDsyNTQ7MjU0fSx7MTc7MjU4MjswOzEwMjE5OzA7MDs2NTswOzA7MTsxOzc7MDswOzA7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7MjU1OzA7MDswOzA7MDswOzA7MDswOzI1NTsyNTU7MjU1OzI1NTsyNTU7MjU1OzA7MDsyNTQ7MjU0OzI1NDsyNTR9LHsyMTszMDg3OzA7MTAyMDg7MDswOzU1OzA7MDsxOzE7NTY7MDswOzA7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7MjU1OzA7MDswOzA7MDswOzA7MDswOzI1NTsyNTU7MjU1OzI1NTsyNTU7MjU1OzA7MDsyNTQ7MjU0OzI1NDsyNTR9LHsyNjsyNTgyOzA7MTAxNDA7MDswOzY1OzA7MDsxOzE7NDswOzA7MDs2NTUzNTs2NTUzNTs2NTUzNTs2NTUzNTs2NTUzNTsyNTU7MDswOzA7MDswOzA7MDswOzA7MjU1OzI1NTsyNTU7MjU1OzI1NTsyNTU7MDswOzI1NDsyNTQ7MjU0OzI1NH0sezMzOzIwNjU7MDsxMDI2MjswOzA7NzY7MDsxOzE7MTs0MDswOzA7MDs2NTUzNTs2NTUzNTs2NTUzNTs2NTUzNTs2NTUzNTsyNTU7MDswOzA7MDswOzA7MDswOzA7MjU1OzI1NTsyNTU7MjU1OzI1NTsyNTU7MDswOzI1NDsyNTQ7MjU0OzI1NH0sezM1OzM2MDM7MDsxMDIzMzswOzA7NzQ7MDswOzE7MTszNjswOzA7MDs2NTUzNTs2NTUzNTs2NTUzNTs2NTUzNTs2NTUzNTsyNTU7MDswOzA7MDswOzA7MDswOzA7MjU1OzI1NTsyNTU7MjU1OzI1NTsyNTU7MDswOzI1NDsyNTQ7MjU0OzI1NH0sezM5OzI1Njk7MDsxMDY2MDswOzA7OTE7MDswOzE7MTsyMjswOzA7MDs2NTUzNTs2NTUzNTs2NTUzNTs2NTUzNTs2NTUzNTsyNTU7MDswOzA7MDswOzA7MDswOzA7MjU1OzI1NTsyNTU7MjU1OzI1NTsyNTU7MDswOzI1NDsyNTQ7MjU0OzI1NH0sezQ1OzU2NTE7MDsxMDI2MzswOzA7NzQ7MDswOzE7MTszOTswOzA7MDs2NTUzNTs2NTUzNTs2NTUzNTs2NTUzNTs2NTUzNTsyNTU7MDswOzA7MDswOzA7MDswOzA7MjU1OzI1NTsyNTU7MjU1OzI1NTsyNTU7MDswOzI1NDsyNTQ7MjU0OzI1NH0sezQ4OzIwNjU7MDsxMDYwNjswOzA7NzY7MDsxOzE7MTszMjswOzA7MDs2NTUzNTs2NTUzNTs2NTUzNTs2NTUzNTs2NTUzNTsyNTU7MDswOzA7MDswOzA7MDswOzA7MjU1OzI1NTsyNTU7MjU1OzI1NTsyNTU7MDswOzI1NDsyNTQ7MjU0OzI1NH0sezEwMjs0MTIzOzA7MTAxNTU7MDswOzcwOzA7MDsxOzE7Mzg7MDswOzA7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7MjU1OzA7MDswOzA7MDswOzA7MDswOzI1NTsyNTU7MjU1OzI1NTsyNTU7MjU1OzA7MDsyNTQ7MjU0OzI1NDsyNTR9LA==','',''),
(32,15,0,0,0,0,0,'ezA7NDYyODswOzEwMTgzOzA7MDs4MjswOzA7MTsxOzg7MDswOzA7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7MjU1OzA7MDswOzA7MDswOzA7MDswOzI1NTsyNTU7MjU1OzI1NTsyNTU7MjU1OzA7MDsyNTQ7MjU0OzI1NDsyNTR9LHsyOzE4OzA7MTAyNTk7MDsyOzg3OzA7MTsxOzE7NDA7MDswOzA7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7MjU1OzA7MDswOzA7MDswOzA7MDswOzI1NTsyNTU7MjU1OzI1NTsyNTU7MjU1OzA7MDsyNTQ7MjU0OzI1NDsyNTR9LHs0OzUxNDA7MDsxMDUyNDswOzA7ODI7MDswOzE7MTsyNjswOzA7MDs2NTUzNTs2NTUzNTs2NTUzNTs2NTUzNTs2NTUzNTsyNTU7MDswOzA7MDswOzA7MDswOzA7MjU1OzI1NTsyNTU7MjU1OzI1NTsyNTU7MDswOzI1NDsyNTQ7MjU0OzI1NH0sezY7NDExNjswOzEwNjI0OzA7MDs4MjswOzA7MTsxOzk7MDswOzA7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7NjU1MzU7MjU1OzA7MDswOzA7MDswOzA7MDswOzI1NTsyNTU7MjU1OzI1NTsyNTU7MjU1OzA7MDsyNTQ7MjU0OzI1NDsyNTR9LA==','','');
/*!40000 ALTER TABLE `account_warehouse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `guid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `blocked` tinyint(3) unsigned DEFAULT 0,
  `security_code` varchar(255) DEFAULT '0',
  `golden_channel` bigint(20) DEFAULT 1500434821,
  `facebook_status` tinyint(3) unsigned DEFAULT 0,
  `secured` tinyint(3) unsigned DEFAULT 1,
  `account` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `register` bigint(20) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `email_verified_at` datetime DEFAULT NULL,
  `web_admin` int(11) DEFAULT 0,
  `deletion_token` varchar(40) NOT NULL DEFAULT '0',
  `passlost_token` varchar(40) NOT NULL DEFAULT '0',
  `email_token` varchar(40) NOT NULL DEFAULT '0',
  `new_email` varchar(64) NOT NULL DEFAULT '0',
  `social_id` varchar(13) NOT NULL DEFAULT '0',
  `activated` int(11) DEFAULT 0,
  `DiscordDiscriminator` int(11) DEFAULT NULL,
  `DiscordAvatar` varchar(255) DEFAULT NULL,
  `DiscordId` int(11) DEFAULT NULL,
  `DiscordUsername` varchar(255) DEFAULT NULL,
  `DiscordEmail` varchar(255) DEFAULT NULL,
  `DiscordLogin` int(11) DEFAULT 0,
  `token` varchar(50) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `ip` varchar(20) DEFAULT NULL,
  `registration_token` varchar(40) DEFAULT NULL,
  `lock_token` varchar(40) DEFAULT NULL,
  `ban_time` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `creation_counter` smallint(6) DEFAULT 0,
  PRIMARY KEY (`guid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES
(3,0,'devemu',1500434821,0,1,'kacher','bb9e1281eec2d43a159d756998d4bb95c282b4f0d076c7720bd281f144035c82','badkacher@gmail.com',20260204221207,NULL,NULL,NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2026-02-04 23:59:59',0),
(4,0,'0',1500434821,0,1,'testuser001','$2a$10$xtX1TzpCdpq88Ey8WoqbteoJ1.L1tM4rLs6pvL8OpNb7PSBCOhQhC','test@example.com',1770269425,NULL,'2026-02-05 12:30:25',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0),
(5,0,'0',1500434821,0,1,'testuser999','$2a$10$p52cZHhADPhcKbN7z1u68ed3Z9DX6V3n5Y6mcfbQzUOT9nTIJjoxS',NULL,1770269518,NULL,'2026-02-05 12:31:58',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0),
(6,0,'0',1500434821,0,1,'testplayer123','b3c00436c40cd22425c533d93f47f01debcf90238568fe9101c3718b81f12b76','player@test.com',1770272672,NULL,'2026-02-05 13:24:32',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0),
(7,0,'0',1500434821,0,1,'tidieu246','29e124c503f2a9a035cbb8e134b1cd3d2caa347265aba2cd83666a532e2d7614',NULL,1770273184,NULL,'2026-02-05 13:33:04',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0),
(8,0,'0',1500434821,0,1,'testuser2','21ba2b031c100bf3dad04df5e21bdfeeb76d549e43145d6093859b67ce4267d0','test@test.com',1770284290,NULL,'2026-02-05 16:38:10',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0),
(9,0,'0',1500434821,0,1,'gmuser','12a8ba457cf946a7eb4fd3d598a804848b4a926e02ada2ed50da3667b32e00c8','gm@test.com',1770284374,NULL,'2026-02-05 16:39:34',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0),
(10,0,'0',1500434821,0,1,'badkacher','56f6eef2ca1d9e1c90d7017f7709128ae4e6264b9d22b6ed158989421f268b36',NULL,1770289654,NULL,'2026-02-05 18:07:34',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0),
(11,0,'0',1500434821,0,1,'atpmu01','26c68050e985c96219ea36d31ae57c766d49c9fa34929f4be95273b69f4fac77','atpmu01@gmail.com',1770375219,NULL,'2026-02-06 17:53:40',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2026-02-06 23:59:59',0),
(12,0,'0',1500434821,0,1,'atpmu02','5489996dc77de53e2b12a27472adf2ddd67216621aa7fb1ded875c53fea1fed0','atpmu02@gmail.com',1770375688,NULL,'2026-02-06 18:01:28',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2026-02-06 23:59:59',0),
(13,0,'0',1500434821,0,1,'atpmu03','a56769a38c6687df4190da3a14ab4b60263c0f19a70f69dffbef0204d044f461','atpmu03@gmail.com',1770376002,NULL,'2026-02-06 18:06:43',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2026-02-06 23:59:59',0),
(14,0,'0',1500434821,0,1,'atpmu04','c705e10a63e27fde5466d967b9fcc60962364f4c1429afbf13c14fdd2820bd97','atpmu04@gmail.com',1770376991,NULL,'2026-02-06 18:23:11',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2026-02-06 23:59:59',0),
(15,0,'0',1500434821,0,1,'anhhung','173ae86ff87d028c1cf6894360e6dfc3ac0542e36fe7cf09cb03ea3e491e44a6','anhhung6868@gmail.com',1770377807,NULL,'2026-02-06 18:36:47',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2026-02-06 23:59:59',0),
(16,0,'0',1500434821,0,1,'comfo1','d51937039d684e1e99720d3b4753e1ba1230b3724625f8b09b05224ac5aec1c5','lineage2m6668@gmail.com',1770377814,NULL,'2026-02-06 18:36:55',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0),
(17,0,'0',1500434821,0,1,'panda1','fb3f0a2dbe8e4d0822be7942433595cc403933c4fef0799ecbf6041155d28424','lineage2m6669@gmail.com',1770377892,NULL,'2026-02-06 18:38:13',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2026-02-06 23:59:59',0),
(18,0,'0',1500434821,0,1,'atpmu05','1dbd8270e010c81ad5b4f6aeb65dbd2c75ba1a852ace6db2076505a11196da1c','atpmu05@gmail.com',1770380274,NULL,'2026-02-06 19:17:55',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2026-02-06 23:59:59',0),
(19,0,'0',1500434821,0,1,'atpmu06','5c3786aad594aca1233601ed60dbaaa5fb6bc6233d538ce03c002244b45e64c1','atpmu06@gmail.com',1770381044,NULL,'2026-02-06 19:30:44',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0),
(20,0,'0',1500434821,0,1,'anhhung1','c917f9c6cafdecf888e015896353a64558c3baf40e157ffcc89b3f96ff702148','anhhung6869@gmail.com',1770381090,NULL,'2026-02-06 19:31:31',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2026-02-06 23:59:59',0),
(21,0,'0',1500434821,0,1,'micam123','18249c45bfc8db07df94a08d04bddf76d5ec9a0e45f4fc9631317aad11555d2c','micam1985@gmail.com',1770382256,NULL,'2026-02-06 19:50:56',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2026-02-06 23:59:59',0),
(22,0,'0',1500434821,0,1,'anhhung2','1e686315bab6d61c61d1d7b10903647807f092d4fe07c39c7adcc995cc06a454','anhhung6870@gmail.com',1770384598,NULL,'2026-02-06 20:29:58',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2026-02-06 23:59:59',0),
(23,0,'0',1500434821,0,1,'huybalet','48c2f787d40addc8292224030b00178ebbaa2fb0e660cff20c1433b7d9f91dc3','hoanghuy0985@gmail.com',1770403028,NULL,'2026-02-07 01:37:09',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0),
(24,0,'0',1500434821,0,1,'huybalet12','555ea8a63ac26b66d7e94eb0cda1494a8f3ba5d64d0c75a75c2a41c02678348d','hoanghuy0085@gmail.com',1770403467,NULL,'2026-02-07 01:44:27',NULL,0,'0','0','0','0','0',0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_allowed`
--

DROP TABLE IF EXISTS `accounts_allowed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_allowed` (
  `account_id` int(10) unsigned NOT NULL,
  `guid` int(10) unsigned DEFAULT NULL,
  `server` smallint(5) unsigned DEFAULT NULL,
  PRIMARY KEY (`account_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_allowed`
--

LOCK TABLES `accounts_allowed` WRITE;
/*!40000 ALTER TABLE `accounts_allowed` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_allowed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_banned`
--

DROP TABLE IF EXISTS `accounts_banned`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_banned` (
  `account_id` int(10) unsigned NOT NULL,
  `guid` int(10) unsigned DEFAULT NULL,
  `unban_date` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`account_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_banned`
--

LOCK TABLES `accounts_banned` WRITE;
/*!40000 ALTER TABLE `accounts_banned` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_banned` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_disconnect`
--

DROP TABLE IF EXISTS `accounts_disconnect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_disconnect` (
  `account_id` int(10) unsigned NOT NULL,
  `server` smallint(5) unsigned DEFAULT NULL,
  `masive` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`account_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_disconnect`
--

LOCK TABLES `accounts_disconnect` WRITE;
/*!40000 ALTER TABLE `accounts_disconnect` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_disconnect` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_security`
--

DROP TABLE IF EXISTS `accounts_security`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_security` (
  `account_id` int(10) unsigned NOT NULL,
  `account` varchar(255) DEFAULT NULL,
  `ip` varchar(16) DEFAULT NULL,
  `mac` varchar(50) DEFAULT NULL,
  `disk_serial` int(10) unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_security`
--

LOCK TABLES `accounts_security` WRITE;
/*!40000 ALTER TABLE `accounts_security` DISABLE KEYS */;
INSERT INTO `accounts_security` VALUES
(3,'kacher','123.21.159.233','F4:6D:3F:58:E4:76',240554067),
(3,'kacher','123.21.159.233','F4:6D:3F:58:E4:76',240554067),
(3,'kacher','123.21.159.233','F4:6D:3F:58:E4:76',240554067),
(7,'tidieu246','123.21.159.233','F4:6D:3F:58:E4:76',240554067),
(3,'kacher','123.21.159.233','F4:6D:3F:58:E4:76',240554067),
(11,'atpmu01','14.224.205.202','22:33:6C:06:02:97',416340047),
(11,'atpmu01','117.5.143.69','22:33:6C:06:02:97',416340047),
(12,'atpmu02','117.5.143.69','22:33:6C:06:02:97',416340047),
(13,'atpmu03','117.5.143.69','22:33:6C:06:02:97',416340047),
(13,'atpmu03','14.224.205.202','22:09:6C:12:01:F5',175255183),
(15,'anhhung','42.115.187.154','88:88:88:88:87:88',3328758611),
(13,'atpmu03','117.5.143.69','22:09:6C:12:01:F5',175255183),
(13,'atpmu03','14.224.205.202','22:09:6C:12:01:F5',175255183),
(11,'atpmu01','14.224.205.202','22:33:6C:06:02:97',416340047),
(12,'atpmu02','14.224.205.202','22:33:6C:06:02:97',416340047),
(15,'anhhung','42.115.187.154','88:88:88:88:87:88',3328758611),
(13,'atpmu03','117.5.143.69','22:09:6C:12:01:F5',175255183),
(13,'atpmu03','117.5.143.69','22:09:6C:12:01:F5',175255183),
(20,'anhhung1','42.115.187.154','88:88:88:88:87:88',3328758611),
(18,'atpmu05','14.224.205.202','22:33:6C:06:02:97',416340047),
(19,'atpmu06','14.224.205.202','22:33:6C:06:02:97',416340047),
(19,'atpmu06','14.224.205.202','22:33:6C:06:02:97',416340047),
(17,'panda1','104.164.168.7','22:24:6C:05:00:93',3711409074),
(17,'panda1','104.164.168.7','22:24:6C:05:00:93',3711409074),
(21,'micam123','1.53.191.123','D8:9E:F3:47:67:F4',3197848855),
(14,'atpmu04','117.5.143.69','22:09:6C:12:01:F5',175255183),
(22,'anhhung2','42.115.187.154','88:88:88:88:87:88',3328758611),
(15,'anhhung','42.115.187.154','88:88:88:88:87:88',3328758611),
(15,'anhhung','42.115.187.154','88:88:88:88:87:88',3328758611),
(11,'atpmu01','14.224.205.202','22:33:6C:06:02:97',416340047),
(15,'anhhung','42.115.187.154','88:88:88:88:87:88',3328758611),
(11,'atpmu01','14.224.205.202','22:33:6C:06:02:97',416340047);
/*!40000 ALTER TABLE `accounts_security` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_status`
--

DROP TABLE IF EXISTS `accounts_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_status` (
  `account_id` int(10) unsigned NOT NULL,
  `server_group` smallint(5) unsigned DEFAULT NULL,
  `current_server` smallint(5) unsigned DEFAULT NULL,
  `start_server` smallint(5) unsigned DEFAULT NULL,
  `dest_server` smallint(6) DEFAULT NULL,
  `dest_world` smallint(6) DEFAULT NULL,
  `dest_x` smallint(6) DEFAULT NULL,
  `dest_y` smallint(6) DEFAULT NULL,
  `warp_time` int(10) unsigned DEFAULT NULL,
  `warp_auth_1` int(10) unsigned DEFAULT NULL,
  `warp_auth_2` int(10) unsigned DEFAULT NULL,
  `warp_auth_3` int(10) unsigned DEFAULT NULL,
  `warp_auth_4` int(10) unsigned DEFAULT NULL,
  `last_ip` varchar(16) DEFAULT NULL,
  `last_mac` varchar(50) DEFAULT NULL,
  `last_online` varchar(255) DEFAULT NULL,
  `online` tinyint(4) DEFAULT NULL,
  `disk_serial` int(10) unsigned DEFAULT NULL,
  `type` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`account_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_status`
--

LOCK TABLES `accounts_status` WRITE;
/*!40000 ALTER TABLE `accounts_status` DISABLE KEYS */;
INSERT INTO `accounts_status` VALUES
(3,0,0,0,-1,-1,-1,-1,0,0,0,0,0,'123.21.159.233','F4:6D:3F:58:E4:76','2026-02-05 14:30:01',0,240554067,0),
(7,0,0,0,-1,-1,-1,-1,0,0,0,0,0,'123.21.159.233','F4:6D:3F:58:E4:76','2026-02-05 13:33:35',0,240554067,0),
(11,0,0,0,-1,-1,-1,-1,0,0,0,0,0,'14.224.205.202','22:33:6C:06:02:97','2026-02-07 11:38:14',1,416340047,0),
(12,0,0,0,-1,-1,-1,-1,0,0,0,0,0,'14.224.205.202','22:33:6C:06:02:97','2026-02-06 19:01:03',0,416340047,0),
(13,0,0,0,-1,-1,-1,-1,0,0,0,0,0,'117.5.143.69','22:09:6C:12:01:F5','2026-02-06 19:16:55',0,175255183,0),
(14,0,0,0,-1,-1,-1,-1,0,0,0,0,0,'117.5.143.69','22:09:6C:12:01:F5','2026-02-06 20:13:50',0,175255183,0),
(15,0,0,0,-1,-1,-1,-1,0,0,0,0,0,'42.115.187.154','88:88:88:88:87:88','2026-02-07 05:40:17',0,3328758611,0),
(17,0,0,0,-1,-1,-1,-1,0,0,0,0,0,'104.164.168.7','22:24:6C:05:00:93','2026-02-06 19:51:20',0,3711409074,0),
(18,0,0,0,-1,-1,-1,-1,0,0,0,0,0,'14.224.205.202','22:33:6C:06:02:97','2026-02-06 19:34:30',0,416340047,0),
(19,0,0,0,-1,-1,-1,-1,0,0,0,0,0,'14.224.205.202','22:33:6C:06:02:97','2026-02-06 19:36:54',0,416340047,0),
(20,0,0,0,-1,-1,-1,-1,0,0,0,0,0,'42.115.187.154','88:88:88:88:87:88','2026-02-06 19:33:49',0,3328758611,0),
(21,0,0,0,-1,-1,-1,-1,0,0,0,0,0,'1.53.191.123','D8:9E:F3:47:67:F4','2026-02-06 19:52:02',0,3197848855,0),
(22,0,0,0,-1,-1,-1,-1,0,0,0,0,0,'42.115.187.154','88:88:88:88:87:88','2026-02-06 20:30:37',0,3328758611,0);
/*!40000 ALTER TABLE `accounts_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_validation`
--

DROP TABLE IF EXISTS `accounts_validation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_validation` (
  `account_id` int(10) unsigned NOT NULL,
  `disk_serial` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`account_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_validation`
--

LOCK TABLES `accounts_validation` WRITE;
/*!40000 ALTER TABLE `accounts_validation` DISABLE KEYS */;
INSERT INTO `accounts_validation` VALUES
(3,240554067),
(7,240554067),
(11,416340047),
(12,416340047),
(13,416340047),
(14,175255183),
(15,3328758611),
(17,3711409074),
(18,416340047),
(19,416340047),
(20,3328758611),
(21,3197848855),
(22,3328758611);
/*!40000 ALTER TABLE `accounts_validation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_warning`
--

DROP TABLE IF EXISTS `accounts_warning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_warning` (
  `account_id` int(10) unsigned NOT NULL,
  `disk_serial` int(10) unsigned DEFAULT NULL,
  `block_date` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`account_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_warning`
--

LOCK TABLES `accounts_warning` WRITE;
/*!40000 ALTER TABLE `accounts_warning` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_warning` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arka_war_data`
--

DROP TABLE IF EXISTS `arka_war_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `arka_war_data` (
  `id` tinyint(3) unsigned NOT NULL,
  `guild` int(10) unsigned NOT NULL,
  `attribute` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`,`guild`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arka_war_data`
--

LOCK TABLES `arka_war_data` WRITE;
/*!40000 ALTER TABLE `arka_war_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `arka_war_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `block_diskserial`
--

DROP TABLE IF EXISTS `block_diskserial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `block_diskserial` (
  `disk_serial` int(10) unsigned NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`disk_serial`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `block_diskserial`
--

LOCK TABLES `block_diskserial` WRITE;
/*!40000 ALTER TABLE `block_diskserial` DISABLE KEYS */;
/*!40000 ALTER TABLE `block_diskserial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `block_ip`
--

DROP TABLE IF EXISTS `block_ip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `block_ip` (
  `ip` varchar(16) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ip`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `block_ip`
--

LOCK TABLES `block_ip` WRITE;
/*!40000 ALTER TABLE `block_ip` DISABLE KEYS */;
/*!40000 ALTER TABLE `block_ip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `block_mac`
--

DROP TABLE IF EXISTS `block_mac`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `block_mac` (
  `mac` varchar(50) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`mac`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `block_mac`
--

LOCK TABLES `block_mac` WRITE;
/*!40000 ALTER TABLE `block_mac` DISABLE KEYS */;
/*!40000 ALTER TABLE `block_mac` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `castle_siege_data`
--

DROP TABLE IF EXISTS `castle_siege_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `castle_siege_data` (
  `owner` int(10) unsigned NOT NULL,
  `status` tinyint(3) unsigned DEFAULT NULL,
  `tax_hunt` int(11) DEFAULT NULL,
  `tax_chaos` tinyint(3) unsigned DEFAULT NULL,
  `tax_store` tinyint(3) unsigned DEFAULT NULL,
  `hunt_allowed` tinyint(4) DEFAULT NULL,
  `money` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`owner`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `castle_siege_data`
--

LOCK TABLES `castle_siege_data` WRITE;
/*!40000 ALTER TABLE `castle_siege_data` DISABLE KEYS */;
INSERT INTO `castle_siege_data` VALUES
(0,0,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `castle_siege_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `castle_siege_guild`
--

DROP TABLE IF EXISTS `castle_siege_guild`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `castle_siege_guild` (
  `guild` int(10) unsigned NOT NULL,
  `side` tinyint(3) unsigned NOT NULL,
  `score` int(11) DEFAULT NULL,
  PRIMARY KEY (`guild`,`side`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `castle_siege_guild`
--

LOCK TABLES `castle_siege_guild` WRITE;
/*!40000 ALTER TABLE `castle_siege_guild` DISABLE KEYS */;
/*!40000 ALTER TABLE `castle_siege_guild` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `castle_siege_npc`
--

DROP TABLE IF EXISTS `castle_siege_npc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `castle_siege_npc` (
  `uid` bigint(20) NOT NULL AUTO_INCREMENT,
  `id` smallint(6) DEFAULT NULL,
  `defense_level` smallint(6) DEFAULT NULL,
  `regen_level` smallint(6) DEFAULT NULL,
  `life_level` smallint(6) DEFAULT NULL,
  `life` int(11) DEFAULT NULL,
  `npc` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `castle_siege_npc`
--

LOCK TABLES `castle_siege_npc` WRITE;
/*!40000 ALTER TABLE `castle_siege_npc` DISABLE KEYS */;
/*!40000 ALTER TABLE `castle_siege_npc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `castle_siege_registered_guild`
--

DROP TABLE IF EXISTS `castle_siege_registered_guild`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `castle_siege_registered_guild` (
  `guild` int(10) unsigned NOT NULL,
  `marks` int(10) unsigned DEFAULT NULL,
  `register_id` int(10) unsigned DEFAULT NULL,
  `level` smallint(5) unsigned DEFAULT NULL,
  `level_master` smallint(5) unsigned DEFAULT NULL,
  PRIMARY KEY (`guild`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `castle_siege_registered_guild`
--

LOCK TABLES `castle_siege_registered_guild` WRITE;
/*!40000 ALTER TABLE `castle_siege_registered_guild` DISABLE KEYS */;
/*!40000 ALTER TABLE `castle_siege_registered_guild` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chaos_castle_survival_hall_of_fame`
--

DROP TABLE IF EXISTS `chaos_castle_survival_hall_of_fame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chaos_castle_survival_hall_of_fame` (
  `char_id` int(10) unsigned NOT NULL,
  `char_name` varchar(255) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chaos_castle_survival_hall_of_fame`
--

LOCK TABLES `chaos_castle_survival_hall_of_fame` WRITE;
/*!40000 ALTER TABLE `chaos_castle_survival_hall_of_fame` DISABLE KEYS */;
/*!40000 ALTER TABLE `chaos_castle_survival_hall_of_fame` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chaos_castle_survival_ranking`
--

DROP TABLE IF EXISTS `chaos_castle_survival_ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chaos_castle_survival_ranking` (
  `char_id` int(10) unsigned NOT NULL,
  `score` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chaos_castle_survival_ranking`
--

LOCK TABLES `chaos_castle_survival_ranking` WRITE;
/*!40000 ALTER TABLE `chaos_castle_survival_ranking` DISABLE KEYS */;
/*!40000 ALTER TABLE `chaos_castle_survival_ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_add_stat`
--

DROP TABLE IF EXISTS `character_add_stat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_add_stat` (
  `GUID` int(11) DEFAULT NULL,
  `Strenght` int(11) NOT NULL DEFAULT 0,
  `Agility` int(11) NOT NULL DEFAULT 0,
  `Vitality` int(11) NOT NULL DEFAULT 0,
  `Energy` int(11) NOT NULL DEFAULT 0,
  `Leadership` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_add_stat`
--

LOCK TABLES `character_add_stat` WRITE;
/*!40000 ALTER TABLE `character_add_stat` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_add_stat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_buff`
--

DROP TABLE IF EXISTS `character_buff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_buff` (
  `char_id` int(10) unsigned NOT NULL,
  `buff` smallint(5) unsigned NOT NULL,
  `effect_1` tinyint(3) unsigned DEFAULT NULL,
  `value_1` int(11) DEFAULT NULL,
  `effect_2` tinyint(3) unsigned DEFAULT NULL,
  `value_2` int(11) DEFAULT NULL,
  `effect_3` tinyint(3) unsigned DEFAULT NULL,
  `value_3` int(11) DEFAULT NULL,
  `duration` bigint(20) DEFAULT NULL,
  `flags` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`char_id`,`buff`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_buff`
--

LOCK TABLES `character_buff` WRITE;
/*!40000 ALTER TABLE `character_buff` DISABLE KEYS */;
INSERT INTO `character_buff` VALUES
(28,79,4,188,0,0,0,0,1260,4);
/*!40000 ALTER TABLE `character_buff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_chat_block`
--

DROP TABLE IF EXISTS `character_chat_block`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_chat_block` (
  `char_id` int(10) unsigned NOT NULL,
  `blocked` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_chat_block`
--

LOCK TABLES `character_chat_block` WRITE;
/*!40000 ALTER TABLE `character_chat_block` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_chat_block` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_date`
--

DROP TABLE IF EXISTS `character_date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_date` (
  `char_id` int(10) unsigned NOT NULL,
  `id` int(10) unsigned NOT NULL,
  `date` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`char_id`,`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_date`
--

LOCK TABLES `character_date` WRITE;
/*!40000 ALTER TABLE `character_date` DISABLE KEYS */;
INSERT INTO `character_date` VALUES
(20,0,1770392244),
(21,0,1770392328),
(22,0,1770392036),
(23,0,1770392804),
(24,0,1770394120),
(25,0,1770394432),
(26,0,1770382724),
(28,0,1770391429),
(29,0,1770394527);
/*!40000 ALTER TABLE `character_date` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_deleted`
--

DROP TABLE IF EXISTS `character_deleted`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_deleted` (
  `account_id` int(10) unsigned NOT NULL,
  `char_id` int(10) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`account_id`,`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_deleted`
--

LOCK TABLES `character_deleted` WRITE;
/*!40000 ALTER TABLE `character_deleted` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_deleted` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_event_count`
--

DROP TABLE IF EXISTS `character_event_count`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_event_count` (
  `char_id` int(10) unsigned NOT NULL,
  `event_id` tinyint(3) unsigned NOT NULL,
  `count` tinyint(3) unsigned DEFAULT NULL,
  `day` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`char_id`,`event_id`,`day`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_event_count`
--

LOCK TABLES `character_event_count` WRITE;
/*!40000 ALTER TABLE `character_event_count` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_event_count` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_friend`
--

DROP TABLE IF EXISTS `character_friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_friend` (
  `char_id` int(10) unsigned NOT NULL,
  `friend_name` varchar(255) NOT NULL,
  PRIMARY KEY (`char_id`,`friend_name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_friend`
--

LOCK TABLES `character_friend` WRITE;
/*!40000 ALTER TABLE `character_friend` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_gameoption`
--

DROP TABLE IF EXISTS `character_gameoption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_gameoption` (
  `char_id` int(10) unsigned NOT NULL,
  `game_option` tinyint(3) unsigned DEFAULT NULL,
  `chat_window` tinyint(3) unsigned DEFAULT NULL,
  `q_key` tinyint(3) unsigned DEFAULT NULL,
  `w_key` tinyint(3) unsigned DEFAULT NULL,
  `e_key` tinyint(3) unsigned DEFAULT NULL,
  `r_key` tinyint(3) unsigned DEFAULT NULL,
  `qwer_level` int(11) DEFAULT NULL,
  `skill_bind_0` smallint(5) unsigned DEFAULT NULL,
  `skill_bind_1` smallint(5) unsigned DEFAULT NULL,
  `skill_bind_2` smallint(5) unsigned DEFAULT NULL,
  `skill_bind_3` smallint(5) unsigned DEFAULT NULL,
  `skill_bind_4` smallint(5) unsigned DEFAULT NULL,
  `skill_bind_5` smallint(5) unsigned DEFAULT NULL,
  `skill_bind_6` smallint(5) unsigned DEFAULT NULL,
  `skill_bind_7` smallint(5) unsigned DEFAULT NULL,
  `skill_bind_8` smallint(5) unsigned DEFAULT NULL,
  `skill_bind_9` smallint(5) unsigned DEFAULT NULL,
  `extra_data` bigint(20) unsigned DEFAULT NULL,
  `change_skin` tinyint(3) unsigned DEFAULT NULL,
  `additional_options` smallint(5) unsigned DEFAULT NULL,
  `button_bind_1` tinyint(3) unsigned DEFAULT NULL,
  `button_bind_2` tinyint(3) unsigned DEFAULT NULL,
  `button_bind_3` tinyint(3) unsigned DEFAULT NULL,
  `button_bind_4` tinyint(3) unsigned DEFAULT NULL,
  `button_bind_5` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_gameoption`
--

LOCK TABLES `character_gameoption` WRITE;
/*!40000 ALTER TABLE `character_gameoption` DISABLE KEYS */;
INSERT INTO `character_gameoption` VALUES
(0,29,0,255,255,255,255,0,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,0,1,10,0,103,0,0,0),
(17,63,0,255,255,255,255,0,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,0,1,778,0,10,11,8,1),
(20,29,0,3,255,255,255,8,65535,274,20,278,277,276,279,273,18,65535,0,1,778,0,10,11,8,1),
(21,63,0,3,3,3,3,134744072,65535,27,28,26,65535,65535,65535,65535,65535,65535,0,1,778,0,10,11,8,1),
(22,29,18,3,6,8,255,2056,65535,61,238,78,65535,65535,65535,65535,65535,65535,0,1,778,0,10,11,8,1),
(23,29,56,3,255,255,255,8,65535,41,9,5,56,65535,65535,65535,65535,65535,0,1,778,0,10,11,8,1),
(24,63,0,0,255,255,255,24,65535,2002,2004,2006,2021,65535,65535,65535,65535,65535,0,1,778,0,10,11,8,1),
(25,63,0,3,6,255,255,2056,65535,260,262,264,263,65535,268,267,266,65535,0,1,778,0,10,11,8,1),
(26,29,0,3,6,255,255,2056,65535,20,65535,65535,65535,65535,65535,65535,65535,65535,0,1,778,0,10,11,8,1),
(27,63,0,0,0,0,0,0,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,0,1,778,0,0,0,0,0),
(28,63,18,0,255,255,255,0,65535,240,241,65535,65535,65535,65535,65535,65535,65535,0,1,778,0,10,11,8,1),
(29,63,0,255,6,255,255,2048,65535,61,78,238,64,63,65535,65535,65535,65535,0,1,778,0,10,11,8,1);
/*!40000 ALTER TABLE `character_gameoption` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_gens`
--

DROP TABLE IF EXISTS `character_gens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_gens` (
  `char_id` int(10) unsigned NOT NULL,
  `family` tinyint(3) unsigned NOT NULL,
  `level` tinyint(3) unsigned DEFAULT NULL,
  `contribution` int(11) DEFAULT NULL,
  `reward_date` bigint(20) DEFAULT NULL,
  `join_date` bigint(20) DEFAULT NULL,
  `left_date` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`char_id`,`family`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_gens`
--

LOCK TABLES `character_gens` WRITE;
/*!40000 ALTER TABLE `character_gens` DISABLE KEYS */;
INSERT INTO `character_gens` VALUES
(17,0,0,0,0,0,0),
(20,0,0,0,0,0,0),
(21,0,0,0,0,0,0),
(22,0,0,0,0,0,0),
(23,1,14,0,0,1770392943,0),
(24,0,0,0,0,0,0),
(25,0,0,0,0,0,0),
(26,0,0,0,0,0,0),
(27,0,0,0,0,0,0),
(28,0,0,0,0,0,0),
(29,0,0,0,0,0,0);
/*!40000 ALTER TABLE `character_gens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_gens_kill`
--

DROP TABLE IF EXISTS `character_gens_kill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_gens_kill` (
  `char_id` int(10) unsigned DEFAULT NULL,
  `killed_id` int(10) unsigned DEFAULT NULL,
  `count` int(10) unsigned DEFAULT NULL,
  `date` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_gens_kill`
--

LOCK TABLES `character_gens_kill` WRITE;
/*!40000 ALTER TABLE `character_gens_kill` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_gens_kill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_gremory_case`
--

DROP TABLE IF EXISTS `character_gremory_case`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_gremory_case` (
  `guid` int(11) NOT NULL,
  `gremory_case_char` varbinary(20000) DEFAULT NULL,
  `gremory_case_mobile` varbinary(20000) DEFAULT NULL,
  `gremory_case_ps` varbinary(20000) DEFAULT NULL,
  PRIMARY KEY (`guid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_gremory_case`
--

LOCK TABLES `character_gremory_case` WRITE;
/*!40000 ALTER TABLE `character_gremory_case` DISABLE KEYS */;
INSERT INTO `character_gremory_case` VALUES
(17,'','',''),
(20,'','',''),
(21,'','',''),
(22,'','',''),
(23,'','',''),
(24,'','',''),
(25,'','',''),
(26,'','',''),
(27,'','',''),
(28,'','',''),
(29,'','','');
/*!40000 ALTER TABLE `character_gremory_case` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_helper`
--

DROP TABLE IF EXISTS `character_helper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_helper` (
  `char_id` int(10) unsigned NOT NULL,
  `option_flag_1` int(10) unsigned DEFAULT NULL,
  `option_flag_2` int(10) unsigned DEFAULT NULL,
  `item_pick_flag` tinyint(3) unsigned DEFAULT NULL,
  `hunting_range` tinyint(3) unsigned DEFAULT NULL,
  `item_pick_range` tinyint(3) unsigned DEFAULT NULL,
  `distance` smallint(5) unsigned DEFAULT NULL,
  `attack_skill_1` smallint(5) unsigned DEFAULT NULL,
  `attack_sec_skill_1` smallint(5) unsigned DEFAULT NULL,
  `attack_sec_skill_2` smallint(5) unsigned DEFAULT NULL,
  `attack_sec_delay_1` smallint(5) unsigned DEFAULT NULL,
  `attack_sec_delay_2` smallint(5) unsigned DEFAULT NULL,
  `buff_skill_1` smallint(5) unsigned DEFAULT NULL,
  `buff_skill_2` smallint(5) unsigned DEFAULT NULL,
  `buff_skill_3` smallint(5) unsigned DEFAULT NULL,
  `time_space_casting` smallint(5) unsigned DEFAULT NULL,
  `percent_autopot` tinyint(3) unsigned DEFAULT NULL,
  `percent_autoheal` tinyint(3) unsigned DEFAULT NULL,
  `percent_partyheal` tinyint(3) unsigned DEFAULT NULL,
  `percent_drainlife` tinyint(3) unsigned DEFAULT NULL,
  `item_list` varchar(255) DEFAULT NULL,
  `buff_item_1` smallint(5) unsigned DEFAULT NULL,
  `buff_item_2` smallint(5) unsigned DEFAULT NULL,
  `buff_item_3` smallint(5) unsigned DEFAULT NULL,
  `buff_skill_4` smallint(5) unsigned DEFAULT 0,
  `buff_skill_5` smallint(5) unsigned DEFAULT 0,
  `buff_skill_6` smallint(5) unsigned DEFAULT 0,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_helper`
--

LOCK TABLES `character_helper` WRITE;
/*!40000 ALTER TABLE `character_helper` DISABLE KEYS */;
INSERT INTO `character_helper` VALUES
(17,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,50,50,50,50,'',65535,65535,65535,0,0,0),
(20,3969909785,8217,249,8,8,10,274,20,276,0,0,278,273,0,0,50,50,50,50,'Qm94Ow==',65535,65535,65535,0,0,0),
(21,3766554065,8729,249,8,8,10,26,0,0,0,0,27,28,0,30,50,50,50,50,'',65535,65535,65535,0,0,0),
(22,3231711249,8536,217,8,8,10,61,238,78,0,0,0,0,0,0,50,50,50,50,'Qm94Ow==',65535,65535,65535,0,0,0),
(23,2155872272,8216,137,7,4,10,56,0,0,0,0,0,0,0,0,50,50,50,50,'Qm94IG9mIEhlYXZlbjs=',65535,65535,65535,0,0,0),
(24,3229615121,8217,217,8,8,10,2004,2002,2006,0,0,2021,0,0,0,50,50,50,50,'',65535,65535,65535,0,0,0),
(25,1082131473,8249,137,8,4,10,263,0,0,0,0,268,267,266,0,70,50,50,50,'Qm94IG9mIEx1Y2s7',65535,65535,65535,0,0,0),
(26,1084227601,8536,57,5,8,10,20,0,0,0,0,0,0,0,0,50,50,50,50,'',65535,65535,65535,0,0,0),
(27,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,50,50,50,50,'',65535,65535,65535,0,0,0),
(28,2694840345,8312,217,8,8,10,241,0,0,0,0,0,0,0,0,50,50,50,50,'Kzc7Qm94Ow==',65535,65535,65535,0,0,0),
(29,1082131473,8216,201,8,3,10,238,0,0,0,0,64,0,0,0,50,50,50,50,'Qm94IG9mIEx1Y2s7',65535,65535,65535,0,0,0);
/*!40000 ALTER TABLE `character_helper` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_hunting_record`
--

DROP TABLE IF EXISTS `character_hunting_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_hunting_record` (
  `char_id` int(10) unsigned NOT NULL,
  `world` smallint(5) unsigned NOT NULL,
  `year` smallint(5) unsigned DEFAULT NULL,
  `month` tinyint(3) unsigned DEFAULT NULL,
  `day` tinyint(3) unsigned DEFAULT NULL,
  `level` int(10) unsigned DEFAULT NULL,
  `duration` int(10) unsigned DEFAULT NULL,
  `damage` bigint(20) unsigned DEFAULT NULL,
  `elemental_damage` bigint(20) unsigned DEFAULT NULL,
  `healing` int(10) unsigned DEFAULT NULL,
  `killed_count` int(10) unsigned DEFAULT NULL,
  `earned_experience` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`char_id`,`world`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_hunting_record`
--

LOCK TABLES `character_hunting_record` WRITE;
/*!40000 ALTER TABLE `character_hunting_record` DISABLE KEYS */;
INSERT INTO `character_hunting_record` VALUES
(20,0,2026,2,6,74,24,4842,637,0,2,378800),
(20,2,2026,2,7,400,712,2422647,161718,0,340,0),
(20,4,2026,2,6,330,4509,8037535,1359902,0,1346,783412400),
(20,37,2026,2,6,400,7497,22801619,1307202,0,962,2951332400),
(20,51,2026,2,7,400,82,124627,8186,0,17,0),
(20,56,2026,2,7,400,131,1663055,48282,0,31,0),
(21,0,2026,2,6,88,174,24725,13337,0,82,3248800),
(21,3,2026,2,6,17,4,0,0,0,0,0),
(21,4,2026,2,6,327,4856,746882,559731,4603,131,754060800),
(21,37,2026,2,6,400,8817,38,0,2342,0,3049897400),
(22,0,2026,2,6,68,25,3062,1661,0,9,54000),
(22,4,2026,2,6,326,139,609374,56104,0,100,37280300),
(22,7,2026,2,6,296,642,1617003,113019,0,210,62532200),
(22,10,2026,2,6,320,1700,9985776,675473,0,613,283577600),
(22,37,2026,2,6,333,1308,1650282,915902,4971,58,115712000),
(23,0,2026,2,6,23,26,2534,2224,38,9,54600),
(23,2,2026,2,6,133,393,354075,51493,0,227,26246400),
(23,3,2026,2,6,27,14,13461,2403,0,11,69000),
(23,4,2026,2,6,322,2760,8660474,1243485,0,1906,640902600),
(23,37,2026,2,6,400,7888,28565722,3459912,0,1134,3075047400),
(24,1,2026,2,6,100,349,189026,0,0,73,12317200),
(24,4,2026,2,6,203,673,378237,0,0,72,75866000),
(24,37,2026,2,6,400,9150,54038535,0,0,2282,3719248400),
(24,51,2026,2,6,36,16,5742,0,0,11,98600),
(25,0,2026,2,6,45,71,23520,0,0,40,526400),
(25,2,2026,2,6,102,210,102795,29207,0,88,10532200),
(25,4,2026,2,6,127,139,129103,34328,0,29,7557200),
(25,6,2026,2,6,196,4,0,0,0,0,0),
(25,7,2026,2,6,196,320,977563,224702,0,159,54309000),
(25,8,2026,2,6,214,138,463576,76366,0,28,15099000),
(25,10,2026,2,6,218,19,60463,11564,0,3,1375800),
(25,37,2026,2,6,398,9150,59704119,6105975,5626,2821,3547616600),
(25,38,2026,2,6,343,8,13618,1904,3341,0,0),
(26,0,2026,2,6,38,50,28442,3694,0,20,949600),
(28,0,2026,2,6,327,507,109624,15119,0,92,5115400),
(28,4,2026,2,6,284,1214,5609745,229235,0,773,256265700),
(28,8,2026,2,6,322,2693,14908301,517002,0,616,315476000),
(28,37,2026,2,6,327,331,4511303,64585,0,108,89434800),
(29,0,2026,2,6,34,9,13919,0,0,6,83000),
(29,2,2026,2,6,101,167,207776,0,0,96,11506400),
(29,4,2026,2,6,238,422,2648498,0,0,475,127403800),
(29,37,2026,2,6,353,5756,59919802,2361132,0,2265,1256634400),
(29,38,2026,2,6,327,199,1609501,0,50488,21,19529000);
/*!40000 ALTER TABLE `character_hunting_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_info`
--

DROP TABLE IF EXISTS `character_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_info` (
  `guid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int(10) unsigned DEFAULT NULL,
  `authority` tinyint(3) unsigned DEFAULT 0,
  `race` smallint(5) unsigned DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slot` tinyint(4) DEFAULT 1,
  `level` smallint(6) DEFAULT 0,
  `level_master` smallint(6) DEFAULT 0,
  `level_majestic` smallint(6) DEFAULT 0,
  `experience` bigint(20) DEFAULT 0,
  `experience_master` bigint(20) DEFAULT 0,
  `experience_majestic` bigint(20) DEFAULT 0,
  `points` int(11) DEFAULT 0,
  `points_master` int(11) DEFAULT 0,
  `points_majestic` int(11) DEFAULT 0,
  `strength` int(10) unsigned DEFAULT 0,
  `agility` int(10) unsigned DEFAULT 0,
  `vitality` int(10) unsigned DEFAULT 0,
  `energy` int(10) unsigned DEFAULT 0,
  `leadership` int(10) unsigned DEFAULT 0,
  `world` smallint(5) unsigned DEFAULT 0,
  `world_x` smallint(6) DEFAULT 0,
  `world_y` smallint(6) DEFAULT 0,
  `direction` tinyint(3) unsigned DEFAULT 0,
  `money` int(10) unsigned DEFAULT 0,
  `life` int(11) DEFAULT 0,
  `mana` int(11) DEFAULT 0,
  `shield` int(11) DEFAULT 0,
  `stamina` int(11) DEFAULT 0,
  `add_fruit_points` int(11) DEFAULT 0,
  `dec_fruit_points` int(11) DEFAULT 0,
  `expanded_inventory` tinyint(3) unsigned DEFAULT 0,
  `mute_time` bigint(20) DEFAULT 0,
  `admin_flags` int(10) unsigned DEFAULT 0,
  `pk_level` tinyint(3) unsigned DEFAULT 3,
  `pk_count` int(11) DEFAULT 0,
  `pk_points` int(11) DEFAULT 0,
  `first_time` tinyint(3) unsigned DEFAULT 1,
  `santa_claus_gift` bigint(20) DEFAULT 0,
  `personal_store_name` varchar(255) DEFAULT '0',
  `personal_store_open` tinyint(4) DEFAULT 0,
  `last_use` bigint(20) DEFAULT 0,
  `kick_time` bigint(20) DEFAULT 0,
  `post_count` int(11) DEFAULT 0,
  `post_day` tinyint(3) unsigned DEFAULT 0,
  `post_month` tinyint(3) unsigned DEFAULT 0,
  `ruud_money` int(10) unsigned DEFAULT 0,
  `hunting_log_visible` tinyint(3) unsigned DEFAULT 0,
  `create_date` bigint(20) DEFAULT 0,
  `online` tinyint(4) DEFAULT 0,
  `server_code` smallint(5) unsigned DEFAULT 3,
  `reset` int(10) unsigned DEFAULT 0,
  `monster_soul_purchase` int(11) DEFAULT 0,
  `lastserver` int(11) DEFAULT 0,
  PRIMARY KEY (`guid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_info`
--

LOCK TABLES `character_info` WRITE;
/*!40000 ALTER TABLE `character_info` DISABLE KEYS */;
INSERT INTO `character_info` VALUES
(17,3,0,160,'BangBang',0,1,0,0,0,0,0,500,0,0,20,18,20,25,0,51,47,227,5,10000000,100,80,103,18,0,0,0,0,1,3,0,0,0,0,'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',0,1770276924,1770219028,0,0,0,0,0,0,0,0,0,0,0),
(18,8,0,NULL,'TestChar2',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,1,0,'0',0,0,0,0,0,0,0,0,0,0,3,0,0,0),
(19,9,0,NULL,'GMUser',1,400,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,1,0,'0',0,0,0,0,0,0,0,0,0,0,3,0,0,0),
(20,11,0,112,'ChunDanSim',0,400,0,0,69195800,0,0,0,0,0,1589,1435,128,250,0,8,54,122,0,22834817,2662,838,10035,813,0,0,0,0,0,3,0,0,0,0,'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',0,1770439083,1770375538,0,0,0,9289,0,0,1,0,0,0,0),
(21,12,0,32,'TieuNgoc18',0,400,0,0,0,0,0,1340,0,0,115,389,76,657,0,37,219,43,1,19189952,2245,495,7175,266,0,0,0,0,0,3,0,0,0,0,'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',0,1770393947,1770375855,0,0,0,0,0,0,0,0,0,0,0),
(22,13,0,64,'EoChanHy',0,333,0,0,6107485,0,0,130,0,0,1000,1000,20,700,80,37,58,98,4,5057732,1812,1780,7657,631,0,0,0,0,0,3,0,0,0,0,'SXRlbSBmb3Igc2FsZQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',0,1770392132,1770376043,0,0,0,29155,0,0,0,0,0,0,0),
(23,15,0,48,'maychem',0,400,0,0,69195800,0,0,28,0,0,1877,1157,68,267,0,6,19,82,0,835044,2092,1099,10423,725,0,0,0,0,0,3,0,0,0,0,'SXRlbSBmb3Igc2FsZQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',0,1770417697,1770378001,0,0,0,1402,0,0,0,0,0,0,0),
(24,18,0,160,'RuneAlex',0,400,0,0,0,0,0,1618,0,0,245,189,20,506,0,37,218,41,142,14900773,2134,1740,7014,67,0,0,0,0,0,3,0,0,0,0,'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',0,1770394302,1770381288,0,0,0,0,0,0,0,0,0,0,0),
(25,20,0,96,'Boxer',0,398,0,0,36026500,0,0,35,0,0,1207,971,737,433,0,37,219,46,67,6586748,3708,993,9828,1029,0,0,0,0,0,3,0,0,0,0,'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',0,1770394565,1770381534,0,0,0,9675,0,0,0,0,0,0,0),
(26,17,0,112,'Devillll',0,38,0,0,33300,0,0,331,0,0,284,204,25,24,0,51,27,225,0,9861640,324,95,1179,114,0,0,0,0,0,3,0,0,0,0,'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',0,1770382880,1770382203,0,0,0,0,0,0,0,0,0,0,0),
(27,21,0,16,'mymy',0,1,0,0,0,0,0,500,0,0,28,20,25,10,0,0,137,136,5,10000000,110,20,105,25,0,0,0,0,0,3,0,0,0,0,'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',0,1770383057,1770382587,0,0,0,0,0,0,0,0,0,0,0),
(28,14,0,176,'Pakito',0,327,0,0,1604625,0,0,64,0,0,300,759,40,1050,0,0,34,98,3,13667580,1886,1720,6819,670,0,0,0,0,0,5,1,43162,0,0,'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',0,1770392131,1770383682,0,0,0,12721,0,0,0,0,0,0,0),
(29,22,0,64,'taxi',0,353,0,0,8844280,0,0,126,0,0,1084,1014,146,300,400,37,229,83,1,10496070,2209,1177,8288,699,0,0,0,0,0,3,0,0,0,0,'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',0,1770394566,1770384648,0,0,0,6764,0,0,0,0,0,0,0);
/*!40000 ALTER TABLE `character_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_item_delay`
--

DROP TABLE IF EXISTS `character_item_delay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_item_delay` (
  `char_id` int(10) unsigned DEFAULT NULL,
  `item` smallint(5) unsigned DEFAULT NULL,
  `date` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_item_delay`
--

LOCK TABLES `character_item_delay` WRITE;
/*!40000 ALTER TABLE `character_item_delay` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_item_delay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_item_inventory`
--

DROP TABLE IF EXISTS `character_item_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_item_inventory` (
  `GUID` int(11) NOT NULL,
  `InventoryData` varbinary(65525) DEFAULT NULL,
  PRIMARY KEY (`GUID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_item_inventory`
--

LOCK TABLES `character_item_inventory` WRITE;
/*!40000 ALTER TABLE `character_item_inventory` DISABLE KEYS */;
INSERT INTO `character_item_inventory` VALUES
(17,'{1;12;3792;0;1;0;11;63;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770823828;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;14;4304;0;2;0;11;63;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770823828;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;16;4816;0;3;0;11;63;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770823828;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;18;5328;0;4;0;11;63;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770823828;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;28;5840;0;5;0;11;63;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770823828;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;32;2090;0;6;0;11;91;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770823828;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;33;2090;0;7;0;11;91;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770823828;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;34;7454;0;9;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;35;6676;0;10;0;1;31;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;38;6676;0;11;0;2;32;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;39;6656;0;12;0;0;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;44;6277;0;8;0;0;200;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770823828;0;255;255;255;255;255;255;0;0;254;254;254;254},'),
(20,'{1;0;1549;0;18;0;11;55;0;1;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980338;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;1;3101;0;19;0;11;52;0;1;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980338;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;2;3675;0;13;0;11;49;6;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980338;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;3;4187;0;14;0;11;57;1;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980338;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;4;4699;0;15;0;11;51;2;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980338;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;5;5211;0;16;0;11;45;5;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980338;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;6;5723;0;17;0;11;47;1;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980338;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;7;6422;0;20;0;0;200;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980338;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;10;6665;0;120;0;0;47;136;0;0;7;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;12;6418;0;103;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;13;6656;0;24;0;0;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;14;7209;0;3206;0;0;2;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;15;6396;0;94;0;0;0;0;0;0;0;0;0;0;0;14;65535;65535;65535;65535;18;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;16;6376;0;92;0;0;0;0;0;0;0;0;0;0;0;14;65535;65535;65535;65535;18;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;17;6386;0;93;0;0;0;0;0;0;0;0;0;0;0;14;65535;65535;65535;65535;18;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;18;6366;0;91;0;0;0;0;0;0;0;0;0;0;0;14;65535;65535;65535;65535;18;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;19;7189;0;128;0;3;2;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;21;7541;0;14321;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;22;7182;0;4273;0;0;5;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;23;7185;0;235;0;1;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;24;7541;0;14432;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;25;7290;0;12747;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;26;7581;0;389;0;0;12;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;27;7290;0;216;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;28;6159;0;408;0;0;4;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;29;7290;0;14381;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;30;7171;0;1996;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;31;7181;0;7630;0;0;2;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;32;7168;0;14382;0;0;5;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;33;7211;0;14341;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;34;4635;0;14350;0;7;80;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;36;6676;0;22;0;1;31;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;37;7190;0;11502;0;0;3;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;38;7178;0;14387;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;39;7541;0;14404;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;40;7186;0;14421;0;1;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;41;7290;0;14460;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;44;6676;0;23;0;2;32;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;45;7290;0;14466;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;47;7290;0;14558;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;48;7179;0;14588;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;49;7290;0;14602;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;50;7541;0;14690;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;59;1031;0;14354;0;0;50;0;0;1;1;4;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;60;4105;0;14428;0;0;50;0;0;1;1;4;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;236;6359;0;90;0;0;1;0;0;0;0;0;0;0;0;65534;65534;65534;65534;65535;18;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;0;7672;0;341;0;0;8;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;1;7257;0;454;0;0;9;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;2;7258;0;462;0;0;9;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;3;7256;0;1045;0;0;10;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;4;7378;0;1780;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;5;7378;0;1835;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;6;7380;0;2284;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;7;7381;0;2617;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;8;7378;0;4013;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;12;7201;0;5997;0;1;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;13;7379;0;9359;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;14;7256;0;9793;0;0;3;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;15;7378;0;9921;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;16;7379;0;9955;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;17;7378;0;10538;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;18;7380;0;11021;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;19;7379;0;11208;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;20;7380;0;11832;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;21;7381;0;12193;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;23;7379;0;12691;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;0;5668;0;14338;0;0;59;0;0;1;1;8;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;168500;0;0;1770522677;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;1;5639;0;14337;0;0;36;0;0;1;1;55;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;632800;0;0;1770522679;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;2;3597;0;14340;0;0;38;0;0;1;1;27;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;491900;0;0;1770522680;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;3;3;0;14330;0;0;27;0;1;1;1;29;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;286900;0;0;1770522682;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;4;3623;0;2398;0;3;39;0;0;0;0;54;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;218200;0;0;1770522684;0;255;255;255;255;255;255;0;0;254;254;254;254},'),
(21,'{1;0;2049;0;30;0;11;45;0;1;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980655;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;1;2080;0;31;0;11;111;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980655;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;2;3595;0;25;0;11;47;9;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980655;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;3;4107;0;26;0;11;47;7;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980655;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;4;4619;0;27;0;11;47;9;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980655;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;5;5131;0;28;0;11;47;32;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980655;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;6;5643;0;29;0;11;47;34;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980655;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;7;6276;0;32;0;0;200;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980655;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;12;7736;0;3815;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;13;6162;0;3875;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;14;3075;0;508;0;5;42;0;0;0;0;25;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;16;7190;0;4849;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;17;7581;0;561;0;0;5;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;18;7171;0;78;0;1;245;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;19;7171;0;79;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;20;6189;0;3874;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;21;7209;0;11645;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;24;7182;0;12164;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;26;6673;0;54;0;1;129;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;27;7171;0;80;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;28;7171;0;81;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;29;7171;0;82;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;30;7171;0;83;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;31;6;0;4036;0;6;38;0;1;0;0;4;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;32;7171;0;84;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;33;7171;0;85;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;35;7186;0;56;0;1;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;36;7171;0;86;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;37;7174;0;87;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;38;7174;0;88;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;41;4102;0;4105;0;1;41;0;0;1;0;47;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;43;6676;0;34;0;1;31;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;44;6676;0;35;0;2;32;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;45;6656;0;36;0;0;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;46;7174;0;89;0;1;179;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;48;6159;0;227;0;0;2;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;255;254;254;254;254},{1;51;516;0;4128;0;5;38;0;0;1;0;61;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;52;2059;0;4161;0;6;48;0;1;0;0;42;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;53;517;0;4170;0;4;40;0;1;0;0;22;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;55;3675;0;4195;0;2;30;0;0;0;0;8;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;57;4699;0;4198;0;0;30;0;0;1;0;32;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;236;6359;0;107;0;0;1;0;0;0;0;0;0;0;0;2;3;1;0;65535;19;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;0;7258;0;359;0;0;6;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;1;7672;0;946;0;0;10;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;2;7378;0;953;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;3;7379;0;1415;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;4;7257;0;1580;0;0;6;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;5;7380;0;1789;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;6;7379;0;2141;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;7;7379;0;3395;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;9;7379;0;4074;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;10;7378;0;4950;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;11;7380;0;5585;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;13;7380;0;6143;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;14;7256;0;6784;0;0;7;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;15;7379;0;7844;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;16;7202;0;9435;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;17;7378;0;10422;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;18;7378;0;10512;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;19;7379;0;11338;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;20;7379;0;13675;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;0;2059;0;548;0;2;42;0;1;0;0;3;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;114900;0;0;1770469964;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;1;3081;0;330;0;5;44;0;1;0;0;8;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;73400;0;0;1770469967;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;2;2048;0;60;0;0;20;0;1;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;80;0;0;1770469969;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;3;2058;0;533;0;3;34;0;1;1;0;59;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;748000;0;0;1770469971;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;4;8;0;592;0;4;40;0;1;0;0;21;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;268200;0;0;1770469962;0;255;255;255;255;255;255;0;0;254;254;254;254},'),
(22,'{1;0;1032;0;46;0;11;76;0;1;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980843;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;1;3080;0;47;0;11;82;0;1;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980843;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;2;3609;0;41;0;11;78;18;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980843;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;3;4121;0;42;0;11;78;15;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980843;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;4;4633;0;43;0;11;78;19;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980843;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;5;5145;0;44;0;11;78;22;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980843;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;6;5657;0;45;0;11;78;21;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980843;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;7;6274;0;48;0;0;200;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770980843;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;9;6683;0;1186;0;0;65;0;0;0;0;2;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;10;6665;0;407;0;0;65;288;0;1;1;55;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;11;6676;0;50;0;1;31;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;12;7174;0;379;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;13;7174;0;380;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;14;10742;0;8758;0;0;33;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;15;6656;0;982;0;0;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;16;7197;0;10894;0;1;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;17;7209;0;11039;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;18;7174;0;381;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;19;7174;0;382;0;1;240;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;20;7174;0;383;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;21;7171;0;384;0;1;249;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;22;7171;0;385;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;23;7171;0;386;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;24;7171;0;387;0;1;182;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;25;7189;0;997;0;3;12;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;26;7197;0;7230;0;4;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;27;7197;0;3184;0;3;3;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;28;7196;0;842;0;1;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;29;7124;0;3364;0;0;4;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;30;10741;0;8747;0;0;13;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;31;7581;0;1639;0;0;5;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;32;6670;0;5954;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;33;7210;0;4189;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;34;7181;0;8755;0;0;3;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;255;254;254;254;254},{1;35;1553;0;9407;0;9;56;0;1;0;4;57;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;36;7182;0;8738;0;0;2;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;255;254;254;254;254},{1;37;4135;0;9540;0;9;59;0;0;0;4;32;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;39;7197;0;11436;0;6;2;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;41;4703;0;11437;0;6;84;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;44;6676;0;51;0;2;32;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;47;10354;0;10718;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;52;6687;0;11579;0;1;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;53;1028;0;11785;0;5;78;0;1;0;0;2;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;57;7289;0;11867;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;60;7332;0;9378;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;236;6359;0;371;0;0;1;0;0;0;0;0;0;0;0;3;1;0;2;65535;19;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;0;7672;0;3155;0;0;6;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;1;7258;0;3451;0;0;5;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;2;7201;0;8988;0;1;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;3;7256;0;6286;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;4;7257;0;6323;0;0;4;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;5;7378;0;11699;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;0;3610;0;7158;0;6;64;0;0;1;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;61700;0;0;1770474310;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;1;2062;0;7300;0;6;68;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;46600;0;0;1770474312;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;2;5648;0;7251;0;6;82;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;68300;0;0;1770474314;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;3;5644;0;9348;0;6;55;0;0;0;0;4;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;64000;0;0;1770475483;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;4;7185;0;9347;0;1;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;3300;0;0;1770475490;0;255;255;255;255;255;255;0;0;254;254;254;254},'),
(23,'{1;0;23;0;586;0;7;107;135;1;1;1;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;3;4111;0;129;0;11;101;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770982801;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;4;4623;0;130;0;11;101;1;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770982801;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;5;5135;0;131;0;11;101;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770982801;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;6;5647;0;132;0;11;101;3;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770982801;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;7;6278;0;135;0;0;200;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770982801;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;8;6656;0;139;0;0;102;262;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;9;6669;0;10502;0;0;50;0;0;0;0;8;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;10;6676;0;138;0;2;32;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;11;6676;0;137;0;1;31;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;12;6366;0;468;0;0;0;0;0;0;0;0;0;0;0;14;65535;65535;65535;65535;18;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;13;6386;0;470;0;0;0;0;0;0;0;0;0;0;0;14;65535;65535;65535;65535;18;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;14;7182;0;578;0;0;4;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;255;254;254;254;254},{1;15;7290;0;493;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;16;7290;0;839;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;17;7171;0;4064;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;18;7171;0;4065;0;1;250;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;19;7209;0;896;0;0;5;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;20;7174;0;10471;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;21;6309;0;590;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;22;7171;0;4066;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;23;7171;0;4067;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;24;7171;0;4068;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;25;7171;0;4071;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;26;7184;0;10920;0;0;2;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;27;7581;0;1967;0;0;6;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;28;4634;0;13076;0;6;64;0;0;0;0;5;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;30;8431;0;13222;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;35;6396;0;471;0;0;0;0;0;0;0;0;0;0;0;14;65535;65535;65535;65535;18;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;42;7174;0;10473;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;43;6376;0;469;0;0;0;0;0;0;0;0;0;0;0;14;65535;65535;65535;65535;18;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;44;7174;0;10474;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;45;7174;0;10475;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;46;7174;0;10476;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;47;7174;0;10478;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;50;7174;0;10479;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;51;7174;0;10481;0;1;126;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;52;7174;0;10482;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;53;7174;0;10483;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;54;7174;0;10484;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;57;13;0;133;0;11;64;0;1;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770982801;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;66;3085;0;134;0;11;81;0;1;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770982801;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;236;6359;0;467;0;0;1;0;0;0;0;0;0;0;0;65534;65534;65534;65534;65535;18;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;0;7256;0;1279;0;0;8;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;1;7672;0;1304;0;0;9;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;2;7257;0;2293;0;0;3;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;3;7258;0;2468;0;0;4;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;4;7378;0;2933;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;5;7379;0;3039;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;6;7381;0;3099;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;7;7379;0;3453;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;9;6877;0;3707;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;12;6877;0;3765;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;13;7380;0;4412;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;14;7378;0;4636;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;15;7380;0;7242;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;16;7378;0;8428;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;17;7379;0;11302;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;18;7381;0;11403;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;0;5726;0;10376;0;1;73;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;41300;0;0;1770476436;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;1;5137;0;10423;0;1;81;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;42600;0;0;1770476437;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;2;5637;0;854;0;0;30;0;0;1;1;32;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;8500;0;0;1770470674;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;3;5128;0;968;0;0;44;0;0;0;0;4;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;22300;0;0;1770470654;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;4;3623;0;992;0;2;38;0;0;0;0;47;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;382300;0;0;1770470657;0;255;255;255;255;255;255;0;0;254;254;254;254},'),
(24,'{1;0;2090;0;1254;0;11;91;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770986088;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;1;2090;0;1255;0;11;91;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770986088;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;2;3792;0;1249;0;11;63;2;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770986088;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;3;4304;0;1250;0;11;63;2;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770986088;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;4;4816;0;1251;0;11;63;2;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770986088;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;5;5328;0;1252;0;11;63;2;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770986088;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;6;5840;0;1253;0;11;63;3;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770986088;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;7;6277;0;1256;0;0;200;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770986088;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;12;7695;0;3700;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;13;7171;0;4452;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;14;7171;0;4453;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;15;7171;0;4455;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;16;7171;0;4456;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;17;6635;0;4382;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;18;7174;0;4457;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;19;7174;0;4458;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;21;7174;0;4459;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;22;7174;0;4460;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;23;7174;0;4461;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;24;7174;0;4463;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;25;7209;0;4502;0;0;2;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;26;7190;0;7124;0;0;3;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;27;7581;0;9412;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;28;7179;0;10441;0;1;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;29;6676;0;1259;0;2;32;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;32;7189;0;1511;0;3;2;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;33;7168;0;1530;0;6;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;34;7454;0;1257;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;35;6676;0;1258;0;1;31;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;39;6656;0;1260;0;0;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;40;7168;0;2788;0;3;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;0;7672;0;4329;0;0;9;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;1;7378;0;6043;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;2;7380;0;7032;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;3;7257;0;8658;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;4;7379;0;9742;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;5;7256;0;10109;0;0;3;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;6;7379;0;10499;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;7;7379;0;11622;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;8;7381;0;11995;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;9;7258;0;12717;0;0;4;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;10;7378;0;13050;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;12;6177;0;13298;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;14;7379;0;13865;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;0;2048;0;1575;0;4;24;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;370;0;0;1770471103;0;255;255;255;255;255;255;0;0;254;254;254;254},'),
(25,'{1;0;32;0;1438;0;11;86;0;1;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770986334;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;1;32;0;1439;0;11;86;0;1;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770986334;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;2;3643;0;1434;0;11;73;31;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770986334;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;3;4155;0;1435;0;11;73;24;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770986334;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;4;4667;0;1436;0;11;73;28;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770986334;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;6;5691;0;1437;0;11;73;45;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770986334;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;7;6279;0;1440;0;0;200;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770986334;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;9;6681;0;2970;0;0;50;0;0;1;1;20;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;10;6676;0;1443;0;2;32;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;11;6676;0;1442;0;1;31;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;12;7190;0;4026;0;0;2;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;13;7181;0;2786;0;0;2;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;14;7182;0;4063;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;15;7196;0;5875;0;4;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;16;7196;0;6723;0;4;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;17;6366;0;1884;0;0;0;0;0;0;0;0;0;0;0;14;65535;65535;65535;65535;19;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;18;7196;0;8931;0;5;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;19;7171;0;1833;0;1;246;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;20;6396;0;1887;0;0;0;0;0;0;0;0;0;0;0;14;65535;65535;65535;65535;19;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;21;7196;0;9440;0;4;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;22;7186;0;8586;0;1;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;23;7179;0;9131;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;24;7184;0;9244;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;25;7179;0;9374;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;26;6673;0;8585;0;1;129;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;27;7171;0;1836;0;1;254;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;28;7581;0;1743;0;0;7;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;29;7171;0;1837;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;30;7171;0;1838;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;31;7171;0;1839;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;32;7171;0;1840;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;33;7171;0;1844;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;35;7171;0;1846;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;36;7171;0;1847;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;37;7171;0;1848;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;38;7171;0;1849;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;39;7171;0;1850;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;40;7171;0;1853;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;41;7171;0;1854;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;42;7171;0;1855;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;43;7171;0;1856;0;1;247;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;44;7171;0;1857;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;45;7171;0;1858;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;46;7174;0;1859;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;47;7174;0;1860;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;48;7174;0;1862;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;49;7174;0;1863;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;50;7174;0;1864;0;1;210;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;51;7179;0;12192;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;52;7174;0;1866;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;53;6703;0;1872;0;0;10;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;54;6702;0;1875;0;0;10;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;55;7280;0;1877;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;56;7280;0;1878;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;57;7281;0;1880;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;58;7179;0;11878;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;59;7179;0;12204;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;60;6376;0;1885;0;0;0;0;0;0;0;0;0;0;0;14;65535;65535;65535;65535;19;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;61;6386;0;1886;0;0;0;0;0;0;0;0;0;0;0;14;65535;65535;65535;65535;19;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;62;7179;0;9981;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;63;7179;0;10027;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;64;7197;0;10104;0;5;3;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;65;7196;0;11405;0;4;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;66;7179;0;12635;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;67;7179;0;12851;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;68;6683;0;10207;0;0;50;0;0;0;0;1;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;69;7179;0;10843;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;70;7179;0;10938;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;71;7179;0;11239;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;72;7196;0;10749;0;4;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;73;7179;0;11400;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;74;7179;0;11477;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;75;7197;0;11582;0;4;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;236;6359;0;1883;0;0;1;0;0;0;0;0;0;0;0;65534;65534;65534;65534;65535;19;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;0;6876;0;3538;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;1;6876;0;3559;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;2;6876;0;3658;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},'),
(26,'{1;0;1549;0;2121;0;11;55;0;1;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770987003;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;1;3101;0;2122;0;11;52;0;1;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770987003;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;2;3675;0;2116;0;11;49;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770987003;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;3;4187;0;2117;0;11;57;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770987003;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;4;4699;0;2118;0;11;51;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770987003;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;5;5211;0;2119;0;11;45;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770987003;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;6;5723;0;2120;0;11;47;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770987003;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;7;6422;0;2123;0;0;200;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770987003;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;8;6656;0;2127;0;0;255;38;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;13;6676;0;2125;0;1;31;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;14;6676;0;2126;0;2;32;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;15;7171;0;2408;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;16;7171;0;2410;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;17;7174;0;2414;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;18;7174;0;2415;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;19;7174;0;2416;0;1;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;236;6359;0;2319;0;0;1;0;0;0;0;0;0;0;0;0;1;3;2;65535;19;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},'),
(27,'{1;12;3585;0;2453;0;11;89;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770987387;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;14;4097;0;2454;0;11;89;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770987387;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;16;4609;0;2455;0;11;89;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770987387;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;18;5121;0;2456;0;11;89;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770987387;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;28;5633;0;2457;0;11;89;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770987387;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;32;13;0;2458;0;11;64;0;1;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770987387;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;33;3085;0;2459;0;11;81;0;1;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770987387;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;35;7454;0;2461;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;38;6676;0;2462;0;1;31;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;39;6676;0;2463;0;2;32;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;43;6656;0;2464;0;0;255;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;44;6278;0;2460;0;0;200;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770987387;0;255;255;255;255;255;255;0;0;254;254;254;254},'),
(28,'{1;0;2565;0;3600;0;11;87;0;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770988482;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;1;2630;0;3770;0;9;75;0;0;1;4;23;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;2;3819;0;3595;0;11;57;10;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770988482;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;3;4331;0;3596;0;11;57;12;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770988482;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;4;4843;0;3597;0;11;57;23;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770988482;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;5;5355;0;3598;0;11;57;7;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770988482;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;6;5867;0;3599;0;11;57;23;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770988482;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;7;6298;0;3601;0;0;200;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770988482;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;8;6656;0;3605;0;0;210;12;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;10;6678;0;5470;0;0;49;36;0;1;1;4;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;11;6665;0;11263;0;0;50;111;0;0;2;13;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;12;7280;0;11145;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;13;7280;0;11147;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;14;7168;0;4214;0;0;4;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;15;6676;0;3604;0;2;32;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;16;7181;0;7538;0;0;5;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;255;254;254;254;254},{1;18;7239;0;7540;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;19;7280;0;11149;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;20;7238;0;11290;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;21;10741;0;11294;0;0;4;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;22;6676;0;3603;0;1;31;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;23;7279;0;6994;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;24;10742;0;7532;0;0;3;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;25;6703;0;7374;0;0;10;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;26;6702;0;7378;0;0;10;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;27;7278;0;7834;0;0;3;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;28;7189;0;7850;0;3;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;29;10743;0;11179;0;0;4;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;30;6670;0;7913;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;31;4699;0;6014;0;6;38;0;0;0;4;57;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;33;7197;0;8326;0;3;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;35;7184;0;11884;0;0;20;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;255;254;254;254;254},{1;36;10743;0;11197;0;0;5;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;37;7239;0;11255;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;45;7581;0;4241;0;0;5;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;53;7124;0;4577;0;0;3;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;236;6359;0;3664;0;0;1;0;0;0;0;0;0;0;0;0;2;3;1;65535;20;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;0;7257;0;5539;0;0;7;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;1;7258;0;6610;0;0;7;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;2;7380;0;5675;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;3;7381;0;9995;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;4;7379;0;6074;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;5;7380;0;6194;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;6;7378;0;6347;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;7;7378;0;6477;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;10;7380;0;6526;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;11;7379;0;6581;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;12;7380;0;10448;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;13;7672;0;5806;0;0;5;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;14;7378;0;10629;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{9;16;7256;0;5452;0;0;3;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;0;7730;0;3733;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;152200;0;0;1770477178;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;1;4646;0;11598;0;6;82;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;117200;0;0;1770477857;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;2;16;0;11536;0;6;92;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;60500;0;0;1770477860;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;3;4191;0;11551;0;6;90;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;117200;0;0;1770477862;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;4;7727;0;3790;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;41700;0;0;1770477177;0;255;255;255;255;255;255;0;0;254;254;254;254},'),
(29,'{1;0;1039;0;10200;0;5;62;272;1;1;1;33;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;1;3080;0;4390;0;11;67;0;1;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770989448;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;2;3609;0;4384;0;11;63;129;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770989448;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;3;4121;0;4385;0;11;63;91;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770989448;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;4;4633;0;4386;0;11;63;98;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770989448;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;5;5145;0;4387;0;11;63;95;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770989448;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;6;5657;0;4388;0;11;63;151;0;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770989448;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;7;6274;0;4391;0;0;200;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770989448;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;9;6681;0;10220;0;0;50;0;0;0;0;32;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;10;6678;0;10264;0;0;50;415;0;0;0;4;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;11;6680;0;10523;0;0;50;415;0;0;0;2;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;12;7581;0;4631;0;0;5;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;13;7179;0;13148;0;4;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;14;7290;0;5754;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;15;7209;0;6141;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;16;7182;0;6396;0;0;5;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;17;7190;0;7897;0;0;3;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;18;7179;0;13449;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;19;7179;0;13465;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;20;7210;0;10608;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;21;6366;0;10311;0;0;0;0;0;0;0;0;0;0;0;14;65535;65535;65535;65535;19;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;22;6676;0;4393;0;1;31;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;23;6676;0;4394;0;2;32;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;24;7184;0;10656;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;255;254;254;254;254},{1;25;7179;0;13969;0;0;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;26;6159;0;10699;0;0;1;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;255;254;254;254;254},{1;27;7179;0;14129;0;4;0;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;32;6386;0;10313;0;0;0;0;0;0;0;0;0;0;0;14;65535;65535;65535;65535;19;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;35;6376;0;10312;0;0;0;0;0;0;0;0;0;0;0;14;65535;65535;65535;65535;19;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;36;6396;0;10314;0;0;0;0;0;0;0;0;0;0;0;14;65535;65535;65535;65535;19;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;52;1032;0;4389;0;11;61;0;1;1;0;63;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;1770989448;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;61;7174;0;4444;0;1;154;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;70;7174;0;4443;0;1;187;0;0;0;0;0;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{1;236;6359;0;10310;0;0;1;0;0;0;0;0;0;0;0;65534;65534;65534;65534;65535;19;0;0;0;0;0;0;0;0;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;0;18;0;10581;0;0;86;0;1;1;1;33;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;2181400;0;0;1770476577;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;1;3625;0;10607;0;0;54;0;0;1;1;32;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;166800;0;0;1770476595;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;2;6678;0;10697;0;0;50;0;0;0;0;16;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;71800;0;0;1770476725;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;3;4123;0;10698;0;0;70;0;0;1;1;1;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;351300;0;0;1770476727;0;255;255;255;255;255;255;0;0;254;254;254;254},{12;4;4625;0;10582;0;0;80;0;0;1;1;1;0;0;0;65535;65535;65535;65535;65535;255;0;0;0;0;355700;0;0;1770476567;0;255;255;255;255;255;255;0;0;254;254;254;254},');
/*!40000 ALTER TABLE `character_item_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_item_pentagram`
--

DROP TABLE IF EXISTS `character_item_pentagram`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_item_pentagram` (
  `GUID` int(11) NOT NULL,
  `PentagramInventoryData` varbinary(65525) DEFAULT NULL,
  `INV_TYPE` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`GUID`,`INV_TYPE`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_item_pentagram`
--

LOCK TABLES `character_item_pentagram` WRITE;
/*!40000 ALTER TABLE `character_item_pentagram` DISABLE KEYS */;
INSERT INTO `character_item_pentagram` VALUES
(3,'',1),
(11,'',1),
(12,'',1),
(13,'',1),
(14,'',1),
(15,'',1),
(17,'',0),
(17,'',1),
(18,'',1),
(20,'',0),
(20,'',1),
(21,'{0;0;19;12;252;0;14;0;15;15;15;15;15;15;15;15;0;111;0;0;0;0;0},{0;1;19;12;242;0;14;0;15;15;15;15;15;15;15;15;0;110;0;0;0;0;0},{0;2;19;12;222;0;14;0;15;15;15;15;15;15;15;15;0;108;0;0;0;0;0},{0;3;19;12;232;0;14;0;15;15;15;15;15;15;15;15;0;109;0;0;0;0;0},',0),
(21,'',1),
(22,'{0;0;19;12;242;0;14;0;15;15;15;15;15;15;15;15;0;374;0;0;0;0;0},{0;1;19;12;232;0;14;0;15;15;15;15;15;15;15;15;0;373;0;0;0;0;0},{0;2;19;12;252;0;14;0;15;15;15;15;15;15;15;15;0;375;0;0;0;0;0},{0;3;19;12;222;0;14;0;15;15;15;15;15;15;15;15;0;372;0;0;0;0;0},',0),
(22,'',1),
(23,'',0),
(24,'',0),
(25,'',0),
(26,'{0;0;19;12;222;0;14;0;15;15;15;15;15;15;15;15;0;2320;0;0;0;0;0},{0;1;19;12;232;0;14;0;15;15;15;15;15;15;15;15;0;2321;0;0;0;0;0},{0;2;19;12;252;0;14;0;15;15;15;15;15;15;15;15;0;2323;0;0;0;0;0},{0;3;19;12;242;0;14;0;15;15;15;15;15;15;15;15;0;2322;0;0;0;0;0},',0),
(27,'',0),
(28,'{0;0;20;12;222;0;14;0;15;15;15;15;15;15;15;15;0;3665;0;0;0;0;0},{0;1;20;12;252;0;14;0;15;15;15;15;15;15;15;15;0;3668;0;0;0;0;0},{0;2;20;12;232;0;14;0;15;15;15;15;15;15;15;15;0;3666;0;0;0;0;0},{0;3;20;12;242;0;14;0;15;15;15;15;15;15;15;15;0;3667;0;0;0;0;0},',0),
(29,'',0);
/*!40000 ALTER TABLE `character_item_pentagram` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_jewel_bingo`
--

DROP TABLE IF EXISTS `character_jewel_bingo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_jewel_bingo` (
  `char_id` int(10) unsigned NOT NULL,
  `state` tinyint(3) unsigned DEFAULT NULL,
  `box` tinyint(3) unsigned DEFAULT NULL,
  `count` tinyint(3) unsigned DEFAULT NULL,
  `jewel` tinyint(3) unsigned DEFAULT NULL,
  `score1` int(11) DEFAULT NULL,
  `score2` int(11) DEFAULT NULL,
  `score3` int(11) DEFAULT NULL,
  `date` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_jewel_bingo`
--

LOCK TABLES `character_jewel_bingo` WRITE;
/*!40000 ALTER TABLE `character_jewel_bingo` DISABLE KEYS */;
INSERT INTO `character_jewel_bingo` VALUES
(17,0,0,0,0,0,0,0,0),
(20,0,0,0,0,0,0,0,0),
(21,0,0,0,0,0,0,0,0),
(22,0,0,0,0,0,0,0,0),
(23,0,0,0,0,0,0,0,0),
(24,0,0,0,0,0,0,0,0),
(25,0,0,0,0,0,0,0,0),
(26,0,0,0,0,0,0,0,0),
(27,0,0,0,0,0,0,0,0),
(28,0,0,0,0,0,0,0,0),
(29,0,0,0,0,0,0,0,0);
/*!40000 ALTER TABLE `character_jewel_bingo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_jewel_bingo_grid`
--

DROP TABLE IF EXISTS `character_jewel_bingo_grid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_jewel_bingo_grid` (
  `char_id` int(10) unsigned NOT NULL,
  `type` tinyint(3) unsigned DEFAULT NULL,
  `slot` tinyint(3) unsigned DEFAULT NULL,
  `value` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_jewel_bingo_grid`
--

LOCK TABLES `character_jewel_bingo_grid` WRITE;
/*!40000 ALTER TABLE `character_jewel_bingo_grid` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_jewel_bingo_grid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_kick`
--

DROP TABLE IF EXISTS `character_kick`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_kick` (
  `char_id` int(10) unsigned NOT NULL,
  `character_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_kick`
--

LOCK TABLES `character_kick` WRITE;
/*!40000 ALTER TABLE `character_kick` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_kick` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_labyrinth`
--

DROP TABLE IF EXISTS `character_labyrinth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_labyrinth` (
  `char_id` int(10) unsigned NOT NULL,
  `stage` tinyint(3) unsigned DEFAULT NULL,
  `id` tinyint(3) unsigned DEFAULT NULL,
  `level` smallint(5) unsigned DEFAULT NULL,
  `status` tinyint(3) unsigned DEFAULT NULL,
  `killed_monsters` int(11) DEFAULT NULL,
  `earned_experience` bigint(20) DEFAULT NULL,
  `completed_missions` int(11) DEFAULT NULL,
  `date` bigint(20) DEFAULT NULL,
  `goblin_state` tinyint(3) unsigned DEFAULT NULL,
  `day_first` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_labyrinth`
--

LOCK TABLES `character_labyrinth` WRITE;
/*!40000 ALTER TABLE `character_labyrinth` DISABLE KEYS */;
INSERT INTO `character_labyrinth` VALUES
(17,0,255,0,0,0,0,0,0,0,0),
(20,0,234,2,6,74,24,4842,637,0,0),
(21,0,234,2,6,88,174,24725,13337,0,0),
(22,0,234,2,6,61,7,756,533,0,0),
(23,0,234,2,6,23,26,2534,2224,38,0),
(24,0,255,0,0,0,0,0,0,0,0),
(25,0,255,0,0,0,0,0,0,0,0),
(26,0,255,0,0,0,0,0,0,0,0),
(27,0,255,0,0,0,0,0,0,0,0),
(28,0,234,2,6,74,490,109624,15119,0,0),
(29,0,234,2,6,34,9,13919,0,0,6);
/*!40000 ALTER TABLE `character_labyrinth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_labyrinth_level`
--

DROP TABLE IF EXISTS `character_labyrinth_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_labyrinth_level` (
  `char_id` int(10) unsigned NOT NULL,
  `level` smallint(5) unsigned DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_labyrinth_level`
--

LOCK TABLES `character_labyrinth_level` WRITE;
/*!40000 ALTER TABLE `character_labyrinth_level` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_labyrinth_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_labyrinth_zone`
--

DROP TABLE IF EXISTS `character_labyrinth_zone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_labyrinth_zone` (
  `char_id` int(10) unsigned NOT NULL,
  `idx` tinyint(3) unsigned NOT NULL,
  `subidx` tinyint(3) unsigned NOT NULL,
  `mission_id_1` tinyint(3) unsigned DEFAULT NULL,
  `mission_id_2` tinyint(3) unsigned DEFAULT NULL,
  `mission_id_3` tinyint(3) unsigned DEFAULT NULL,
  `mission_id_4` tinyint(3) unsigned DEFAULT NULL,
  `mission_id_5` tinyint(3) unsigned DEFAULT NULL,
  `mission_count_1` int(11) DEFAULT NULL,
  `mission_count_2` int(11) DEFAULT NULL,
  `mission_count_3` int(11) DEFAULT NULL,
  `mission_count_4` int(11) DEFAULT NULL,
  `mission_count_5` int(11) DEFAULT NULL,
  PRIMARY KEY (`char_id`,`idx`,`subidx`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_labyrinth_zone`
--

LOCK TABLES `character_labyrinth_zone` WRITE;
/*!40000 ALTER TABLE `character_labyrinth_zone` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_labyrinth_zone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_mail`
--

DROP TABLE IF EXISTS `character_mail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_mail` (
  `id` int(10) unsigned NOT NULL,
  `char_id` int(10) unsigned DEFAULT NULL,
  `from_id` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `direction` tinyint(3) unsigned DEFAULT NULL,
  `action` tinyint(3) unsigned DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `window_guid` int(10) unsigned DEFAULT NULL,
  `date` bigint(20) DEFAULT NULL,
  `opened` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_mail`
--

LOCK TABLES `character_mail` WRITE;
/*!40000 ALTER TABLE `character_mail` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_mail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_majestic_stats`
--

DROP TABLE IF EXISTS `character_majestic_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_majestic_stats` (
  `char_id` int(10) unsigned NOT NULL,
  `id` tinyint(3) unsigned NOT NULL,
  `level` smallint(5) unsigned DEFAULT NULL,
  PRIMARY KEY (`char_id`,`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_majestic_stats`
--

LOCK TABLES `character_majestic_stats` WRITE;
/*!40000 ALTER TABLE `character_majestic_stats` DISABLE KEYS */;
INSERT INTO `character_majestic_stats` VALUES
(17,0,0),
(17,1,0),
(17,2,0),
(17,3,0),
(17,4,0),
(20,0,0),
(20,1,0),
(20,2,0),
(20,3,0),
(20,4,0),
(21,0,0),
(21,1,0),
(21,2,0),
(21,3,0),
(21,4,0),
(22,0,0),
(22,1,0),
(22,2,0),
(22,3,0),
(22,4,0),
(23,0,0),
(23,1,0),
(23,2,0),
(23,3,0),
(23,4,0),
(24,0,0),
(24,1,0),
(24,2,0),
(24,3,0),
(24,4,0),
(25,0,0),
(25,1,0),
(25,2,0),
(25,3,0),
(25,4,0),
(26,0,0),
(26,1,0),
(26,2,0),
(26,3,0),
(26,4,0),
(27,0,0),
(27,1,0),
(27,2,0),
(27,3,0),
(27,4,0),
(28,0,0),
(28,1,0),
(28,2,0),
(28,3,0),
(28,4,0),
(29,0,0),
(29,1,0),
(29,2,0),
(29,3,0),
(29,4,0);
/*!40000 ALTER TABLE `character_majestic_stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_majestic_tree`
--

DROP TABLE IF EXISTS `character_majestic_tree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_majestic_tree` (
  `char_id` int(10) unsigned NOT NULL,
  `type` tinyint(3) unsigned DEFAULT NULL,
  `section` tinyint(3) unsigned DEFAULT NULL,
  `id` smallint(5) unsigned NOT NULL,
  `level` tinyint(3) unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_majestic_tree`
--

LOCK TABLES `character_majestic_tree` WRITE;
/*!40000 ALTER TABLE `character_majestic_tree` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_majestic_tree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_mini_bomb`
--

DROP TABLE IF EXISTS `character_mini_bomb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_mini_bomb` (
  `char_id` int(10) unsigned NOT NULL,
  `state` tinyint(3) unsigned DEFAULT NULL,
  `score` smallint(5) unsigned DEFAULT NULL,
  `total_score` int(11) DEFAULT NULL,
  `cdate` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_mini_bomb`
--

LOCK TABLES `character_mini_bomb` WRITE;
/*!40000 ALTER TABLE `character_mini_bomb` DISABLE KEYS */;
INSERT INTO `character_mini_bomb` VALUES
(17,1,0,0,1770269190),
(20,1,0,0,1770375747),
(21,1,0,0,1770379266),
(22,1,0,0,1770377224),
(23,1,0,0,1770379300),
(24,1,0,0,0),
(25,1,0,0,0),
(26,1,0,0,1770382283),
(27,1,0,0,0),
(28,1,0,0,1770392010),
(29,1,0,0,1770392062);
/*!40000 ALTER TABLE `character_mini_bomb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_mini_bomb_grid`
--

DROP TABLE IF EXISTS `character_mini_bomb_grid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_mini_bomb_grid` (
  `char_id` int(10) unsigned NOT NULL,
  `cell` tinyint(3) unsigned DEFAULT NULL,
  `value` tinyint(3) unsigned DEFAULT NULL,
  `status` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_mini_bomb_grid`
--

LOCK TABLES `character_mini_bomb_grid` WRITE;
/*!40000 ALTER TABLE `character_mini_bomb_grid` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_mini_bomb_grid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_monster_soul`
--

DROP TABLE IF EXISTS `character_monster_soul`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_monster_soul` (
  `char_id` int(10) unsigned NOT NULL,
  `type` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL,
  `amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`char_id`,`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_monster_soul`
--

LOCK TABLES `character_monster_soul` WRITE;
/*!40000 ALTER TABLE `character_monster_soul` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_monster_soul` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_mu_roomy`
--

DROP TABLE IF EXISTS `character_mu_roomy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_mu_roomy` (
  `char_id` int(10) unsigned NOT NULL,
  `playing` tinyint(3) unsigned DEFAULT NULL,
  `type` tinyint(3) unsigned DEFAULT NULL,
  `score` smallint(5) unsigned DEFAULT NULL,
  `card_count` tinyint(3) unsigned DEFAULT NULL,
  `special_card_count` tinyint(3) unsigned DEFAULT NULL,
  `date` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_mu_roomy`
--

LOCK TABLES `character_mu_roomy` WRITE;
/*!40000 ALTER TABLE `character_mu_roomy` DISABLE KEYS */;
INSERT INTO `character_mu_roomy` VALUES
(17,0,0,0,0,0,1770219028),
(20,0,0,0,0,0,1770375538),
(21,0,0,0,0,0,1770375855),
(22,0,0,0,0,0,1770376043),
(23,0,0,0,0,0,1770378001),
(24,0,0,0,0,0,1770381288),
(25,0,0,0,0,0,1770381534),
(26,0,0,0,0,0,1770382203),
(27,0,0,0,0,0,1770382587),
(28,0,0,0,0,0,1770383682),
(29,0,0,0,0,0,1770384648);
/*!40000 ALTER TABLE `character_mu_roomy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_mu_roomy_deck`
--

DROP TABLE IF EXISTS `character_mu_roomy_deck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_mu_roomy_deck` (
  `char_id` int(10) unsigned DEFAULT NULL,
  `type` tinyint(3) unsigned DEFAULT NULL,
  `slot` tinyint(3) unsigned DEFAULT NULL,
  `color` tinyint(3) unsigned DEFAULT NULL,
  `number` tinyint(3) unsigned DEFAULT NULL,
  `state` tinyint(3) unsigned DEFAULT NULL,
  `play_slot` tinyint(3) unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_mu_roomy_deck`
--

LOCK TABLES `character_mu_roomy_deck` WRITE;
/*!40000 ALTER TABLE `character_mu_roomy_deck` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_mu_roomy_deck` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_mupass`
--

DROP TABLE IF EXISTS `character_mupass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_mupass` (
  `guid` bigint(20) NOT NULL AUTO_INCREMENT,
  `character_id` bigint(20) DEFAULT NULL,
  `pass_level` int(11) DEFAULT NULL,
  `pass_exp` bigint(20) DEFAULT NULL,
  `gold_enabled` tinyint(1) DEFAULT NULL,
  `premiun_enabled` tinyint(1) DEFAULT NULL,
  `MuRevardEnabled` tinyint(1) DEFAULT NULL,
  `MuRevardGoldEnabled` tinyint(1) DEFAULT NULL,
  `MuRevardPremiumEnabled` tinyint(1) DEFAULT NULL,
  `TodayMuPassExp` int(11) DEFAULT NULL,
  `pass_data` varbinary(30000) DEFAULT NULL,
  `pass_reward_data` varbinary(30000) DEFAULT NULL,
  `ticketCount` bigint(20) DEFAULT 0,
  PRIMARY KEY (`guid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=26063 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_mupass`
--

LOCK TABLES `character_mupass` WRITE;
/*!40000 ALTER TABLE `character_mupass` DISABLE KEYS */;
INSERT INTO `character_mupass` VALUES
(24154,17,0,0,0,0,0,0,0,0,'','{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},',0),
(24611,26,0,15,0,0,0,0,0,0,'','{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},',0),
(24631,27,0,0,0,0,0,0,0,0,'','{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},',0),
(25790,28,0,20,0,0,0,0,0,0,'','{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},',0),
(25791,22,0,57,0,0,0,0,0,0,'','{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},',0),
(25969,21,0,90,0,0,0,0,0,0,'','{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},',0),
(25988,24,0,55,0,0,0,0,0,0,'','{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},',0),
(25997,25,0,95,0,0,0,0,0,0,'','{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},',0),
(25998,29,0,80,0,0,0,0,0,0,'','{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},',0),
(26001,23,0,95,0,0,0,0,0,0,'{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;1},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;1},','{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},',0),
(26062,20,0,70,0,0,0,0,0,0,'{1070;0;0},{499;0;0},{11105;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;1},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;1},','{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},{0;0;0},',0);
/*!40000 ALTER TABLE `character_mupass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_notification`
--

DROP TABLE IF EXISTS `character_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_notification` (
  `server_group` smallint(5) unsigned NOT NULL,
  `char_name` varchar(45) DEFAULT NULL,
  `facebook_id` varchar(45) DEFAULT NULL,
  `notification_id` varchar(45) DEFAULT NULL,
  `notification_data` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`server_group`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_notification`
--

LOCK TABLES `character_notification` WRITE;
/*!40000 ALTER TABLE `character_notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_numeric_baseball`
--

DROP TABLE IF EXISTS `character_numeric_baseball`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_numeric_baseball` (
  `char_id` int(10) unsigned NOT NULL,
  `state` tinyint(3) unsigned DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `number_1` tinyint(3) unsigned DEFAULT NULL,
  `number_2` tinyint(3) unsigned DEFAULT NULL,
  `number_3` tinyint(3) unsigned DEFAULT NULL,
  `numbers` varchar(255) DEFAULT NULL,
  `strikes` varchar(255) DEFAULT NULL,
  `balls` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_numeric_baseball`
--

LOCK TABLES `character_numeric_baseball` WRITE;
/*!40000 ALTER TABLE `character_numeric_baseball` DISABLE KEYS */;
INSERT INTO `character_numeric_baseball` VALUES
(17,0,0,255,255,255,'255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 ','0 0 0 0 0 ','0 0 0 0 0 '),
(20,0,0,255,255,255,'255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 ','0 0 0 0 0 ','0 0 0 0 0 '),
(21,0,0,255,255,255,'255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 ','0 0 0 0 0 ','0 0 0 0 0 '),
(22,0,0,255,255,255,'255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 ','0 0 0 0 0 ','0 0 0 0 0 '),
(23,0,0,255,255,255,'255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 ','0 0 0 0 0 ','0 0 0 0 0 '),
(24,0,0,255,255,255,'255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 ','0 0 0 0 0 ','0 0 0 0 0 '),
(25,0,0,255,255,255,'255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 ','0 0 0 0 0 ','0 0 0 0 0 '),
(26,0,0,255,255,255,'255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 ','0 0 0 0 0 ','0 0 0 0 0 '),
(27,0,0,255,255,255,'255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 ','0 0 0 0 0 ','0 0 0 0 0 '),
(28,0,0,255,255,255,'255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 ','0 0 0 0 0 ','0 0 0 0 0 '),
(29,0,0,255,255,255,'255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 ','0 0 0 0 0 ','0 0 0 0 0 ');
/*!40000 ALTER TABLE `character_numeric_baseball` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_quest_evo`
--

DROP TABLE IF EXISTS `character_quest_evo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_quest_evo` (
  `char_id` int(10) unsigned NOT NULL,
  `id` tinyint(3) unsigned NOT NULL,
  `state` tinyint(3) unsigned DEFAULT NULL,
  `kill_count_1` int(11) DEFAULT NULL,
  `kill_count_2` int(11) DEFAULT NULL,
  `kill_count_3` int(11) DEFAULT NULL,
  `kill_count_4` int(11) DEFAULT NULL,
  `kill_count_5` int(11) DEFAULT NULL,
  PRIMARY KEY (`char_id`,`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_quest_evo`
--

LOCK TABLES `character_quest_evo` WRITE;
/*!40000 ALTER TABLE `character_quest_evo` DISABLE KEYS */;
INSERT INTO `character_quest_evo` VALUES
(17,0,3,0,0,0,0,0),
(17,1,3,0,0,0,0,0),
(17,2,3,0,0,0,0,0),
(17,3,3,0,0,0,0,0),
(17,4,3,0,0,0,0,0),
(17,5,3,0,0,0,0,0),
(17,6,3,0,0,0,0,0),
(17,7,3,0,0,0,0,0),
(17,8,3,0,0,0,0,0),
(17,9,3,0,0,0,0,0),
(17,10,3,0,0,0,0,0),
(17,11,3,0,0,0,0,0),
(17,12,3,0,0,0,0,0),
(17,13,3,0,0,0,0,0),
(17,14,3,0,0,0,0,0),
(20,0,3,0,0,0,0,0),
(20,1,3,0,0,0,0,0),
(20,2,3,0,0,0,0,0),
(20,3,3,0,0,0,0,0),
(20,4,3,0,0,0,0,0),
(20,5,3,0,0,0,0,0),
(20,6,3,0,0,0,0,0),
(20,7,3,0,0,0,0,0),
(20,8,3,0,0,0,0,0),
(20,9,3,0,0,0,0,0),
(20,10,3,0,0,0,0,0),
(20,11,3,0,0,0,0,0),
(20,12,3,0,0,0,0,0),
(20,13,3,0,0,0,0,0),
(20,14,3,0,0,0,0,0),
(21,0,3,0,0,0,0,0),
(21,1,3,0,0,0,0,0),
(21,2,3,0,0,0,0,0),
(21,3,3,0,0,0,0,0),
(21,4,3,0,0,0,0,0),
(21,5,3,0,0,0,0,0),
(21,6,3,0,0,0,0,0),
(21,7,3,0,0,0,0,0),
(21,8,3,0,0,0,0,0),
(21,9,3,0,0,0,0,0),
(21,10,3,0,0,0,0,0),
(21,11,3,0,0,0,0,0),
(21,12,3,0,0,0,0,0),
(21,13,3,0,0,0,0,0),
(21,14,3,0,0,0,0,0),
(22,0,3,0,0,0,0,0),
(22,1,3,0,0,0,0,0),
(22,2,3,0,0,0,0,0),
(22,3,3,0,0,0,0,0),
(22,4,3,0,0,0,0,0),
(22,5,3,0,0,0,0,0),
(22,6,3,0,0,0,0,0),
(22,7,3,0,0,0,0,0),
(22,8,3,0,0,0,0,0),
(22,9,3,0,0,0,0,0),
(22,10,3,0,0,0,0,0),
(22,11,3,0,0,0,0,0),
(22,12,3,0,0,0,0,0),
(22,13,3,0,0,0,0,0),
(22,14,3,0,0,0,0,0),
(23,0,3,0,0,0,0,0),
(23,1,3,0,0,0,0,0),
(23,2,3,0,0,0,0,0),
(23,3,3,0,0,0,0,0),
(23,4,3,0,0,0,0,0),
(23,5,3,0,0,0,0,0),
(23,6,3,0,0,0,0,0),
(23,7,3,0,0,0,0,0),
(23,8,3,0,0,0,0,0),
(23,9,3,0,0,0,0,0),
(23,10,3,0,0,0,0,0),
(23,11,3,0,0,0,0,0),
(23,12,3,0,0,0,0,0),
(23,13,3,0,0,0,0,0),
(23,14,3,0,0,0,0,0),
(24,0,3,0,0,0,0,0),
(24,1,3,0,0,0,0,0),
(24,2,3,0,0,0,0,0),
(24,3,3,0,0,0,0,0),
(24,4,3,0,0,0,0,0),
(24,5,3,0,0,0,0,0),
(24,6,3,0,0,0,0,0),
(24,7,3,0,0,0,0,0),
(24,8,3,0,0,0,0,0),
(24,9,3,0,0,0,0,0),
(24,10,3,0,0,0,0,0),
(24,11,3,0,0,0,0,0),
(24,12,3,0,0,0,0,0),
(24,13,3,0,0,0,0,0),
(24,14,3,0,0,0,0,0),
(25,0,3,0,0,0,0,0),
(25,1,3,0,0,0,0,0),
(25,2,3,0,0,0,0,0),
(25,3,3,0,0,0,0,0),
(25,4,3,0,0,0,0,0),
(25,5,3,0,0,0,0,0),
(25,6,3,0,0,0,0,0),
(25,7,3,0,0,0,0,0),
(25,8,3,0,0,0,0,0),
(25,9,3,0,0,0,0,0),
(25,10,3,0,0,0,0,0),
(25,11,3,0,0,0,0,0),
(25,12,3,0,0,0,0,0),
(25,13,3,0,0,0,0,0),
(25,14,3,0,0,0,0,0),
(26,0,3,0,0,0,0,0),
(26,1,3,0,0,0,0,0),
(26,2,3,0,0,0,0,0),
(26,3,3,0,0,0,0,0),
(26,4,3,0,0,0,0,0),
(26,5,3,0,0,0,0,0),
(26,6,3,0,0,0,0,0),
(26,7,3,0,0,0,0,0),
(26,8,3,0,0,0,0,0),
(26,9,3,0,0,0,0,0),
(26,10,3,0,0,0,0,0),
(26,11,3,0,0,0,0,0),
(26,12,3,0,0,0,0,0),
(26,13,3,0,0,0,0,0),
(26,14,3,0,0,0,0,0),
(27,0,3,0,0,0,0,0),
(27,1,3,0,0,0,0,0),
(27,2,3,0,0,0,0,0),
(27,3,3,0,0,0,0,0),
(27,4,3,0,0,0,0,0),
(27,5,3,0,0,0,0,0),
(27,6,3,0,0,0,0,0),
(27,7,3,0,0,0,0,0),
(27,8,3,0,0,0,0,0),
(27,9,3,0,0,0,0,0),
(27,10,3,0,0,0,0,0),
(27,11,3,0,0,0,0,0),
(27,12,3,0,0,0,0,0),
(27,13,3,0,0,0,0,0),
(27,14,3,0,0,0,0,0),
(28,0,3,0,0,0,0,0),
(28,1,3,0,0,0,0,0),
(28,2,3,0,0,0,0,0),
(28,3,3,0,0,0,0,0),
(28,4,3,0,0,0,0,0),
(28,5,3,0,0,0,0,0),
(28,6,3,0,0,0,0,0),
(28,7,3,0,0,0,0,0),
(28,8,3,0,0,0,0,0),
(28,9,3,0,0,0,0,0),
(28,10,3,0,0,0,0,0),
(28,11,3,0,0,0,0,0),
(28,12,3,0,0,0,0,0),
(28,13,3,0,0,0,0,0),
(28,14,3,0,0,0,0,0),
(29,0,3,0,0,0,0,0),
(29,1,3,0,0,0,0,0),
(29,2,3,0,0,0,0,0),
(29,3,3,0,0,0,0,0),
(29,4,3,0,0,0,0,0),
(29,5,3,0,0,0,0,0),
(29,6,3,0,0,0,0,0),
(29,7,3,0,0,0,0,0),
(29,8,3,0,0,0,0,0),
(29,9,3,0,0,0,0,0),
(29,10,3,0,0,0,0,0),
(29,11,3,0,0,0,0,0),
(29,12,3,0,0,0,0,0),
(29,13,3,0,0,0,0,0),
(29,14,3,0,0,0,0,0);
/*!40000 ALTER TABLE `character_quest_evo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_quest_guided`
--

DROP TABLE IF EXISTS `character_quest_guided`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_quest_guided` (
  `char_id` int(10) unsigned NOT NULL,
  `quest` smallint(5) unsigned NOT NULL,
  `count` int(11) DEFAULT NULL,
  `state` tinyint(3) unsigned DEFAULT NULL,
  `date` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`char_id`,`quest`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_quest_guided`
--

LOCK TABLES `character_quest_guided` WRITE;
/*!40000 ALTER TABLE `character_quest_guided` DISABLE KEYS */;
INSERT INTO `character_quest_guided` VALUES
(17,13,0,1,0),
(20,11,0,3,0),
(20,14,3,3,1770435670),
(20,17,0,3,0),
(20,20,0,3,0),
(20,23,0,3,0),
(20,26,5,3,1770437301),
(20,29,0,3,0),
(20,32,0,3,0),
(20,35,0,3,0),
(20,38,0,3,0),
(20,41,0,3,0),
(20,44,0,3,0),
(20,45,0,3,0),
(20,46,12,3,1770437547),
(20,47,0,3,0),
(20,48,0,3,0),
(20,49,0,3,1770437554),
(20,50,0,3,0),
(20,51,15,3,1770438324),
(20,52,0,3,0),
(20,53,0,1,0),
(21,12,0,1,0),
(22,11,0,3,1770381177),
(22,14,0,3,0),
(22,17,5,3,1770381256),
(22,20,5,3,1770381318),
(22,23,0,3,1770381564),
(22,26,5,3,1770381781),
(22,29,0,1,0),
(23,11,0,1,0),
(24,13,0,1,0),
(25,11,0,1,0),
(26,11,0,1,0),
(27,11,0,1,0),
(28,11,0,3,1770384071),
(28,14,3,3,1770384518),
(28,17,5,3,1770384563),
(28,20,5,3,1770384688),
(28,23,0,3,1770384732),
(28,26,5,3,1770384734),
(28,29,0,1,0),
(29,11,0,1,0);
/*!40000 ALTER TABLE `character_quest_guided` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_quest_mu`
--

DROP TABLE IF EXISTS `character_quest_mu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_quest_mu` (
  `char_id` int(10) unsigned NOT NULL,
  `quest_id` smallint(5) unsigned NOT NULL,
  `state` tinyint(3) unsigned DEFAULT NULL,
  `objective` smallint(5) unsigned DEFAULT NULL,
  `date` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`char_id`,`quest_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_quest_mu`
--

LOCK TABLES `character_quest_mu` WRITE;
/*!40000 ALTER TABLE `character_quest_mu` DISABLE KEYS */;
INSERT INTO `character_quest_mu` VALUES
(20,18,1,0,1770378078),
(20,88,1,0,1770381952),
(20,200,1,0,1770378078),
(20,201,1,0,1770378078),
(20,202,1,0,1770378078),
(20,203,1,0,1770378078),
(20,511,1,0,1770386316),
(20,531,1,0,1770386316),
(20,532,1,0,1770386316),
(20,533,1,0,1770386316),
(20,534,1,0,1770386316),
(21,18,1,0,1770378037),
(21,88,1,0,1770381959),
(21,200,1,0,1770378037),
(21,201,1,0,1770378037),
(21,202,1,0,1770378037),
(21,203,1,0,1770378037),
(21,217,1,0,1770378474),
(21,221,1,0,1770378474),
(21,225,1,0,1770378474),
(21,229,1,0,1770378474),
(21,233,1,0,1770378474),
(21,237,1,0,1770378474),
(21,241,1,0,1770378474),
(21,245,1,80,1770379280),
(21,249,1,80,1770379280),
(21,253,1,80,1770379280),
(21,257,1,80,1770379280),
(21,261,1,0,1770379669),
(21,265,1,0,1770379669),
(21,269,1,0,1770379669),
(21,273,1,0,1770379669),
(21,277,1,0,1770379669),
(21,281,1,0,1770379669),
(21,511,1,0,1770386488),
(21,531,1,0,1770386488),
(21,532,1,0,1770386488),
(21,533,1,0,1770386488),
(21,534,1,0,1770386488),
(22,18,1,0,1770380827),
(22,88,1,0,1770386085),
(22,200,1,0,1770380827),
(22,201,1,0,1770380827),
(22,202,1,0,1770380827),
(22,203,1,0,1770380827),
(22,204,1,0,1770384109),
(23,18,1,0,1770380439),
(23,88,1,0,1770382430),
(23,200,1,0,1770380439),
(23,201,1,0,1770380439),
(23,202,1,0,1770380439),
(23,203,1,0,1770380439),
(23,400,1,0,1770392943),
(23,440,1,10,1770379654),
(23,511,1,0,1770386753),
(23,531,1,0,1770386753),
(23,532,1,0,1770386753),
(23,533,1,0,1770386753),
(23,534,1,0,1770386753),
(23,537,1,0,1770417621),
(24,18,1,0,1770383496),
(24,88,1,0,1770385750),
(24,200,1,0,1770383496),
(24,201,1,0,1770383496),
(24,202,1,0,1770383496),
(24,203,1,0,1770383496),
(24,217,1,0,1770383710),
(24,299,1,16,1770383710),
(24,300,1,16,1770383710),
(24,301,1,16,1770383710),
(24,302,1,16,1770383710),
(24,303,1,16,1770383710),
(24,304,1,16,1770383710),
(24,305,1,80,1770384168),
(24,306,1,80,1770384168),
(24,307,1,80,1770384168),
(24,308,1,80,1770384168),
(24,309,1,0,1770384357),
(24,310,1,0,1770384357),
(24,311,1,0,1770384357),
(24,312,1,0,1770384357),
(24,313,1,0,1770384357),
(24,314,1,0,1770384357),
(24,511,1,0,1770388110),
(24,531,1,0,1770388110),
(24,532,1,0,1770388110),
(24,533,1,0,1770388110),
(24,534,1,0,1770388110),
(25,18,1,0,1770382018),
(25,88,1,0,1770385931),
(25,200,1,0,1770382018),
(25,201,1,0,1770382018),
(25,202,1,0,1770382018),
(25,203,1,0,1770382018),
(25,511,1,0,1770388653),
(25,531,1,0,1770388653),
(25,532,1,0,1770388653),
(25,533,1,0,1770388653),
(25,534,1,0,1770388653),
(28,18,1,0,1770384677),
(28,88,1,0,1770388108),
(28,200,1,0,1770384677),
(28,201,1,0,1770384677),
(28,202,1,0,1770384677),
(28,203,1,0,1770384677),
(28,217,1,0,1770385359),
(28,315,1,0,1770385359),
(28,316,1,0,1770385359),
(28,317,1,0,1770385359),
(28,318,1,0,1770385359),
(28,319,1,0,1770385359),
(28,320,1,0,1770385359),
(28,321,1,80,1770385646),
(28,322,1,80,1770385646),
(28,323,1,80,1770385646),
(28,324,1,80,1770385646),
(28,325,1,0,1770385767),
(28,326,1,0,1770385767),
(28,327,1,0,1770385767),
(28,328,1,0,1770385767),
(28,329,1,0,1770385767),
(28,330,1,0,1770385767),
(29,18,1,0,1770384884),
(29,88,1,0,1770386840),
(29,200,1,0,1770384884),
(29,201,1,0,1770384884),
(29,202,1,0,1770384884),
(29,203,1,0,1770384884),
(29,206,1,0,1770391760),
(29,511,1,0,1770394042),
(29,531,1,0,1770394042),
(29,532,1,0,1770394042),
(29,533,1,0,1770394042),
(29,534,1,0,1770394042);
/*!40000 ALTER TABLE `character_quest_mu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_restriction`
--

DROP TABLE IF EXISTS `character_restriction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_restriction` (
  `char_id` int(10) unsigned NOT NULL,
  `restriction` int(10) unsigned DEFAULT NULL,
  `time` bigint(20) DEFAULT NULL,
  `admin_name` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_restriction`
--

LOCK TABLES `character_restriction` WRITE;
/*!40000 ALTER TABLE `character_restriction` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_restriction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_score`
--

DROP TABLE IF EXISTS `character_score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_score` (
  `char_id` int(10) unsigned NOT NULL,
  `type` tinyint(3) unsigned DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_score`
--

LOCK TABLES `character_score` WRITE;
/*!40000 ALTER TABLE `character_score` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_skill`
--

DROP TABLE IF EXISTS `character_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_skill` (
  `char_id` int(10) unsigned NOT NULL,
  `type` tinyint(3) unsigned NOT NULL,
  `skill` smallint(5) unsigned NOT NULL,
  `skill_level` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`char_id`,`type`,`skill`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_skill`
--

LOCK TABLES `character_skill` WRITE;
/*!40000 ALTER TABLE `character_skill` DISABLE KEYS */;
INSERT INTO `character_skill` VALUES
(17,0,67,0),
(17,0,68,0),
(17,0,69,0),
(17,0,70,0),
(17,0,71,0),
(17,0,72,0),
(20,0,67,0),
(20,0,68,0),
(20,0,69,0),
(20,0,70,0),
(20,0,71,0),
(20,0,72,0),
(20,0,271,0),
(20,0,273,0),
(20,0,274,0),
(20,0,275,0),
(20,0,276,0),
(20,0,277,0),
(20,0,278,0),
(20,0,279,0),
(21,0,26,0),
(21,0,27,0),
(21,0,28,0),
(21,0,30,0),
(21,0,31,1),
(21,0,32,2),
(21,0,33,3),
(21,0,34,4),
(21,0,35,5),
(21,0,36,6),
(21,0,46,0),
(21,0,52,0),
(21,0,67,0),
(21,0,68,0),
(21,0,69,0),
(21,0,70,0),
(21,0,71,0),
(21,0,72,0),
(22,0,60,0),
(22,0,61,0),
(22,0,67,0),
(22,0,68,0),
(22,0,69,0),
(22,0,70,0),
(22,0,71,0),
(22,0,72,0),
(22,0,74,0),
(22,0,78,0),
(22,0,238,0),
(22,0,2098,0),
(22,0,2099,0),
(23,0,5,0),
(23,0,7,0),
(23,0,9,0),
(23,0,10,0),
(23,0,41,0),
(23,0,57,0),
(23,0,67,0),
(23,0,68,0),
(23,0,69,0),
(23,0,70,0),
(23,0,71,0),
(23,0,72,0),
(23,0,73,0),
(24,0,67,0),
(24,0,68,0),
(24,0,69,0),
(24,0,70,0),
(24,0,71,0),
(24,0,72,0),
(24,0,2002,0),
(24,0,2004,0),
(24,0,2006,0),
(24,0,2021,0),
(25,0,67,0),
(25,0,68,0),
(25,0,69,0),
(25,0,70,0),
(25,0,71,0),
(25,0,72,0),
(25,0,262,0),
(25,0,263,0),
(25,0,264,0),
(25,0,265,0),
(25,0,266,0),
(25,0,267,0),
(25,0,268,0),
(25,0,269,0),
(26,0,67,0),
(26,0,68,0),
(26,0,69,0),
(26,0,70,0),
(26,0,71,0),
(26,0,72,0),
(26,0,275,0),
(27,0,44,0),
(27,0,67,0),
(27,0,68,0),
(27,0,69,0),
(27,0,70,0),
(27,0,71,0),
(27,0,72,0),
(28,0,7,0),
(28,0,45,0),
(28,0,67,0),
(28,0,68,0),
(28,0,69,0),
(28,0,70,0),
(28,0,71,0),
(28,0,72,0),
(28,0,240,0),
(28,0,241,0),
(28,0,244,0),
(28,0,2022,1),
(29,0,60,0),
(29,0,61,0),
(29,0,63,0),
(29,0,64,0),
(29,0,65,0),
(29,0,67,0),
(29,0,68,0),
(29,0,69,0),
(29,0,70,0),
(29,0,71,0),
(29,0,72,0),
(29,0,74,0),
(29,0,78,0),
(29,0,238,0),
(29,0,2097,0),
(29,0,2098,0),
(29,0,2099,0);
/*!40000 ALTER TABLE `character_skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_statistics`
--

DROP TABLE IF EXISTS `character_statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_statistics` (
  `char_id` int(10) unsigned NOT NULL,
  `statistic_id` int(10) unsigned NOT NULL,
  `count` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`char_id`,`statistic_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_statistics`
--

LOCK TABLES `character_statistics` WRITE;
/*!40000 ALTER TABLE `character_statistics` DISABLE KEYS */;
INSERT INTO `character_statistics` VALUES
(20,0,2968),
(21,0,232),
(22,0,1991),
(23,0,3433),
(24,0,2522),
(25,0,3265),
(26,0,37),
(28,0,1837),
(28,1,4),
(29,0,2988),
(29,1,3);
/*!40000 ALTER TABLE `character_statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_warp_favorite_list`
--

DROP TABLE IF EXISTS `character_warp_favorite_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_warp_favorite_list` (
  `char_id` int(10) unsigned NOT NULL,
  `slot` tinyint(3) unsigned DEFAULT NULL,
  `data` smallint(5) unsigned DEFAULT NULL,
  `warp_id` smallint(5) unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_warp_favorite_list`
--

LOCK TABLES `character_warp_favorite_list` WRITE;
/*!40000 ALTER TABLE `character_warp_favorite_list` DISABLE KEYS */;
INSERT INTO `character_warp_favorite_list` VALUES
(17,0,65535,65535),
(17,1,65535,65535),
(17,2,65535,65535),
(17,3,65535,65535),
(17,4,65535,65535),
(26,0,65535,65535),
(26,1,65535,65535),
(26,2,65535,65535),
(26,3,65535,65535),
(26,4,65535,65535),
(27,0,65535,65535),
(27,1,65535,65535),
(27,2,65535,65535),
(27,3,65535,65535),
(27,4,65535,65535),
(28,0,65535,65535),
(28,1,65535,65535),
(28,2,65535,65535),
(28,3,65535,65535),
(28,4,65535,65535),
(22,0,65535,65535),
(22,1,65535,65535),
(22,2,65535,65535),
(22,3,65535,65535),
(22,4,65535,65535),
(21,0,65535,65535),
(21,1,65535,65535),
(21,2,65535,65535),
(21,3,65535,65535),
(21,4,65535,65535),
(24,0,65535,65535),
(24,1,65535,65535),
(24,2,65535,65535),
(24,3,65535,65535),
(24,4,65535,65535),
(25,0,65535,65535),
(25,1,65535,65535),
(25,2,65535,65535),
(25,3,65535,65535),
(25,4,65535,65535),
(29,0,65535,65535),
(29,1,65535,65535),
(29,2,65535,65535),
(29,3,65535,65535),
(29,4,65535,65535),
(23,0,65535,65535),
(23,1,65535,65535),
(23,2,65535,65535),
(23,3,65535,65535),
(23,4,65535,65535),
(20,0,65535,65535),
(20,1,65535,65535),
(20,2,65535,65535),
(20,3,65535,65535),
(20,4,65535,65535);
/*!40000 ALTER TABLE `character_warp_favorite_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_images`
--

DROP TABLE IF EXISTS `chat_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `original_name` varchar(255) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `mime_type` varchar(100) DEFAULT NULL,
  `uploaded_at` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_account_id` (`account_id`),
  KEY `idx_uploaded_at` (`uploaded_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_images`
--

LOCK TABLES `chat_images` WRITE;
/*!40000 ALTER TABLE `chat_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_messages`
--

DROP TABLE IF EXISTS `chat_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `character_name` varchar(50) DEFAULT NULL,
  `message` text NOT NULL,
  `message_type` enum('text','image','system') DEFAULT 'text',
  `channel` varchar(50) DEFAULT 'global',
  `created_at` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_channel` (`channel`),
  KEY `idx_account_id` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_messages`
--

LOCK TABLES `chat_messages` WRITE;
/*!40000 ALTER TABLE `chat_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crywolf_data`
--

DROP TABLE IF EXISTS `crywolf_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crywolf_data` (
  `state` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`state`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crywolf_data`
--

LOCK TABLES `crywolf_data` WRITE;
/*!40000 ALTER TABLE `crywolf_data` DISABLE KEYS */;
INSERT INTO `crywolf_data` VALUES
(0);
/*!40000 ALTER TABLE `crywolf_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_reset_data`
--

DROP TABLE IF EXISTS `daily_reset_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `daily_reset_data` (
  `uid` bigint(20) NOT NULL AUTO_INCREMENT,
  `character_id` bigint(20) NOT NULL,
  `reset_count` int(11) DEFAULT NULL,
  `last_reset` bigint(20) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `daily_reset_data_unique` (`character_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_reset_data`
--

LOCK TABLES `daily_reset_data` WRITE;
/*!40000 ALTER TABLE `daily_reset_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `daily_reset_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_arka_war_kill`
--

DROP TABLE IF EXISTS `event_arka_war_kill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_arka_war_kill` (
  `char_id` int(10) unsigned DEFAULT NULL,
  `char_name` varchar(255) DEFAULT NULL,
  `char_rank` tinyint(3) unsigned DEFAULT NULL,
  `player_data_01` varchar(255) DEFAULT NULL,
  `guild_id_01` int(10) unsigned DEFAULT NULL,
  `guild_name_01` varchar(255) DEFAULT NULL,
  `killer_id` int(10) unsigned DEFAULT NULL,
  `killer_name` varchar(255) DEFAULT NULL,
  `killer_rank` tinyint(3) unsigned DEFAULT NULL,
  `player_data_02` varchar(255) DEFAULT NULL,
  `guild_id_02` int(10) unsigned DEFAULT NULL,
  `guild_name_02` varchar(255) DEFAULT NULL,
  `world` smallint(5) unsigned DEFAULT NULL,
  `world_x` smallint(6) DEFAULT NULL,
  `world_y` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_arka_war_kill`
--

LOCK TABLES `event_arka_war_kill` WRITE;
/*!40000 ALTER TABLE `event_arka_war_kill` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_arka_war_kill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_arka_war_ranking`
--

DROP TABLE IF EXISTS `event_arka_war_ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_arka_war_ranking` (
  `guild_id_01` int(10) unsigned DEFAULT NULL,
  `guild_name_01` varchar(255) DEFAULT NULL,
  `guild_id_02` int(10) unsigned DEFAULT NULL,
  `guild_name_02` varchar(255) DEFAULT NULL,
  `character_count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_arka_war_ranking`
--

LOCK TABLES `event_arka_war_ranking` WRITE;
/*!40000 ALTER TABLE `event_arka_war_ranking` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_arka_war_ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_castle_siege_kill`
--

DROP TABLE IF EXISTS `event_castle_siege_kill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_castle_siege_kill` (
  `char_id` int(10) unsigned DEFAULT NULL,
  `char_name` varchar(255) DEFAULT NULL,
  `char_rank` tinyint(3) unsigned DEFAULT NULL,
  `state` tinyint(3) unsigned DEFAULT NULL,
  `player_data_01` varchar(255) DEFAULT NULL,
  `guild_id_01` int(10) unsigned DEFAULT NULL,
  `guild_name_01` varchar(255) DEFAULT NULL,
  `killer_id` int(10) unsigned DEFAULT NULL,
  `killer_name` varchar(255) DEFAULT NULL,
  `killer_rank` tinyint(3) unsigned DEFAULT NULL,
  `player_data_02` varchar(255) DEFAULT NULL,
  `guild_id_02` int(10) unsigned DEFAULT NULL,
  `guild_name_02` varchar(255) DEFAULT NULL,
  `world` smallint(5) unsigned DEFAULT NULL,
  `world_x` smallint(6) DEFAULT NULL,
  `world_y` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_castle_siege_kill`
--

LOCK TABLES `event_castle_siege_kill` WRITE;
/*!40000 ALTER TABLE `event_castle_siege_kill` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_castle_siege_kill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_castle_siege_ranking`
--

DROP TABLE IF EXISTS `event_castle_siege_ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_castle_siege_ranking` (
  `guild_id` int(10) unsigned NOT NULL,
  `guild_name` varchar(255) DEFAULT NULL,
  `character_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`guild_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_castle_siege_ranking`
--

LOCK TABLES `event_castle_siege_ranking` WRITE;
/*!40000 ALTER TABLE `event_castle_siege_ranking` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_castle_siege_ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_castle_siege_time`
--

DROP TABLE IF EXISTS `event_castle_siege_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_castle_siege_time` (
  `char_id` int(10) unsigned DEFAULT NULL,
  `char_name` varchar(255) DEFAULT NULL,
  `char_rank` tinyint(3) unsigned DEFAULT NULL,
  `player_data` varchar(255) DEFAULT NULL,
  `guild_id` int(10) unsigned DEFAULT NULL,
  `guild_name` varchar(255) DEFAULT NULL,
  `type` tinyint(3) unsigned DEFAULT NULL,
  `time` int(10) unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_castle_siege_time`
--

LOCK TABLES `event_castle_siege_time` WRITE;
/*!40000 ALTER TABLE `event_castle_siege_time` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_castle_siege_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_dungeon_instance`
--

DROP TABLE IF EXISTS `event_dungeon_instance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_dungeon_instance` (
  `char_id` int(10) unsigned NOT NULL,
  `id` tinyint(3) unsigned DEFAULT NULL,
  `time` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_dungeon_instance`
--

LOCK TABLES `event_dungeon_instance` WRITE;
/*!40000 ALTER TABLE `event_dungeon_instance` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_dungeon_instance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_jewel_bingo_ranking`
--

DROP TABLE IF EXISTS `event_jewel_bingo_ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_jewel_bingo_ranking` (
  `char_id` int(10) unsigned NOT NULL,
  `type` tinyint(3) unsigned DEFAULT NULL,
  `score1` int(11) DEFAULT NULL,
  `score2` int(11) DEFAULT NULL,
  `score3` int(11) DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_jewel_bingo_ranking`
--

LOCK TABLES `event_jewel_bingo_ranking` WRITE;
/*!40000 ALTER TABLE `event_jewel_bingo_ranking` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_jewel_bingo_ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_labyrinth_league`
--

DROP TABLE IF EXISTS `event_labyrinth_league`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_labyrinth_league` (
  `category` tinyint(3) unsigned NOT NULL,
  `char_id` int(10) unsigned NOT NULL,
  `char_name` varchar(255) DEFAULT NULL,
  `char_class` tinyint(3) unsigned DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `league_score` int(11) DEFAULT NULL,
  `time` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`char_id`,`category`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_labyrinth_league`
--

LOCK TABLES `event_labyrinth_league` WRITE;
/*!40000 ALTER TABLE `event_labyrinth_league` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_labyrinth_league` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_labyrinth_schedule`
--

DROP TABLE IF EXISTS `event_labyrinth_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_labyrinth_schedule` (
  `server` smallint(5) unsigned NOT NULL,
  `state` tinyint(3) unsigned DEFAULT NULL,
  `start_date` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`server`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_labyrinth_schedule`
--

LOCK TABLES `event_labyrinth_schedule` WRITE;
/*!40000 ALTER TABLE `event_labyrinth_schedule` DISABLE KEYS */;
INSERT INTO `event_labyrinth_schedule` VALUES
(0,2,20260205070000);
/*!40000 ALTER TABLE `event_labyrinth_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_labyrinth_settings`
--

DROP TABLE IF EXISTS `event_labyrinth_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_labyrinth_settings` (
  `uid` bigint(20) NOT NULL AUTO_INCREMENT,
  `monster_element` bigint(20) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_labyrinth_settings`
--

LOCK TABLES `event_labyrinth_settings` WRITE;
/*!40000 ALTER TABLE `event_labyrinth_settings` DISABLE KEYS */;
INSERT INTO `event_labyrinth_settings` VALUES
(1,3);
/*!40000 ALTER TABLE `event_labyrinth_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_mini_bomb_ranking`
--

DROP TABLE IF EXISTS `event_mini_bomb_ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_mini_bomb_ranking` (
  `char_id` int(10) unsigned NOT NULL,
  `state` tinyint(3) unsigned DEFAULT NULL,
  `score` smallint(5) unsigned DEFAULT NULL,
  `bombs_founded` tinyint(3) unsigned DEFAULT NULL,
  `bombs_failed` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_mini_bomb_ranking`
--

LOCK TABLES `event_mini_bomb_ranking` WRITE;
/*!40000 ALTER TABLE `event_mini_bomb_ranking` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_mini_bomb_ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_mu_roomy_ranking`
--

DROP TABLE IF EXISTS `event_mu_roomy_ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_mu_roomy_ranking` (
  `char_id` int(10) unsigned NOT NULL,
  `type` tinyint(3) unsigned DEFAULT NULL,
  `score` smallint(5) unsigned DEFAULT NULL,
  `remain_card` tinyint(3) unsigned DEFAULT NULL,
  `remain_special_card` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_mu_roomy_ranking`
--

LOCK TABLES `event_mu_roomy_ranking` WRITE;
/*!40000 ALTER TABLE `event_mu_roomy_ranking` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_mu_roomy_ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_numeric_baseball_ranking`
--

DROP TABLE IF EXISTS `event_numeric_baseball_ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_numeric_baseball_ranking` (
  `char_id` int(10) unsigned NOT NULL,
  `score` int(11) DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_numeric_baseball_ranking`
--

LOCK TABLES `event_numeric_baseball_ranking` WRITE;
/*!40000 ALTER TABLE `event_numeric_baseball_ranking` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_numeric_baseball_ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_race_ranking`
--

DROP TABLE IF EXISTS `event_race_ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_race_ranking` (
  `char_id` int(10) unsigned NOT NULL,
  `race` varchar(255) NOT NULL,
  `start` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`char_id`,`race`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_race_ranking`
--

LOCK TABLES `event_race_ranking` WRITE;
/*!40000 ALTER TABLE `event_race_ranking` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_race_ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_ranking`
--

DROP TABLE IF EXISTS `event_ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_ranking` (
  `event_id` tinyint(3) unsigned NOT NULL,
  `event_ground` tinyint(3) unsigned DEFAULT NULL,
  `char_id` int(10) unsigned NOT NULL,
  `score` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`event_id`,`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_ranking`
--

LOCK TABLES `event_ranking` WRITE;
/*!40000 ALTER TABLE `event_ranking` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_ranking_labyrinth`
--

DROP TABLE IF EXISTS `event_ranking_labyrinth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_ranking_labyrinth` (
  `char_id` int(10) unsigned NOT NULL,
  `level` smallint(5) unsigned DEFAULT NULL,
  `stage` tinyint(3) unsigned DEFAULT NULL,
  `index` tinyint(3) unsigned DEFAULT NULL,
  `killed_monsters` int(11) DEFAULT NULL,
  `earned_experience` bigint(20) DEFAULT NULL,
  `completed_missions` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  PRIMARY KEY (`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_ranking_labyrinth`
--

LOCK TABLES `event_ranking_labyrinth` WRITE;
/*!40000 ALTER TABLE `event_ranking_labyrinth` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_ranking_labyrinth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_scramble_ranking`
--

DROP TABLE IF EXISTS `event_scramble_ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_scramble_ranking` (
  `char_id` int(10) unsigned NOT NULL,
  `word` varchar(255) DEFAULT NULL,
  `shuffle_word` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_scramble_ranking`
--

LOCK TABLES `event_scramble_ranking` WRITE;
/*!40000 ALTER TABLE `event_scramble_ranking` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_scramble_ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_stage`
--

DROP TABLE IF EXISTS `event_stage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_stage` (
  `event_id` tinyint(3) unsigned NOT NULL,
  `stage` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`event_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_stage`
--

LOCK TABLES `event_stage` WRITE;
/*!40000 ALTER TABLE `event_stage` DISABLE KEYS */;
INSERT INTO `event_stage` VALUES
(16,0);
/*!40000 ALTER TABLE `event_stage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gen_ranking`
--

DROP TABLE IF EXISTS `gen_ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gen_ranking` (
  `family` tinyint(3) unsigned NOT NULL,
  `level` tinyint(3) unsigned DEFAULT NULL,
  `type` tinyint(3) unsigned DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `ranking` int(11) DEFAULT NULL,
  `char_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`family`,`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_ranking`
--

LOCK TABLES `gen_ranking` WRITE;
/*!40000 ALTER TABLE `gen_ranking` DISABLE KEYS */;
/*!40000 ALTER TABLE `gen_ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giant_mount_settings`
--

DROP TABLE IF EXISTS `giant_mount_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giant_mount_settings` (
  `character_id` bigint(20) NOT NULL,
  `giant_model` smallint(6) NOT NULL,
  `giant_status` smallint(6) NOT NULL,
  PRIMARY KEY (`character_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giant_mount_settings`
--

LOCK TABLES `giant_mount_settings` WRITE;
/*!40000 ALTER TABLE `giant_mount_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `giant_mount_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guild_list`
--

DROP TABLE IF EXISTS `guild_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guild_list` (
  `guid` int(10) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `emblem` varchar(255) DEFAULT NULL,
  `hostil` int(10) unsigned DEFAULT NULL,
  `alliance` int(10) unsigned DEFAULT NULL,
  `notice` varchar(255) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  PRIMARY KEY (`guid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guild_list`
--

LOCK TABLES `guild_list` WRITE;
/*!40000 ALTER TABLE `guild_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `guild_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guild_matching`
--

DROP TABLE IF EXISTS `guild_matching`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guild_matching` (
  `guild_id` int(10) unsigned NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `interest_type` tinyint(3) unsigned DEFAULT NULL,
  `level_range` tinyint(3) unsigned DEFAULT NULL,
  `class_type` smallint(5) unsigned DEFAULT NULL,
  `board_number` int(10) unsigned DEFAULT NULL,
  `introduction_text` varchar(255) DEFAULT NULL,
  `MinLevel` int(11) DEFAULT NULL,
  `MaxLevel` int(11) DEFAULT NULL,
  PRIMARY KEY (`guild_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guild_matching`
--

LOCK TABLES `guild_matching` WRITE;
/*!40000 ALTER TABLE `guild_matching` DISABLE KEYS */;
/*!40000 ALTER TABLE `guild_matching` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guild_members`
--

DROP TABLE IF EXISTS `guild_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guild_members` (
  `guild_id` int(10) unsigned NOT NULL,
  `char_id` int(10) unsigned NOT NULL,
  `id` tinyint(3) unsigned DEFAULT NULL,
  `ranking` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`guild_id`,`char_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guild_members`
--

LOCK TABLES `guild_members` WRITE;
/*!40000 ALTER TABLE `guild_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `guild_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guild_score`
--

DROP TABLE IF EXISTS `guild_score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guild_score` (
  `guild_id` int(10) unsigned NOT NULL,
  `score` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`guild_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guild_score`
--

LOCK TABLES `guild_score` WRITE;
/*!40000 ALTER TABLE `guild_score` DISABLE KEYS */;
/*!40000 ALTER TABLE `guild_score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_recovery`
--

DROP TABLE IF EXISTS `item_recovery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_recovery` (
  `char_id` int(10) unsigned NOT NULL,
  `item` smallint(5) unsigned NOT NULL,
  `level` tinyint(3) unsigned DEFAULT NULL,
  `durability` tinyint(3) unsigned DEFAULT NULL,
  `skill` tinyint(3) unsigned DEFAULT NULL,
  `luck` tinyint(3) unsigned DEFAULT NULL,
  `option` tinyint(3) unsigned DEFAULT NULL,
  `excellent` tinyint(3) unsigned DEFAULT NULL,
  `ancient` tinyint(3) unsigned DEFAULT NULL,
  `harmony` tinyint(3) unsigned DEFAULT NULL,
  `option_380` tinyint(3) unsigned DEFAULT NULL,
  `socket_1` smallint(5) unsigned DEFAULT NULL,
  `socket_2` smallint(5) unsigned DEFAULT NULL,
  `socket_3` smallint(5) unsigned DEFAULT NULL,
  `socket_4` smallint(5) unsigned DEFAULT NULL,
  `socket_5` smallint(5) unsigned DEFAULT NULL,
  `socket_bonus` tinyint(3) unsigned DEFAULT NULL,
  `data_1` int(11) DEFAULT NULL,
  `data_2` int(11) DEFAULT NULL,
  `data_3` int(11) DEFAULT NULL,
  `serial_server` smallint(5) unsigned DEFAULT NULL,
  `serial` int(10) unsigned DEFAULT NULL,
  `serial_cash_shop` int(10) unsigned DEFAULT NULL,
  `flags` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`char_id`,`item`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_recovery`
--

LOCK TABLES `item_recovery` WRITE;
/*!40000 ALTER TABLE `item_recovery` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_recovery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_serial`
--

DROP TABLE IF EXISTS `item_serial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_serial` (
  `server` int(11) NOT NULL,
  `serial` bigint(20) NOT NULL,
  `serial_shop` bigint(20) NOT NULL,
  PRIMARY KEY (`server`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_serial`
--

LOCK TABLES `item_serial` WRITE;
/*!40000 ALTER TABLE `item_serial` DISABLE KEYS */;
INSERT INTO `item_serial` VALUES
(0,14690,0);
/*!40000 ALTER TABLE `item_serial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lo_de`
--

DROP TABLE IF EXISTS `lo_de`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lo_de` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `char_id` int(11) NOT NULL,
  `bet_number` int(11) NOT NULL,
  `bet_type` int(11) NOT NULL,
  `bet_item` int(11) NOT NULL,
  `bet_value` int(11) NOT NULL,
  `bet_time` datetime(6) NOT NULL,
  `reward_value_x` int(11) NOT NULL,
  `reward_status` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lo_de`
--

LOCK TABLES `lo_de` WRITE;
/*!40000 ALTER TABLE `lo_de` DISABLE KEYS */;
/*!40000 ALTER TABLE `lo_de` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_pc`
--

DROP TABLE IF EXISTS `master_pc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_pc` (
  `disk_serial` int(10) unsigned NOT NULL,
  `mac` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`disk_serial`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_pc`
--

LOCK TABLES `master_pc` WRITE;
/*!40000 ALTER TABLE `master_pc` DISABLE KEYS */;
/*!40000 ALTER TABLE `master_pc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monster_respawn`
--

DROP TABLE IF EXISTS `monster_respawn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monster_respawn` (
  `server` smallint(5) unsigned NOT NULL,
  `guid` smallint(5) unsigned NOT NULL,
  `date` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`server`,`guid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monster_respawn`
--

LOCK TABLES `monster_respawn` WRITE;
/*!40000 ALTER TABLE `monster_respawn` DISABLE KEYS */;
/*!40000 ALTER TABLE `monster_respawn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author_id` int(11) NOT NULL,
  `author_name` varchar(50) NOT NULL,
  `is_published` tinyint(1) DEFAULT 0,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_published` (`is_published`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_author_id` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `party`
--

DROP TABLE IF EXISTS `party`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `party` (
  `guid` smallint(5) unsigned NOT NULL,
  `server` smallint(5) unsigned DEFAULT NULL,
  PRIMARY KEY (`guid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party`
--

LOCK TABLES `party` WRITE;
/*!40000 ALTER TABLE `party` DISABLE KEYS */;
INSERT INTO `party` VALUES
(0,0),
(1,0);
/*!40000 ALTER TABLE `party` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `party_member`
--

DROP TABLE IF EXISTS `party_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `party_member` (
  `member` int(10) unsigned NOT NULL,
  `server` smallint(5) unsigned DEFAULT NULL,
  `party` smallint(5) unsigned DEFAULT NULL,
  `position` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`member`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party_member`
--

LOCK TABLES `party_member` WRITE;
/*!40000 ALTER TABLE `party_member` DISABLE KEYS */;
INSERT INTO `party_member` VALUES
(20,0,0,0),
(21,0,0,1),
(22,0,1,1),
(24,0,0,4),
(25,0,0,2),
(28,0,1,0);
/*!40000 ALTER TABLE `party_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`) USING BTREE,
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `serial_check`
--

DROP TABLE IF EXISTS `serial_check`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `serial_check` (
  `server` smallint(5) unsigned NOT NULL,
  `serial` int(10) unsigned NOT NULL,
  `type` tinyint(3) unsigned DEFAULT NULL,
  `account_id` int(10) unsigned DEFAULT NULL,
  `ip` varchar(16) DEFAULT NULL,
  `mac` varchar(50) DEFAULT NULL,
  `disk_serial` int(10) unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serial_check`
--

LOCK TABLES `serial_check` WRITE;
/*!40000 ALTER TABLE `serial_check` DISABLE KEYS */;
/*!40000 ALTER TABLE `serial_check` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `server_monster_soul_reset`
--

DROP TABLE IF EXISTS `server_monster_soul_reset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `server_monster_soul_reset` (
  `monster_soul_reset` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `server_monster_soul_reset`
--

LOCK TABLES `server_monster_soul_reset` WRITE;
/*!40000 ALTER TABLE `server_monster_soul_reset` DISABLE KEYS */;
/*!40000 ALTER TABLE `server_monster_soul_reset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `server_ranking`
--

DROP TABLE IF EXISTS `server_ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `server_ranking` (
  `guid` int(11) NOT NULL,
  `race` int(11) DEFAULT NULL,
  `level_normal` int(11) DEFAULT NULL,
  `level_master` int(11) DEFAULT NULL,
  `level_majestic` int(11) DEFAULT NULL,
  `reset` int(11) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`guid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `server_ranking`
--

LOCK TABLES `server_ranking` WRITE;
/*!40000 ALTER TABLE `server_ranking` DISABLE KEYS */;
INSERT INTO `server_ranking` VALUES
(20,112,400,0,0,0,'2026-02-06 22:37:24.000000'),
(21,32,400,0,0,0,'2026-02-06 22:38:48.000000'),
(22,64,333,0,0,0,'2026-02-06 22:33:56.000000'),
(23,48,400,0,0,0,'2026-02-06 22:46:44.000000'),
(24,160,400,0,0,0,'2026-02-06 23:08:40.000000'),
(25,96,398,0,0,0,'2026-02-06 23:13:52.000000'),
(26,112,38,0,0,0,'2026-02-06 19:58:44.000000'),
(28,176,327,0,0,0,'2026-02-06 22:23:49.000000'),
(29,64,353,0,0,0,'2026-02-06 23:15:27.000000');
/*!40000 ALTER TABLE `server_ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `server_settings`
--

DROP TABLE IF EXISTS `server_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `server_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text DEFAULT NULL,
  `setting_type` varchar(20) NOT NULL DEFAULT 'string',
  `category` varchar(50) NOT NULL DEFAULT 'general',
  `description` text DEFAULT NULL,
  `updated_at` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`),
  KEY `idx_key` (`setting_key`),
  KEY `idx_category` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `server_settings`
--

LOCK TABLES `server_settings` WRITE;
/*!40000 ALTER TABLE `server_settings` DISABLE KEYS */;
INSERT INTO `server_settings` VALUES
(1,'download_title','Mu Kacher S19 Part 2','string','download','Download page title',1770375010413),
(2,'download_description','Download the Mu Kacher Season 19 Part 2 game client and start your adventure!','string','download','Download page description',1770375010413),
(3,'download_drive_link','https://drive.google.com/file/d/16wwE6auzWPAXTouvGUBIaWhCH4-NLL3e/view?usp=drive_link','string','download','Google Drive download link',1770375010413),
(4,'download_file_size','1.63 GB','string','download','File size display',1770375010413),
(5,'download_version','1.0.0','string','download','Client version',1770375010413);
/*!40000 ALTER TABLE `server_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `server_signal`
--

DROP TABLE IF EXISTS `server_signal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `server_signal` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `server` smallint(5) unsigned DEFAULT NULL,
  `signal` smallint(5) unsigned DEFAULT NULL,
  `data_1` int(11) DEFAULT NULL,
  `data_2` int(11) DEFAULT NULL,
  `data_3` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `server_signal`
--

LOCK TABLES `server_signal` WRITE;
/*!40000 ALTER TABLE `server_signal` DISABLE KEYS */;
/*!40000 ALTER TABLE `server_signal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tormented_square_survival_hall_of_fame`
--

DROP TABLE IF EXISTS `tormented_square_survival_hall_of_fame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tormented_square_survival_hall_of_fame` (
  `char_id_1` int(10) unsigned NOT NULL,
  `char_name_1` varchar(255) DEFAULT NULL,
  `char_id_2` int(10) unsigned DEFAULT NULL,
  `char_name_2` varchar(255) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  PRIMARY KEY (`char_id_1`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tormented_square_survival_hall_of_fame`
--

LOCK TABLES `tormented_square_survival_hall_of_fame` WRITE;
/*!40000 ALTER TABLE `tormented_square_survival_hall_of_fame` DISABLE KEYS */;
/*!40000 ALTER TABLE `tormented_square_survival_hall_of_fame` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tormented_square_survival_ranking`
--

DROP TABLE IF EXISTS `tormented_square_survival_ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tormented_square_survival_ranking` (
  `type` tinyint(3) unsigned DEFAULT NULL,
  `ranking` int(11) DEFAULT NULL,
  `char_id_1` int(10) unsigned DEFAULT NULL,
  `char_name_1` varchar(255) DEFAULT NULL,
  `char_id_2` int(10) unsigned DEFAULT NULL,
  `char_name_2` varchar(255) DEFAULT NULL,
  `score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tormented_square_survival_ranking`
--

LOCK TABLES `tormented_square_survival_ranking` WRITE;
/*!40000 ALTER TABLE `tormented_square_survival_ranking` DISABLE KEYS */;
/*!40000 ALTER TABLE `tormented_square_survival_ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tormented_square_survival_team`
--

DROP TABLE IF EXISTS `tormented_square_survival_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tormented_square_survival_team` (
  `char_id_1` int(10) unsigned DEFAULT NULL,
  `char_id_2` int(10) unsigned DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `type` tinyint(3) unsigned DEFAULT NULL,
  `enter_count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tormented_square_survival_team`
--

LOCK TABLES `tormented_square_survival_team` WRITE;
/*!40000 ALTER TABLE `tormented_square_survival_team` DISABLE KEYS */;
/*!40000 ALTER TABLE `tormented_square_survival_team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_sessions`
--

DROP TABLE IF EXISTS `user_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `expires_at` bigint(20) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `idx_token` (`token`),
  KEY `idx_account_id` (`account_id`),
  KEY `idx_expires_at` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_sessions`
--

LOCK TABLES `user_sessions` WRITE;
/*!40000 ALTER TABLE `user_sessions` DISABLE KEYS */;
INSERT INTO `user_sessions` VALUES
(1,5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJuYW1lIjoidGVzdHVzZXI5OTkiLCJhY2NvdW50SWQiOjUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMjY5NTE4LCJleHAiOjE3NzA4NzQzMTh9.7Dwy1PoCK8BY5AYH6xb_qFVc2U7Cv11tje6tGVc9IE0','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJuYW1lIjoidGVzdHVzZXI5OTkiLCJhY2NvdW50SWQiOjUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMjY5NTE4LCJleHAiOjE3NzA4NzQzMTh9.7Dwy1PoCK8BY5AYH6xb_qFVc2U7Cv11tje6tGVc9IE0',1770874318175,1770269518175),
(2,5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJuYW1lIjoidGVzdHVzZXI5OTkiLCJhY2NvdW50SWQiOjUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMjY5NTI0LCJleHAiOjE3NzA4NzQzMjR9.GKxHFGwyF78pdEvWMk1FwTO02nXTOGRwlaI1y_1YA-U','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJuYW1lIjoidGVzdHVzZXI5OTkiLCJhY2NvdW50SWQiOjUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMjY5NTI0LCJleHAiOjE3NzA4NzQzMjR9.GKxHFGwyF78pdEvWMk1FwTO02nXTOGRwlaI1y_1YA-U',1770874324549,1770269524549),
(3,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDI3MjYxMCwiZXhwIjoxNzcwODc3NDEwfQ.EounVgdEKlOkIjMZLTd028k3URQMb0qjcLqQAMP0bx4','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDI3MjYxMCwiZXhwIjoxNzcwODc3NDEwfQ.EounVgdEKlOkIjMZLTd028k3URQMb0qjcLqQAMP0bx4',1770877410394,1770272610394),
(4,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInVzZXJuYW1lIjoidGVzdHBsYXllcjEyMyIsImFjY291bnRJZCI6NiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NzAyNzI2NzIsImV4cCI6MTc3MDg3NzQ3Mn0.bAw2yaRgRKkwwtW9QZh3Gh8pyuBKw6-bY00Dzi90tU4','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInVzZXJuYW1lIjoidGVzdHBsYXllcjEyMyIsImFjY291bnRJZCI6NiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NzAyNzI2NzIsImV4cCI6MTc3MDg3NzQ3Mn0.bAw2yaRgRKkwwtW9QZh3Gh8pyuBKw6-bY00Dzi90tU4',1770877472077,1770272672077),
(5,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInVzZXJuYW1lIjoidGVzdHBsYXllcjEyMyIsImFjY291bnRJZCI6NiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NzAyNzI2ODksImV4cCI6MTc3MDg3NzQ4OX0.sCJUv5rig0sdUn8A_kfONZrVRRRd8m5PJsdDQxt-c1Q','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInVzZXJuYW1lIjoidGVzdHBsYXllcjEyMyIsImFjY291bnRJZCI6NiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NzAyNzI2ODksImV4cCI6MTc3MDg3NzQ4OX0.sCJUv5rig0sdUn8A_kfONZrVRRRd8m5PJsdDQxt-c1Q',1770877489554,1770272689554),
(7,7,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInVzZXJuYW1lIjoidGlkaWV1MjQ2IiwiYWNjb3VudElkIjo3LCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDI3MzE4NCwiZXhwIjoxNzcwODc3OTg0fQ.BqRhRGwODsockXhS7MXc6ETMoUGD0AXod_rb8tQ3afg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInVzZXJuYW1lIjoidGlkaWV1MjQ2IiwiYWNjb3VudElkIjo3LCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDI3MzE4NCwiZXhwIjoxNzcwODc3OTg0fQ.BqRhRGwODsockXhS7MXc6ETMoUGD0AXod_rb8tQ3afg',1770877984555,1770273184555),
(8,7,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInVzZXJuYW1lIjoidGlkaWV1MjQ2IiwiYWNjb3VudElkIjo3LCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDI3MzE5NCwiZXhwIjoxNzcwODc3OTk0fQ.OPVI84iUllMh86wSjjjxnwbwzRoy5Kqu1awGbJrHfqU','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInVzZXJuYW1lIjoidGlkaWV1MjQ2IiwiYWNjb3VudElkIjo3LCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDI3MzE5NCwiZXhwIjoxNzcwODc3OTk0fQ.OPVI84iUllMh86wSjjjxnwbwzRoy5Kqu1awGbJrHfqU',1770877994930,1770273194930),
(10,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDI3MzM0MSwiZXhwIjoxNzcwODc4MTQxfQ.qvw0W2Y3l-OMMtW5IXBjFSdnDHQ47qs8svoOzepgc2A','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDI3MzM0MSwiZXhwIjoxNzcwODc4MTQxfQ.qvw0W2Y3l-OMMtW5IXBjFSdnDHQ47qs8svoOzepgc2A',1770878141118,1770273341118),
(12,7,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInVzZXJuYW1lIjoidGlkaWV1MjQ2IiwiYWNjb3VudElkIjo3LCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDI3NDY1MiwiZXhwIjoxNzcwODc5NDUyfQ.RvDD-Iws0vJz-vEUBx7ri0fbe2WUWECXZTTytEnOOco','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInVzZXJuYW1lIjoidGlkaWV1MjQ2IiwiYWNjb3VudElkIjo3LCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDI3NDY1MiwiZXhwIjoxNzcwODc5NDUyfQ.RvDD-Iws0vJz-vEUBx7ri0fbe2WUWECXZTTytEnOOco',1770879452365,1770274652365),
(13,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDI3NzA5MCwiZXhwIjoxNzcwODgxODkwfQ.VbZvQ9DlPC_0f__q0aRuogLH9Lj1fbkue6m6ab9MVqM','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDI3NzA5MCwiZXhwIjoxNzcwODgxODkwfQ.VbZvQ9DlPC_0f__q0aRuogLH9Lj1fbkue6m6ab9MVqM',1770881890339,1770277090339),
(14,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJpc0dhbWVNYXN0ZXIiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMjgwMDExLCJleHAiOjE3NzA4ODQ4MTF9.TYXyGWZgBrtpnSDtfcy3t6kDpCUTEdUaJe5ENZCsffA','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJpc0dhbWVNYXN0ZXIiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMjgwMDExLCJleHAiOjE3NzA4ODQ4MTF9.TYXyGWZgBrtpnSDtfcy3t6kDpCUTEdUaJe5ENZCsffA',1770884811055,1770280011055),
(15,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJpc0dhbWVNYXN0ZXIiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMjgxMjkzLCJleHAiOjE3NzA4ODYwOTN9.sgkG7LbBgrYXCKstWnEA22Pcn46Q7i2bWIMuT-ewMLI','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJpc0dhbWVNYXN0ZXIiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMjgxMjkzLCJleHAiOjE3NzA4ODYwOTN9.sgkG7LbBgrYXCKstWnEA22Pcn46Q7i2bWIMuT-ewMLI',1770886093001,1770281293001),
(16,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJpc0dhbWVNYXN0ZXIiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMjgyNTM3LCJleHAiOjE3NzA4ODczMzd9.h920Qedx22R5iQyJX7LKVbYNO2UJey7ji4cUME0nU8s','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJpc0dhbWVNYXN0ZXIiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMjgyNTM3LCJleHAiOjE3NzA4ODczMzd9.h920Qedx22R5iQyJX7LKVbYNO2UJey7ji4cUME0nU8s',1770887337216,1770282537216),
(17,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJpc0dhbWVNYXN0ZXIiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMjgzOTcwLCJleHAiOjE3NzA4ODg3NzB9.ai-norZh3_THAddmhBIcEqwi7gaCxG3EN3KhBQ8evgo','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJpc0dhbWVNYXN0ZXIiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMjgzOTcwLCJleHAiOjE3NzA4ODg3NzB9.ai-norZh3_THAddmhBIcEqwi7gaCxG3EN3KhBQ8evgo',1770888770658,1770283970658),
(18,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInVzZXJuYW1lIjoidGVzdHVzZXIyIiwiYWNjb3VudElkIjo4LCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDI4NDI5MCwiZXhwIjoxNzcwODg5MDkwfQ.CuvxfGvjr1vDxkFtmwmpIIk-jNIMKJjukVnsdrEF9XA','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInVzZXJuYW1lIjoidGVzdHVzZXIyIiwiYWNjb3VudElkIjo4LCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDI4NDI5MCwiZXhwIjoxNzcwODg5MDkwfQ.CuvxfGvjr1vDxkFtmwmpIIk-jNIMKJjukVnsdrEF9XA',1770889090864,1770284290864),
(21,9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksInVzZXJuYW1lIjoiZ211c2VyIiwiYWNjb3VudElkIjo5LCJpc0dhbWVNYXN0ZXIiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMjg0NDQyLCJleHAiOjE3NzA4ODkyNDJ9.nZUl64Lpk9J_mP3w5npMfz9AiwX9rH9PJ_M6vENn9SM','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksInVzZXJuYW1lIjoiZ211c2VyIiwiYWNjb3VudElkIjo5LCJpc0dhbWVNYXN0ZXIiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMjg0NDQyLCJleHAiOjE3NzA4ODkyNDJ9.nZUl64Lpk9J_mP3w5npMfz9AiwX9rH9PJ_M6vENn9SM',1770889242665,1770284442665),
(22,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJpc0dhbWVNYXN0ZXIiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMjg1Mjk3LCJleHAiOjE3NzA4OTAwOTd9.bTLQw9yzMYjNG1685yafwwZiEP3eveGVVP5aKVDYETM','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJpc0dhbWVNYXN0ZXIiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMjg1Mjk3LCJleHAiOjE3NzA4OTAwOTd9.bTLQw9yzMYjNG1685yafwwZiEP3eveGVVP5aKVDYETM',1770890097984,1770285297984),
(24,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJ1c2VybmFtZSI6ImJhZGthY2hlciIsImFjY291bnRJZCI6MTAsImlzR2FtZU1hc3RlciI6ZmFsc2UsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMjg5NjU0LCJleHAiOjE3NzA4OTQ0NTR9.0nWZVEMvA8xSI3NrI7bT49_qiUF8VnJiyyPHnno82HQ','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJ1c2VybmFtZSI6ImJhZGthY2hlciIsImFjY291bnRJZCI6MTAsImlzR2FtZU1hc3RlciI6ZmFsc2UsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMjg5NjU0LCJleHAiOjE3NzA4OTQ0NTR9.0nWZVEMvA8xSI3NrI7bT49_qiUF8VnJiyyPHnno82HQ',1770894454059,1770289654059),
(25,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJpc0dhbWVNYXN0ZXIiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMzc1MDAxLCJleHAiOjE3NzA5Nzk4MDF9.MPOgdf7XANSGFG9NCxsL624-YJ8BeQQ0Lukjrg_wqW4','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJpc0dhbWVNYXN0ZXIiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMzc1MDAxLCJleHAiOjE3NzA5Nzk4MDF9.MPOgdf7XANSGFG9NCxsL624-YJ8BeQQ0Lukjrg_wqW4',1770979801451,1770375001451),
(27,12,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJ1c2VybmFtZSI6ImF0cG11MDIiLCJhY2NvdW50SWQiOjEyLCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDM3NTY4OCwiZXhwIjoxNzcwOTgwNDg4fQ.ebbCS4Qmn792KpC78rqlnZsZtkU4xePg6BeCU_Rh-nw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJ1c2VybmFtZSI6ImF0cG11MDIiLCJhY2NvdW50SWQiOjEyLCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDM3NTY4OCwiZXhwIjoxNzcwOTgwNDg4fQ.ebbCS4Qmn792KpC78rqlnZsZtkU4xePg6BeCU_Rh-nw',1770980488287,1770375688287),
(28,13,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJ1c2VybmFtZSI6ImF0cG11MDMiLCJhY2NvdW50SWQiOjEzLCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDM3NjAwMiwiZXhwIjoxNzcwOTgwODAyfQ.syXkh76fLgjd6qDXjWnnumB7Z7fOKiq4YS69dEHynS0','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJ1c2VybmFtZSI6ImF0cG11MDMiLCJhY2NvdW50SWQiOjEzLCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDM3NjAwMiwiZXhwIjoxNzcwOTgwODAyfQ.syXkh76fLgjd6qDXjWnnumB7Z7fOKiq4YS69dEHynS0',1770980802727,1770376002727),
(30,15,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJ1c2VybmFtZSI6ImFuaGh1bmciLCJhY2NvdW50SWQiOjE1LCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDM3NzgwNywiZXhwIjoxNzcwOTgyNjA3fQ.P4Qfz7TNhJXZs48cTj2goec2r08jwnVbKnB1W093SzY','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJ1c2VybmFtZSI6ImFuaGh1bmciLCJhY2NvdW50SWQiOjE1LCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDM3NzgwNywiZXhwIjoxNzcwOTgyNjA3fQ.P4Qfz7TNhJXZs48cTj2goec2r08jwnVbKnB1W093SzY',1770982607333,1770377807333),
(31,15,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJ1c2VybmFtZSI6ImFuaGh1bmciLCJhY2NvdW50SWQiOjE1LCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDM3NzgxMSwiZXhwIjoxNzcwOTgyNjExfQ.C7ejPtlDwjMKSIdOWqKHdFQgUbIawuahW5iThfh9JEI','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJ1c2VybmFtZSI6ImFuaGh1bmciLCJhY2NvdW50SWQiOjE1LCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDM3NzgxMSwiZXhwIjoxNzcwOTgyNjExfQ.C7ejPtlDwjMKSIdOWqKHdFQgUbIawuahW5iThfh9JEI',1770982611305,1770377811305),
(32,16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJ1c2VybmFtZSI6ImNvbWZvMSIsImFjY291bnRJZCI6MTYsImlzR2FtZU1hc3RlciI6ZmFsc2UsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMzc3ODE1LCJleHAiOjE3NzA5ODI2MTV9.fj2tbnWnhlbktMe5b4BWtQTl1cRxLJkgObYH52mKTJA','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJ1c2VybmFtZSI6ImNvbWZvMSIsImFjY291bnRJZCI6MTYsImlzR2FtZU1hc3RlciI6ZmFsc2UsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMzc3ODE1LCJleHAiOjE3NzA5ODI2MTV9.fj2tbnWnhlbktMe5b4BWtQTl1cRxLJkgObYH52mKTJA',1770982615005,1770377815005),
(34,17,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJ1c2VybmFtZSI6InBhbmRhMSIsImFjY291bnRJZCI6MTcsImlzR2FtZU1hc3RlciI6ZmFsc2UsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMzc3ODkzLCJleHAiOjE3NzA5ODI2OTN9.rWFNVIuzGAZJ5mL6xzajD7oTq2RsoOKGU2_3_Ii8xJ8','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJ1c2VybmFtZSI6InBhbmRhMSIsImFjY291bnRJZCI6MTcsImlzR2FtZU1hc3RlciI6ZmFsc2UsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMzc3ODkzLCJleHAiOjE3NzA5ODI2OTN9.rWFNVIuzGAZJ5mL6xzajD7oTq2RsoOKGU2_3_Ii8xJ8',1770982693103,1770377893103),
(35,18,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4LCJ1c2VybmFtZSI6ImF0cG11MDUiLCJhY2NvdW50SWQiOjE4LCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDM4MDI3NSwiZXhwIjoxNzcwOTg1MDc1fQ.aksfPeI2rjzMKAboYvc3_IDh_CbBh8vXYhrFwJWZ5Ho','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4LCJ1c2VybmFtZSI6ImF0cG11MDUiLCJhY2NvdW50SWQiOjE4LCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDM4MDI3NSwiZXhwIjoxNzcwOTg1MDc1fQ.aksfPeI2rjzMKAboYvc3_IDh_CbBh8vXYhrFwJWZ5Ho',1770985075073,1770380275073),
(36,18,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4LCJ1c2VybmFtZSI6ImF0cG11MDUiLCJhY2NvdW50SWQiOjE4LCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDM4MDI3OSwiZXhwIjoxNzcwOTg1MDc5fQ.pum4eVndTCMBTj8gFM0hlP5z-iZhPbeJcDZWC0THuOg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4LCJ1c2VybmFtZSI6ImF0cG11MDUiLCJhY2NvdW50SWQiOjE4LCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDM4MDI3OSwiZXhwIjoxNzcwOTg1MDc5fQ.pum4eVndTCMBTj8gFM0hlP5z-iZhPbeJcDZWC0THuOg',1770985079442,1770380279442),
(37,19,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5LCJ1c2VybmFtZSI6ImF0cG11MDYiLCJhY2NvdW50SWQiOjE5LCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDM4MTA0NCwiZXhwIjoxNzcwOTg1ODQ0fQ.ftJ_1nOvx7vswwZ1Kpw5HIocUABk0NAYe8Pe8bkLCmE','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5LCJ1c2VybmFtZSI6ImF0cG11MDYiLCJhY2NvdW50SWQiOjE5LCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDM4MTA0NCwiZXhwIjoxNzcwOTg1ODQ0fQ.ftJ_1nOvx7vswwZ1Kpw5HIocUABk0NAYe8Pe8bkLCmE',1770985844204,1770381044204),
(38,20,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIwLCJ1c2VybmFtZSI6ImFuaGh1bmcxIiwiYWNjb3VudElkIjoyMCwiaXNHYW1lTWFzdGVyIjpmYWxzZSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NzAzODEwOTAsImV4cCI6MTc3MDk4NTg5MH0.FMNt3E4u2xYJg_83W9Z28s0N7G8Rgeqp6gISOpBT3nM','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIwLCJ1c2VybmFtZSI6ImFuaGh1bmcxIiwiYWNjb3VudElkIjoyMCwiaXNHYW1lTWFzdGVyIjpmYWxzZSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NzAzODEwOTAsImV4cCI6MTc3MDk4NTg5MH0.FMNt3E4u2xYJg_83W9Z28s0N7G8Rgeqp6gISOpBT3nM',1770985890947,1770381090947),
(39,20,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIwLCJ1c2VybmFtZSI6ImFuaGh1bmcxIiwiYWNjb3VudElkIjoyMCwiaXNHYW1lTWFzdGVyIjpmYWxzZSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NzAzODEwOTQsImV4cCI6MTc3MDk4NTg5NH0.eWrutEgEHRHUsA5VnJBV5g3cCE9TedZo3y2VMYWYp84','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIwLCJ1c2VybmFtZSI6ImFuaGh1bmcxIiwiYWNjb3VudElkIjoyMCwiaXNHYW1lTWFzdGVyIjpmYWxzZSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NzAzODEwOTQsImV4cCI6MTc3MDk4NTg5NH0.eWrutEgEHRHUsA5VnJBV5g3cCE9TedZo3y2VMYWYp84',1770985894752,1770381094752),
(40,21,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxLCJ1c2VybmFtZSI6Im1pY2FtMTIzIiwiYWNjb3VudElkIjoyMSwiaXNHYW1lTWFzdGVyIjpmYWxzZSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NzAzODIyNTYsImV4cCI6MTc3MDk4NzA1Nn0.fVZdOSgJrkTXzTus5ofGW77V6Dp64hGGW3Ld74gVN3A','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxLCJ1c2VybmFtZSI6Im1pY2FtMTIzIiwiYWNjb3VudElkIjoyMSwiaXNHYW1lTWFzdGVyIjpmYWxzZSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NzAzODIyNTYsImV4cCI6MTc3MDk4NzA1Nn0.fVZdOSgJrkTXzTus5ofGW77V6Dp64hGGW3Ld74gVN3A',1770987056521,1770382256521),
(41,21,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxLCJ1c2VybmFtZSI6Im1pY2FtMTIzIiwiYWNjb3VudElkIjoyMSwiaXNHYW1lTWFzdGVyIjpmYWxzZSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NzAzODIyNzEsImV4cCI6MTc3MDk4NzA3MX0.B2dimNIXqLt9Kg8bla-hkKoKfFUfvhCJruoozOO1RVg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxLCJ1c2VybmFtZSI6Im1pY2FtMTIzIiwiYWNjb3VudElkIjoyMSwiaXNHYW1lTWFzdGVyIjpmYWxzZSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NzAzODIyNzEsImV4cCI6MTc3MDk4NzA3MX0.B2dimNIXqLt9Kg8bla-hkKoKfFUfvhCJruoozOO1RVg',1770987071127,1770382271127),
(42,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJpc0dhbWVNYXN0ZXIiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMzgzNDg2LCJleHAiOjE3NzA5ODgyODZ9.XOcpu92YV-eJLMc1fpNeVLp6BMrdlwfkqnDr0MR6yhs','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoia2FjaGVyIiwiYWNjb3VudElkIjozLCJpc0dhbWVNYXN0ZXIiOnRydWUsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwMzgzNDg2LCJleHAiOjE3NzA5ODgyODZ9.XOcpu92YV-eJLMc1fpNeVLp6BMrdlwfkqnDr0MR6yhs',1770988286637,1770383486637),
(43,22,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJ1c2VybmFtZSI6ImFuaGh1bmcyIiwiYWNjb3VudElkIjoyMiwiaXNHYW1lTWFzdGVyIjpmYWxzZSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NzAzODQ1OTgsImV4cCI6MTc3MDk4OTM5OH0.br2DT8dK5BvgtKP94LMzihrLTAg9oko2cONHozHvloA','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJ1c2VybmFtZSI6ImFuaGh1bmcyIiwiYWNjb3VudElkIjoyMiwiaXNHYW1lTWFzdGVyIjpmYWxzZSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NzAzODQ1OTgsImV4cCI6MTc3MDk4OTM5OH0.br2DT8dK5BvgtKP94LMzihrLTAg9oko2cONHozHvloA',1770989398745,1770384598745),
(44,15,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJ1c2VybmFtZSI6ImFuaGh1bmciLCJhY2NvdW50SWQiOjE1LCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDM4ODIwMSwiZXhwIjoxNzcwOTkzMDAxfQ.JtwuBV2gWYjn-ZbGF4SbtHBO8TOSSAI8ChvCnZok4tw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJ1c2VybmFtZSI6ImFuaGh1bmciLCJhY2NvdW50SWQiOjE1LCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDM4ODIwMSwiZXhwIjoxNzcwOTkzMDAxfQ.JtwuBV2gWYjn-ZbGF4SbtHBO8TOSSAI8ChvCnZok4tw',1770993001860,1770388201860),
(45,11,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ1c2VybmFtZSI6ImF0cG11MDEiLCJhY2NvdW50SWQiOjExLCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDM5Mjk1MiwiZXhwIjoxNzcwOTk3NzUyfQ.0hIDnqLGDxvaiecDd1YdhWHv-wI-tBkS6UdN6qFYS1I','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ1c2VybmFtZSI6ImF0cG11MDEiLCJhY2NvdW50SWQiOjExLCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDM5Mjk1MiwiZXhwIjoxNzcwOTk3NzUyfQ.0hIDnqLGDxvaiecDd1YdhWHv-wI-tBkS6UdN6qFYS1I',1770997752011,1770392952011),
(46,23,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIzLCJ1c2VybmFtZSI6Imh1eWJhbGV0IiwiYWNjb3VudElkIjoyMywiaXNHYW1lTWFzdGVyIjpmYWxzZSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NzA0MDMwMjksImV4cCI6MTc3MTAwNzgyOX0.NtMvGt5FJ1IS0aB9c9_vr08Lez3Gi1-dtLRW0KZxDgM','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIzLCJ1c2VybmFtZSI6Imh1eWJhbGV0IiwiYWNjb3VudElkIjoyMywiaXNHYW1lTWFzdGVyIjpmYWxzZSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NzA0MDMwMjksImV4cCI6MTc3MTAwNzgyOX0.NtMvGt5FJ1IS0aB9c9_vr08Lez3Gi1-dtLRW0KZxDgM',1771007829233,1770403029233),
(48,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI0LCJ1c2VybmFtZSI6Imh1eWJhbGV0MTIiLCJhY2NvdW50SWQiOjI0LCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDQwMzQ2NywiZXhwIjoxNzcxMDA4MjY3fQ.AVHtNsQqvTAj7aePVT_Mn8BrJ0e5TRGPKwTA3LIKBGs','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI0LCJ1c2VybmFtZSI6Imh1eWJhbGV0MTIiLCJhY2NvdW50SWQiOjI0LCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDQwMzQ2NywiZXhwIjoxNzcxMDA4MjY3fQ.AVHtNsQqvTAj7aePVT_Mn8BrJ0e5TRGPKwTA3LIKBGs',1771008267171,1770403467171),
(49,15,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJ1c2VybmFtZSI6ImFuaGh1bmciLCJhY2NvdW50SWQiOjE1LCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDQxNTgzNSwiZXhwIjoxNzcxMDIwNjM1fQ.VzsQtsEywVd-V3cyG7XFzwehc2IdiaVarZxpF0TGYpM','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJ1c2VybmFtZSI6ImFuaGh1bmciLCJhY2NvdW50SWQiOjE1LCJpc0dhbWVNYXN0ZXIiOmZhbHNlLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc3MDQxNTgzNSwiZXhwIjoxNzcxMDIwNjM1fQ.VzsQtsEywVd-V3cyG7XFzwehc2IdiaVarZxpF0TGYpM',1771020635031,1770415835031),
(50,17,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJ1c2VybmFtZSI6InBhbmRhMSIsImFjY291bnRJZCI6MTcsImlzR2FtZU1hc3RlciI6ZmFsc2UsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwNDM4NjQyLCJleHAiOjE3NzEwNDM0NDJ9.INnvX13y2prn-Qi07ElH3icENYroScxLjzs6vj2Vkxk','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJ1c2VybmFtZSI6InBhbmRhMSIsImFjY291bnRJZCI6MTcsImlzR2FtZU1hc3RlciI6ZmFsc2UsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzcwNDM4NjQyLCJleHAiOjE3NzEwNDM0NDJ9.INnvX13y2prn-Qi07ElH3icENYroScxLjzs6vj2Vkxk',1771043442180,1770438642180);
/*!40000 ALTER TABLE `user_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_account_country`
--

DROP TABLE IF EXISTS `webengine_account_country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_account_country` (
  `account` varchar(10) NOT NULL,
  `country` varchar(10) NOT NULL,
  `lastchange` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`account`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_account_country`
--

LOCK TABLES `webengine_account_country` WRITE;
/*!40000 ALTER TABLE `webengine_account_country` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_account_country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_ban_log`
--

DROP TABLE IF EXISTS `webengine_ban_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_ban_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` varchar(50) NOT NULL,
  `banned_by` varchar(50) NOT NULL,
  `ban_type` varchar(50) NOT NULL,
  `ban_date` varchar(50) NOT NULL,
  `ban_days` int(11) DEFAULT NULL,
  `ban_reason` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_ban_log`
--

LOCK TABLES `webengine_ban_log` WRITE;
/*!40000 ALTER TABLE `webengine_ban_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_ban_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_bans`
--

DROP TABLE IF EXISTS `webengine_bans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_bans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` varchar(50) NOT NULL,
  `banned_by` varchar(50) NOT NULL,
  `ban_date` int(11) NOT NULL,
  `ban_days` int(11) NOT NULL,
  `ban_reason` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_bans`
--

LOCK TABLES `webengine_bans` WRITE;
/*!40000 ALTER TABLE `webengine_bans` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_bans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_blocked_ip`
--

DROP TABLE IF EXISTS `webengine_blocked_ip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_blocked_ip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `block_ip` varchar(50) NOT NULL,
  `block_by` varchar(25) NOT NULL,
  `block_date` varchar(50) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_blocked_ip`
--

LOCK TABLES `webengine_blocked_ip` WRITE;
/*!40000 ALTER TABLE `webengine_blocked_ip` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_blocked_ip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_credits_config`
--

DROP TABLE IF EXISTS `webengine_credits_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_credits_config` (
  `config_id` int(11) NOT NULL AUTO_INCREMENT,
  `config_title` varchar(50) NOT NULL,
  `config_database` varchar(50) NOT NULL,
  `config_table` varchar(50) NOT NULL,
  `config_credits_col` varchar(50) NOT NULL,
  `config_user_col` varchar(50) NOT NULL,
  `config_user_col_id` varchar(50) NOT NULL,
  `config_checkonline` tinyint(3) unsigned NOT NULL,
  `config_display` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`config_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_credits_config`
--

LOCK TABLES `webengine_credits_config` WRITE;
/*!40000 ALTER TABLE `webengine_credits_config` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_credits_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_credits_logs`
--

DROP TABLE IF EXISTS `webengine_credits_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_credits_logs` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `log_config` varchar(50) NOT NULL,
  `log_identifier` varchar(50) NOT NULL,
  `log_credits` int(11) NOT NULL,
  `log_transaction` varchar(50) NOT NULL,
  `log_date` varchar(50) NOT NULL,
  `log_inadmincp` tinyint(3) unsigned DEFAULT NULL,
  `log_module` varchar(50) DEFAULT NULL,
  `log_ip` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`log_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_credits_logs`
--

LOCK TABLES `webengine_credits_logs` WRITE;
/*!40000 ALTER TABLE `webengine_credits_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_credits_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_cron`
--

DROP TABLE IF EXISTS `webengine_cron`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_cron` (
  `cron_id` int(11) NOT NULL AUTO_INCREMENT,
  `cron_name` varchar(100) NOT NULL,
  `cron_description` longtext DEFAULT NULL,
  `cron_file_run` longtext NOT NULL,
  `cron_run_time` varchar(50) NOT NULL,
  `cron_last_run` varchar(50) DEFAULT NULL,
  `cron_status` int(11) NOT NULL,
  `cron_protected` int(11) NOT NULL,
  `cron_file_md5` varchar(50) NOT NULL,
  PRIMARY KEY (`cron_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_cron`
--

LOCK TABLES `webengine_cron` WRITE;
/*!40000 ALTER TABLE `webengine_cron` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_cron` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_downloads`
--

DROP TABLE IF EXISTS `webengine_downloads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_downloads` (
  `download_id` int(11) NOT NULL AUTO_INCREMENT,
  `download_title` varchar(100) NOT NULL,
  `download_description` varchar(100) DEFAULT NULL,
  `download_link` longtext NOT NULL,
  `download_size` double DEFAULT NULL,
  `download_type` int(11) NOT NULL,
  PRIMARY KEY (`download_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_downloads`
--

LOCK TABLES `webengine_downloads` WRITE;
/*!40000 ALTER TABLE `webengine_downloads` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_downloads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_fla`
--

DROP TABLE IF EXISTS `webengine_fla`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_fla` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `ip_address` varchar(50) NOT NULL,
  `unlock_timestamp` varchar(50) NOT NULL,
  `failed_attempts` int(11) NOT NULL,
  `timestamp` varchar(50) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_fla`
--

LOCK TABLES `webengine_fla` WRITE;
/*!40000 ALTER TABLE `webengine_fla` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_fla` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_news`
--

DROP TABLE IF EXISTS `webengine_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_news` (
  `news_id` int(11) NOT NULL AUTO_INCREMENT,
  `news_title` longtext NOT NULL,
  `news_author` varchar(50) NOT NULL,
  `news_date` varchar(50) NOT NULL,
  `news_content` longtext NOT NULL,
  `allow_comments` int(11) NOT NULL,
  PRIMARY KEY (`news_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_news`
--

LOCK TABLES `webengine_news` WRITE;
/*!40000 ALTER TABLE `webengine_news` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_news_translations`
--

DROP TABLE IF EXISTS `webengine_news_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_news_translations` (
  `news_id` int(11) NOT NULL,
  `news_language` varchar(10) NOT NULL,
  `news_title` longtext NOT NULL,
  `news_content` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_news_translations`
--

LOCK TABLES `webengine_news_translations` WRITE;
/*!40000 ALTER TABLE `webengine_news_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_news_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_passchange_request`
--

DROP TABLE IF EXISTS `webengine_passchange_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_passchange_request` (
  `user_id` int(11) NOT NULL,
  `new_password` varchar(200) NOT NULL,
  `auth_code` varchar(50) NOT NULL,
  `request_date` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_passchange_request`
--

LOCK TABLES `webengine_passchange_request` WRITE;
/*!40000 ALTER TABLE `webengine_passchange_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_passchange_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_paypal_transactions`
--

DROP TABLE IF EXISTS `webengine_paypal_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_paypal_transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_id` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `payment_amount` varchar(50) NOT NULL,
  `paypal_email` varchar(200) NOT NULL,
  `transaction_date` varchar(50) NOT NULL,
  `transaction_status` int(11) NOT NULL,
  `order_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_paypal_transactions`
--

LOCK TABLES `webengine_paypal_transactions` WRITE;
/*!40000 ALTER TABLE `webengine_paypal_transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_paypal_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_plugins`
--

DROP TABLE IF EXISTS `webengine_plugins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_plugins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `author` varchar(50) NOT NULL,
  `version` varchar(50) NOT NULL,
  `compatibility` longtext NOT NULL,
  `folder` longtext NOT NULL,
  `files` longtext NOT NULL,
  `status` int(11) NOT NULL,
  `install_date` varchar(50) NOT NULL,
  `installed_by` varchar(50) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_plugins`
--

LOCK TABLES `webengine_plugins` WRITE;
/*!40000 ALTER TABLE `webengine_plugins` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_plugins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_redeemcode`
--

DROP TABLE IF EXISTS `webengine_redeemcode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_redeemcode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `redeem_code` varchar(50) NOT NULL,
  `redeem_type` varchar(50) NOT NULL,
  `redeem_limit` int(11) DEFAULT NULL,
  `redeem_user` varchar(50) DEFAULT NULL,
  `redeem_credit_config_id` int(11) NOT NULL,
  `redeem_credit_amount` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_redeemcode`
--

LOCK TABLES `webengine_redeemcode` WRITE;
/*!40000 ALTER TABLE `webengine_redeemcode` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_redeemcode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_redeemcode_logs`
--

DROP TABLE IF EXISTS `webengine_redeemcode_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_redeemcode_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code_id` int(11) NOT NULL,
  `date_redeemed` datetime NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `user_identifier` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_redeemcode_logs`
--

LOCK TABLES `webengine_redeemcode_logs` WRITE;
/*!40000 ALTER TABLE `webengine_redeemcode_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_redeemcode_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_register_account`
--

DROP TABLE IF EXISTS `webengine_register_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_register_account` (
  `registration_account` varchar(50) NOT NULL,
  `registration_password` varchar(50) NOT NULL,
  `registration_email` varchar(50) NOT NULL,
  `registration_date` varchar(50) NOT NULL,
  `registration_ip` varchar(50) NOT NULL,
  `registration_key` varchar(50) NOT NULL,
  PRIMARY KEY (`registration_account`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_register_account`
--

LOCK TABLES `webengine_register_account` WRITE;
/*!40000 ALTER TABLE `webengine_register_account` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_register_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_vote_logs`
--

DROP TABLE IF EXISTS `webengine_vote_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_vote_logs` (
  `user_id` int(11) NOT NULL,
  `votesite_id` int(11) NOT NULL,
  `timestamp` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_vote_logs`
--

LOCK TABLES `webengine_vote_logs` WRITE;
/*!40000 ALTER TABLE `webengine_vote_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_vote_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_vote_sites`
--

DROP TABLE IF EXISTS `webengine_vote_sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_vote_sites` (
  `votesite_id` int(11) NOT NULL AUTO_INCREMENT,
  `votesite_title` varchar(50) NOT NULL,
  `votesite_link` longtext NOT NULL,
  `votesite_reward` int(11) NOT NULL,
  `votesite_time` int(11) NOT NULL,
  PRIMARY KEY (`votesite_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_vote_sites`
--

LOCK TABLES `webengine_vote_sites` WRITE;
/*!40000 ALTER TABLE `webengine_vote_sites` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_vote_sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webengine_votes`
--

DROP TABLE IF EXISTS `webengine_votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webengine_votes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `user_ip` varchar(50) NOT NULL,
  `vote_site_id` int(11) NOT NULL,
  `timestamp` varchar(50) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webengine_votes`
--

LOCK TABLES `webengine_votes` WRITE;
/*!40000 ALTER TABLE `webengine_votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `webengine_votes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-07 11:38:24
