-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: coffee_estate_v1
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `attendance_id` int NOT NULL AUTO_INCREMENT,
  `labor_id` int NOT NULL,
  `property_id` int NOT NULL,
  `user_id` int NOT NULL,
  `entry_date` datetime NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_on` datetime DEFAULT NULL,
  `attendance_value` decimal(3,2) DEFAULT '0.00',
  PRIMARY KEY (`attendance_id`),
  KEY `labor_id` (`labor_id`),
  KEY `property_id` (`property_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`labor_id`) REFERENCES `labors` (`labor_id`),
  CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`),
  CONSTRAINT `attendance_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,1,1,1,'2025-09-01 00:00:00','Admin',NULL,'2025-09-30 15:39:55',NULL,0.00),(2,11,1,1,'2025-09-01 00:00:00','Admin',NULL,'2025-09-30 15:39:55',NULL,0.00),(3,1,1,1,'2025-09-01 00:00:00','Admin',NULL,'2025-09-30 16:43:38',NULL,1.00),(4,1,1,1,'2025-09-02 00:00:00','Admin',NULL,'2025-09-30 16:43:38',NULL,1.00),(5,11,1,1,'2025-09-01 00:00:00','Admin',NULL,'2025-09-30 16:43:38',NULL,1.00),(6,11,1,1,'2025-09-02 00:00:00','Admin',NULL,'2025-09-30 16:43:38',NULL,1.00),(7,12,1,1,'2025-09-01 00:00:00','Admin',NULL,'2025-09-30 16:43:38',NULL,1.00),(8,12,1,1,'2025-09-02 00:00:00','Admin',NULL,'2025-09-30 16:43:38',NULL,0.50),(9,1,1,1,'2025-09-01 00:00:00','Admin',NULL,'2025-09-30 16:47:05',NULL,1.00),(10,1,1,1,'2025-09-02 00:00:00','Admin',NULL,'2025-09-30 16:47:05',NULL,1.00),(11,1,1,1,'2025-09-03 00:00:00','Admin',NULL,'2025-09-30 16:47:05',NULL,1.00),(12,11,1,1,'2025-09-01 00:00:00','Admin',NULL,'2025-09-30 16:47:05',NULL,1.00),(13,11,1,1,'2025-09-02 00:00:00','Admin',NULL,'2025-09-30 16:47:05',NULL,1.00),(14,11,1,1,'2025-09-03 00:00:00','Admin',NULL,'2025-09-30 16:47:05',NULL,0.50),(15,12,1,1,'2025-09-01 00:00:00','Admin',NULL,'2025-09-30 16:47:05',NULL,1.00),(16,12,1,1,'2025-09-02 00:00:00','Admin',NULL,'2025-09-30 16:47:05',NULL,0.50),(17,12,1,1,'2025-09-03 00:00:00','Admin',NULL,'2025-09-30 16:47:05',NULL,0.25);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baseunit`
--

DROP TABLE IF EXISTS `baseunit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baseunit` (
  `baseunit_id` int NOT NULL AUTO_INCREMENT,
  `baseunit_name` varchar(100) NOT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`baseunit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baseunit`
--

LOCK TABLES `baseunit` WRITE;
/*!40000 ALTER TABLE `baseunit` DISABLE KEYS */;
INSERT INTO `baseunit` VALUES (1,'kg','2025-10-11 08:34:07','sys','2025-10-11 08:34:07',NULL),(2,'bushal','2025-10-11 08:34:07','sys','2025-10-11 08:34:07',NULL),(3,'mm','2025-10-11 08:34:07','sys','2025-10-11 08:34:07',NULL);
/*!40000 ALTER TABLE `baseunit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blocks`
--

DROP TABLE IF EXISTS `blocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blocks` (
  `block_id` int NOT NULL AUTO_INCREMENT,
  `block_name` varchar(300) NOT NULL,
  `block_area` float DEFAULT NULL,
  `property_id` int DEFAULT NULL,
  `parent_block_id` int DEFAULT NULL,
  PRIMARY KEY (`block_id`),
  KEY `property_id` (`property_id`),
  KEY `fk_blocks_parent` (`parent_block_id`),
  CONSTRAINT `blocks_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`),
  CONSTRAINT `fk_blocks_parent` FOREIGN KEY (`parent_block_id`) REFERENCES `blocks` (`block_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blocks`
--

LOCK TABLES `blocks` WRITE;
/*!40000 ALTER TABLE `blocks` DISABLE KEYS */;
INSERT INTO `blocks` VALUES (1,'A',23,1,NULL),(3,'B',33,1,NULL),(4,'Q',11,1,NULL),(5,'SUB BLOCK A',22,1,1);
/*!40000 ALTER TABLE `blocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crop_income`
--

DROP TABLE IF EXISTS `crop_income`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crop_income` (
  `income_id` int NOT NULL AUTO_INCREMENT,
  `crop_id` int DEFAULT NULL,
  `income_amount` decimal(12,2) DEFAULT NULL,
  `received_date` text,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`income_id`),
  KEY `crop_id` (`crop_id`),
  CONSTRAINT `crop_income_ibfk_1` FOREIGN KEY (`crop_id`) REFERENCES `crop_details` (`crop_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crop_income`
--

LOCK TABLES `crop_income` WRITE;
/*!40000 ALTER TABLE `crop_income` DISABLE KEYS */;
/*!40000 ALTER TABLE `crop_income` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cropdetails`
--

DROP TABLE IF EXISTS `cropdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cropdetails` (
  `crop_id` int NOT NULL AUTO_INCREMENT,
  `yield_obtained` float DEFAULT NULL,
  `selling_price` float DEFAULT NULL,
  `property_id` int DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL,
  `other_detail` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`crop_id`),
  KEY `cropdetails_ibfk_2_idx` (`property_id`),
  CONSTRAINT `cropdetails_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cropdetails`
--

LOCK TABLES `cropdetails` WRITE;
/*!40000 ALTER TABLE `cropdetails` DISABLE KEYS */;
INSERT INTO `cropdetails` VALUES (1,20000,11000,1,NULL,NULL,NULL,NULL,NULL),(2,22,1111,1,'2024-09-12 14:44:43',NULL,NULL,NULL,NULL),(3,200,20000,2,NULL,NULL,NULL,NULL,NULL),(4,200,20000,2,NULL,NULL,NULL,NULL,NULL),(5,12,111,1,NULL,NULL,NULL,NULL,NULL),(6,195,20000,1,'2025-09-29 23:54:46','sys',NULL,NULL,''),(7,195,20000,2,'2025-09-29 23:55:07','sys',NULL,NULL,''),(8,21,222,1,'2025-09-29 23:55:33','sys',NULL,NULL,'');
/*!40000 ALTER TABLE `cropdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenditure`
--

DROP TABLE IF EXISTS `expenditure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenditure` (
  `expenditure_id` int NOT NULL AUTO_INCREMENT,
  `water` float DEFAULT NULL,
  `fertilizer` float DEFAULT NULL,
  `pruning` float DEFAULT NULL,
  `others` float DEFAULT NULL,
  `edate` datetime DEFAULT NULL,
  `property_id` int DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `fuel` float DEFAULT NULL,
  PRIMARY KEY (`expenditure_id`),
  KEY `expenditure_ibfb_2_idx` (`property_id`),
  CONSTRAINT `expenditure_ibfb_2` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenditure`
--

LOCK TABLES `expenditure` WRITE;
/*!40000 ALTER TABLE `expenditure` DISABLE KEYS */;
INSERT INTO `expenditure` VALUES (1,2000,23030,3332220,313131,'2024-08-31 00:00:00',1,NULL,NULL,NULL,1001),(3,99,7,77,99,NULL,NULL,NULL,NULL,NULL,NULL),(4,99,9,98,88,NULL,NULL,NULL,NULL,NULL,NULL),(5,991,9,98,88,NULL,NULL,NULL,NULL,NULL,NULL),(6,88,99,77,99,'2024-08-30 23:29:00',1,NULL,NULL,NULL,2122),(7,88,77,6666,98,'2024-09-11 10:29:00',1,NULL,NULL,NULL,NULL),(8,200,200,200,200,'2025-09-29 15:01:00',1,'2025-09-30 00:04:42','sys',NULL,0);
/*!40000 ALTER TABLE `expenditure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expensetype`
--

DROP TABLE IF EXISTS `expensetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expensetype` (
  `expensetype_id` int NOT NULL AUTO_INCREMENT,
  `expense_code` varchar(50) NOT NULL,
  `expense_name` varchar(100) NOT NULL,
  `current_rate` float DEFAULT NULL,
  `baseunit_id` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`expensetype_id`),
  UNIQUE KEY `expense_code` (`expense_code`),
  KEY `fk_expensetype_baseunit` (`baseunit_id`),
  CONSTRAINT `fk_expensetype_baseunit` FOREIGN KEY (`baseunit_id`) REFERENCES `baseunit` (`baseunit_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expensetype`
--

LOCK TABLES `expensetype` WRITE;
/*!40000 ALTER TABLE `expensetype` DISABLE KEYS */;
/*!40000 ALTER TABLE `expensetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fertilizers`
--

DROP TABLE IF EXISTS `fertilizers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fertilizers` (
  `fertilizer_id` int NOT NULL AUTO_INCREMENT,
  `fertilizer_name` varchar(255) DEFAULT NULL,
  `date_of_application` date DEFAULT NULL,
  `property_id` int DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL,
  `other_details` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`fertilizer_id`),
  KEY `fertilizers_ibfk_1_idx` (`property_id`),
  CONSTRAINT `fertilizers_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fertilizers`
--

LOCK TABLES `fertilizers` WRITE;
/*!40000 ALTER TABLE `fertilizers` DISABLE KEYS */;
INSERT INTO `fertilizers` VALUES (1,'NPK 20-10-70','2024-08-30',1,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `fertilizers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labors`
--

DROP TABLE IF EXISTS `labors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labors` (
  `labor_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `age` int DEFAULT NULL,
  `adhar_card` varchar(255) DEFAULT NULL,
  `bank_details` varchar(255) DEFAULT NULL,
  `health_history` text,
  `photo` blob,
  `address` varchar(255) DEFAULT NULL,
  `emergency_details` varchar(255) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`labor_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `labors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labors`
--

LOCK TABLES `labors` WRITE;
/*!40000 ALTER TABLE `labors` DISABLE KEYS */;
INSERT INTO `labors` VALUES (1,1,'Sundara',30,'420420- 420420','Jagara International Bank','Health and fix',_binary 'https://en.wikipedia.org/wiki/Sunder_%28actor%29#/media/File:Sunder_Actor.jpg','Jagara','Owner address',NULL,NULL,NULL,NULL),(2,1,'Best Labour',23,'3232323','23232','adsadasdas','','sadsasad','11222','2024-09-12 14:43:23',NULL,NULL,NULL),(3,1,'Test Lab 2',22,'122212','221121','asassad','','sdsds','sdsd','2024-09-13 15:26:41',NULL,NULL,NULL),(4,5,'Test Lab 21',22,'122212','221121','asassad','','sdsds','sdsd','2024-09-13 15:27:02',NULL,NULL,NULL),(5,5,'Test Lab 3',33,'3232323','55555','ddsfds',_binary 'sa','fsasfa','afasfasf','2024-09-13 15:37:49',NULL,NULL,NULL),(6,1,'Test Lab 3',33,'3232323','55555','ddsfds',_binary 'sa','fsasfa','afasfasf','2024-09-13 15:38:13',NULL,NULL,NULL),(7,1,'Test Lab 3',33,'3232323','55555','ddsfds',_binary 'sa','fsasfa','afasfasf','2024-09-13 15:42:37',NULL,NULL,NULL),(8,1,'Test Lab 32',33,'3232323','55555','ddsfds',_binary 'sa','fsasfa','afasfasf','2024-09-13 15:53:58',NULL,NULL,NULL),(9,1,'Test Lab 55',33,'3232323','55555','ddsfds',_binary 'sa','fsasfa','afasfasf','2024-09-13 15:55:21',NULL,NULL,NULL),(10,1,'Test Lab 551',33,'3232323','55555','ddsfds',_binary 'sa','fsasfa','afasfasf','2024-09-13 15:55:34',NULL,NULL,NULL),(11,1,'Test Lab 55322',33,'3232323','55555','ddsfds',_binary 'sa','fsasfa','afasfasf','2024-09-13 15:58:01',NULL,NULL,NULL),(12,5,'TestNewLab1',26,'8888778999','122344','asadas',_binary 'D:\\JavaTerrain','add 123','333','2025-09-29 23:26:05','sys',NULL,NULL);
/*!40000 ALTER TABLE `labors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laborvendor`
--

DROP TABLE IF EXISTS `laborvendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laborvendor` (
  `laborvendor_id` int NOT NULL AUTO_INCREMENT,
  `labor_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `vendor_labor_percentage` decimal(5,2) DEFAULT NULL,
  `laborvendorcode` varchar(50) NOT NULL,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`laborvendor_id`),
  UNIQUE KEY `laborvendorcode` (`laborvendorcode`),
  KEY `fk_laborvendor_labor` (`labor_id`),
  KEY `fk_laborvendor_vendor` (`vendor_id`),
  CONSTRAINT `fk_laborvendor_labor` FOREIGN KEY (`labor_id`) REFERENCES `labors` (`labor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_laborvendor_vendor` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `laborvendor_chk_1` CHECK ((`vendor_labor_percentage` between 0 and 100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laborvendor`
--

LOCK TABLES `laborvendor` WRITE;
/*!40000 ALTER TABLE `laborvendor` DISABLE KEYS */;
/*!40000 ALTER TABLE `laborvendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laborvendor_settlement`
--

DROP TABLE IF EXISTS `laborvendor_settlement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laborvendor_settlement` (
  `laborvendor_settlement_id` int NOT NULL AUTO_INCREMENT,
  `laborvendor_id` int NOT NULL,
  `settled_amount` decimal(10,2) DEFAULT '0.00',
  `advance_amount` decimal(10,2) DEFAULT '0.00',
  `running_wage_transaction_date` date NOT NULL,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`laborvendor_settlement_id`),
  KEY `fk_laborvendor_settlement` (`laborvendor_id`),
  CONSTRAINT `fk_laborvendor_settlement` FOREIGN KEY (`laborvendor_id`) REFERENCES `laborvendor` (`laborvendor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laborvendor_settlement`
--

LOCK TABLES `laborvendor_settlement` WRITE;
/*!40000 ALTER TABLE `laborvendor_settlement` DISABLE KEYS */;
/*!40000 ALTER TABLE `laborvendor_settlement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plantdetails`
--

DROP TABLE IF EXISTS `plantdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plantdetails` (
  `plant_id` int NOT NULL AUTO_INCREMENT,
  `plant_type` enum('robusta','arabica') NOT NULL,
  `details` text,
  `block_id` int DEFAULT NULL,
  `plantdetailscol` varchar(45) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`plant_id`),
  KEY `plantdetails_ibfk_2_idx` (`block_id`),
  CONSTRAINT `plantdetails_ibfk_2` FOREIGN KEY (`block_id`) REFERENCES `blocks` (`block_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plantdetails`
--

LOCK TABLES `plantdetails` WRITE;
/*!40000 ALTER TABLE `plantdetails` DISABLE KEYS */;
INSERT INTO `plantdetails` VALUES (1,'arabica','This is good varity1111',3,NULL,NULL,NULL,'2024-09-11 15:47:36',NULL),(2,'arabica','sdsdsd',1,NULL,'2024-09-12 14:44:28',NULL,NULL,NULL),(3,'robusta','Some varity',1,NULL,'2025-09-29 23:46:25','sys',NULL,NULL);
/*!40000 ALTER TABLE `plantdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `property_id` int NOT NULL AUTO_INCREMENT,
  `property_name` varchar(300) NOT NULL,
  `total_acre` float DEFAULT NULL,
  `address_1` varchar(200) DEFAULT NULL,
  `address_2` varchar(200) DEFAULT NULL,
  `pincode` varchar(200) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`property_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `property_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (1,'Manjushree',12,'1122','777','999',1,NULL,NULL,'2024-09-05 11:38:07',NULL),(2,'Belavadi',23,'add2','add3','445555',1,NULL,NULL,NULL,NULL),(3,'Testprop1',1,'qw33','asda','33223',1,'2025-09-30 00:26:26','sys',NULL,NULL);
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propertylabor`
--

DROP TABLE IF EXISTS `propertylabor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propertylabor` (
  `property_id` int DEFAULT NULL,
  `labor_id` int DEFAULT NULL,
  KEY `labor_id` (`labor_id`),
  KEY `propertylabor_ibfk_1` (`property_id`),
  CONSTRAINT `propertylabor_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`),
  CONSTRAINT `propertylabor_ibfk_2` FOREIGN KEY (`labor_id`) REFERENCES `labors` (`labor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propertylabor`
--

LOCK TABLES `propertylabor` WRITE;
/*!40000 ALTER TABLE `propertylabor` DISABLE KEYS */;
INSERT INTO `propertylabor` VALUES (1,1),(1,11),(1,12);
/*!40000 ALTER TABLE `propertylabor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propertyuser`
--

DROP TABLE IF EXISTS `propertyuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propertyuser` (
  `property_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  KEY `property_id` (`property_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `propertyuser_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`),
  CONSTRAINT `propertyuser_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propertyuser`
--

LOCK TABLES `propertyuser` WRITE;
/*!40000 ALTER TABLE `propertyuser` DISABLE KEYS */;
INSERT INTO `propertyuser` VALUES (2,1),(1,1),(1,5),(3,1);
/*!40000 ALTER TABLE `propertyuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `raindetails`
--

DROP TABLE IF EXISTS `raindetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `raindetails` (
  `rain_id` int NOT NULL AUTO_INCREMENT,
  `date_time` datetime DEFAULT NULL,
  `rain_amount` float DEFAULT NULL,
  `block_id` int DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`rain_id`),
  KEY `raindetails_ibfk_2_idx` (`block_id`),
  CONSTRAINT `raindetails_ibfk_2` FOREIGN KEY (`block_id`) REFERENCES `blocks` (`block_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raindetails`
--

LOCK TABLES `raindetails` WRITE;
/*!40000 ALTER TABLE `raindetails` DISABLE KEYS */;
INSERT INTO `raindetails` VALUES (1,'2024-08-29 15:23:00',333,3,NULL,NULL,'2024-09-11 15:23:05',NULL),(3,'2024-09-14 14:45:00',222,1,'2024-09-12 14:46:30',NULL,NULL,NULL),(4,'2024-09-07 16:25:00',5555,1,'2024-09-13 16:25:43',NULL,NULL,NULL),(5,'2025-09-24 03:08:00',22,1,'2025-09-30 00:05:42','sys',NULL,NULL);
/*!40000 ALTER TABLE `raindetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `total_expenditure` float DEFAULT NULL,
  `total_revenue` float DEFAULT NULL,
  `profit_loss` float DEFAULT NULL,
  `property_id` int DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`report_id`),
  KEY `reports_ibfk_2_idx` (`property_id`),
  CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,222222,888889000,25,NULL,NULL,NULL,NULL,NULL),(2,200000,1000000,800000,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('owner','guest') NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `email` varchar(200) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Asnika Sridhar','$2a$12$nQl5x2G/u3Tf32SPz3B9I.Vf/21Z3GwBOzMghErOKZOwO0.dGZNPC','owner',1,'asnikasridhar1@gmail.com',NULL,NULL,NULL,NULL),(3,'Pavan','pavan','owner',1,'pavan@bhushan.com',NULL,NULL,NULL,NULL),(4,'Ishaan','chiinipaapu','owner',1,'ishaan@baabi.com',NULL,NULL,NULL,NULL),(5,'pavan1','$2b$10$nxfr9MCtspOnq3dAoCyfS./IP5A6M0CuDb3kDLvt9R6Onpl.HFJMu','owner',1,'alexmahone@gmail.com','2024-09-11 17:17:25',NULL,NULL,NULL),(6,'UserTest123','$2b$10$eENSBPNgbOEe43gNwkhLYuVIOLplmKox3ZqrDXhmgqNxYKzDHFpI.','owner',1,'user@email.com','2025-09-29 23:28:25','sys',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor`
--

DROP TABLE IF EXISTS `vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor` (
  `vendor_id` int NOT NULL AUTO_INCREMENT,
  `vendorname` varchar(150) NOT NULL,
  `description` text,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`vendor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor`
--

LOCK TABLES `vendor` WRITE;
/*!40000 ALTER TABLE `vendor` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wage`
--

DROP TABLE IF EXISTS `wage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wage` (
  `wage_id` int NOT NULL AUTO_INCREMENT,
  `wage_fixed` decimal(10,2) NOT NULL,
  `wage_variable` decimal(10,2) DEFAULT '0.00',
  `wage_fix_code` varchar(50) NOT NULL,
  `wage_ot_perhr_price` decimal(10,2) DEFAULT '0.00',
  `labor_id` int NOT NULL,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`wage_id`),
  UNIQUE KEY `wage_fix_code` (`wage_fix_code`),
  KEY `fk_wage_labor` (`labor_id`),
  CONSTRAINT `fk_wage_labor` FOREIGN KEY (`labor_id`) REFERENCES `labors` (`labor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wage`
--

LOCK TABLES `wage` WRITE;
/*!40000 ALTER TABLE `wage` DISABLE KEYS */;
/*!40000 ALTER TABLE `wage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wage_settlement`
--

DROP TABLE IF EXISTS `wage_settlement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wage_settlement` (
  `running_wage_id` int NOT NULL AUTO_INCREMENT,
  `wage_id` int NOT NULL,
  `settled_amount` decimal(10,2) DEFAULT '0.00',
  `advance_amount` decimal(10,2) DEFAULT '0.00',
  `running_wage_transaction_date` date NOT NULL,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`running_wage_id`),
  KEY `fk_wagesettlement_wage` (`wage_id`),
  CONSTRAINT `fk_wagesettlement_wage` FOREIGN KEY (`wage_id`) REFERENCES `wage` (`wage_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wage_settlement`
--

LOCK TABLES `wage_settlement` WRITE;
/*!40000 ALTER TABLE `wage_settlement` DISABLE KEYS */;
/*!40000 ALTER TABLE `wage_settlement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wagepicking`
--

DROP TABLE IF EXISTS `wagepicking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wagepicking` (
  `wagepicking_id` int NOT NULL AUTO_INCREMENT,
  `wage_id` int NOT NULL,
  `yield_id` int NOT NULL,
  `picking_price` decimal(10,2) NOT NULL,
  `picking_fix_code` varchar(50) NOT NULL,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`wagepicking_id`),
  UNIQUE KEY `picking_fix_code` (`picking_fix_code`),
  KEY `fk_wagepicking_wage` (`wage_id`),
  CONSTRAINT `fk_wagepicking_wage` FOREIGN KEY (`wage_id`) REFERENCES `wage` (`wage_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wagepicking`
--

LOCK TABLES `wagepicking` WRITE;
/*!40000 ALTER TABLE `wagepicking` DISABLE KEYS */;
/*!40000 ALTER TABLE `wagepicking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yield_settlement`
--

DROP TABLE IF EXISTS `yield_settlement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yield_settlement` (
  `yield_settlement_id` int NOT NULL AUTO_INCREMENT,
  `yieldrate_id` int DEFAULT NULL,
  `yield_quantity` decimal(10,2) NOT NULL,
  `yield_settlement_date` datetime DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`yield_settlement_id`),
  KEY `fk_yieldsettlement_yieldrate` (`yieldrate_id`),
  CONSTRAINT `fk_yieldsettlement_yieldrate` FOREIGN KEY (`yieldrate_id`) REFERENCES `yieldrate` (`yieldrate_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yield_settlement`
--

LOCK TABLES `yield_settlement` WRITE;
/*!40000 ALTER TABLE `yield_settlement` DISABLE KEYS */;
INSERT INTO `yield_settlement` VALUES (1,1,100.00,'2025-10-11 00:00:00','2025-10-11 00:00:00','sys','2025-10-11 17:04:04',NULL);
/*!40000 ALTER TABLE `yield_settlement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yieldrate`
--

DROP TABLE IF EXISTS `yieldrate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yieldrate` (
  `yieldrate_id` int NOT NULL AUTO_INCREMENT,
  `plant_id` int NOT NULL,
  `yieldtype_id` int NOT NULL,
  `yieldrate_code` varchar(50) NOT NULL,
  `yieldrate_running_rate` decimal(10,2) NOT NULL,
  `baseunit_id` int NOT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`yieldrate_id`),
  KEY `fk_yieldrate_plant` (`plant_id`),
  KEY `fk_yieldrate_yieldtype` (`yieldtype_id`),
  KEY `fk_yieldrate_baseunit` (`baseunit_id`),
  CONSTRAINT `fk_yieldrate_baseunit` FOREIGN KEY (`baseunit_id`) REFERENCES `baseunit` (`baseunit_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_yieldrate_plant` FOREIGN KEY (`plant_id`) REFERENCES `plantdetails` (`plant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_yieldrate_yieldtype` FOREIGN KEY (`yieldtype_id`) REFERENCES `yieldtype` (`yieldtype_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yieldrate`
--

LOCK TABLES `yieldrate` WRITE;
/*!40000 ALTER TABLE `yieldrate` DISABLE KEYS */;
INSERT INTO `yieldrate` VALUES (1,1,1,'ARA_CO_TODAYDATE',2300.00,1,'2025-10-11 00:00:00','sys','2025-10-11 08:40:45',NULL);
/*!40000 ALTER TABLE `yieldrate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yieldtype`
--

DROP TABLE IF EXISTS `yieldtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yieldtype` (
  `yieldtype_id` int NOT NULL AUTO_INCREMENT,
  `yieldtype_name` varchar(100) NOT NULL,
  `plant_id` int NOT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`yieldtype_id`),
  UNIQUE KEY `yieldtype_name` (`yieldtype_name`),
  KEY `fk_yieldtype_plant` (`plant_id`),
  CONSTRAINT `fk_yieldtype_plant` FOREIGN KEY (`plant_id`) REFERENCES `plantdetails` (`plant_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yieldtype`
--

LOCK TABLES `yieldtype` WRITE;
/*!40000 ALTER TABLE `yieldtype` DISABLE KEYS */;
INSERT INTO `yieldtype` VALUES (1,'fruit',1,'2025-10-11 00:00:00','sys',NULL,NULL),(2,'parchment',1,'2025-10-11 00:00:00','sys',NULL,NULL);
/*!40000 ALTER TABLE `yieldtype` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-11 19:47:59
