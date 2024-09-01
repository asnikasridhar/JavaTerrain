CREATE DATABASE  IF NOT EXISTS `coffee_estate` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `coffee_estate`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: coffee_estate
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `acres`
--

DROP TABLE IF EXISTS `acres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acres` (
  `acre_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `acre_size` float NOT NULL,
  `plant_type` enum('robusta','arabica') NOT NULL,
  `terrain` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `water_availability` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`acre_id`),
  KEY `idx_user_id` (`user_id`),
  CONSTRAINT `acres_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acres`
--

LOCK TABLES `acres` WRITE;
/*!40000 ALTER TABLE `acres` DISABLE KEYS */;
INSERT INTO `acres` VALUES (6,NULL,42,'robusta','Upper','Chikmagalur',1);
/*!40000 ALTER TABLE `acres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cropdetails`
--

DROP TABLE IF EXISTS `cropdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cropdetails` (
  `crop_id` int NOT NULL AUTO_INCREMENT,
  `acre_id` int DEFAULT NULL,
  `yield_obtained` float DEFAULT NULL,
  `selling_price` float DEFAULT NULL,
  PRIMARY KEY (`crop_id`),
  KEY `idx_acre_id` (`acre_id`),
  CONSTRAINT `cropdetails_ibfk_1` FOREIGN KEY (`acre_id`) REFERENCES `acres` (`acre_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cropdetails`
--

LOCK TABLES `cropdetails` WRITE;
/*!40000 ALTER TABLE `cropdetails` DISABLE KEYS */;
INSERT INTO `cropdetails` VALUES (1,6,20000,11000);
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
  `acre_id` int DEFAULT NULL,
  `water` float DEFAULT NULL,
  `fertilizer` float DEFAULT NULL,
  `pruning` float DEFAULT NULL,
  `others` float DEFAULT NULL,
  `edate` datetime DEFAULT NULL,
  PRIMARY KEY (`expenditure_id`),
  KEY `idx_acre_id` (`acre_id`),
  CONSTRAINT `expenditure_ibfk_1` FOREIGN KEY (`acre_id`) REFERENCES `acres` (`acre_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenditure`
--

LOCK TABLES `expenditure` WRITE;
/*!40000 ALTER TABLE `expenditure` DISABLE KEYS */;
INSERT INTO `expenditure` VALUES (1,6,2000,23030,3332220,313131,'2024-08-31 00:00:00'),(3,6,99,7,77,99,NULL),(4,6,99,9,98,88,NULL),(5,6,991,9,98,88,NULL),(6,6,88,99,77,99,'2024-08-30 23:29:00');
/*!40000 ALTER TABLE `expenditure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fertilizers`
--

DROP TABLE IF EXISTS `fertilizers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fertilizers` (
  `fertilizer_id` int NOT NULL AUTO_INCREMENT,
  `acre_id` int DEFAULT NULL,
  `fertilizer_name` varchar(255) DEFAULT NULL,
  `date_of_application` date DEFAULT NULL,
  PRIMARY KEY (`fertilizer_id`),
  KEY `idx_acre_id` (`acre_id`),
  CONSTRAINT `fertilizers_ibfk_1` FOREIGN KEY (`acre_id`) REFERENCES `acres` (`acre_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fertilizers`
--

LOCK TABLES `fertilizers` WRITE;
/*!40000 ALTER TABLE `fertilizers` DISABLE KEYS */;
INSERT INTO `fertilizers` VALUES (1,6,'NPK 20-10-70','2024-08-30');
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
  PRIMARY KEY (`labor_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `labors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labors`
--

LOCK TABLES `labors` WRITE;
/*!40000 ALTER TABLE `labors` DISABLE KEYS */;
INSERT INTO `labors` VALUES (1,1,'Sundara',30,'420420- 420420','Jagara International Bank','Health and fix',_binary 'https://en.wikipedia.org/wiki/Sunder_%28actor%29#/media/File:Sunder_Actor.jpg','Jagara','Owner address');
/*!40000 ALTER TABLE `labors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plantdetails`
--

DROP TABLE IF EXISTS `plantdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plantdetails` (
  `plant_id` int NOT NULL AUTO_INCREMENT,
  `acre_id` int DEFAULT NULL,
  `plant_type` enum('robusta','arabica') NOT NULL,
  `details` text,
  PRIMARY KEY (`plant_id`),
  KEY `idx_acre_id` (`acre_id`),
  CONSTRAINT `plantdetails_ibfk_1` FOREIGN KEY (`acre_id`) REFERENCES `acres` (`acre_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plantdetails`
--

LOCK TABLES `plantdetails` WRITE;
/*!40000 ALTER TABLE `plantdetails` DISABLE KEYS */;
INSERT INTO `plantdetails` VALUES (1,6,'robusta','This is good varity1');
/*!40000 ALTER TABLE `plantdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `raindetails`
--

DROP TABLE IF EXISTS `raindetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `raindetails` (
  `rain_id` int NOT NULL AUTO_INCREMENT,
  `acre_id` int DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `rain_amount` float DEFAULT NULL,
  PRIMARY KEY (`rain_id`),
  KEY `idx_acre_id` (`acre_id`),
  CONSTRAINT `raindetails_ibfk_1` FOREIGN KEY (`acre_id`) REFERENCES `acres` (`acre_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raindetails`
--

LOCK TABLES `raindetails` WRITE;
/*!40000 ALTER TABLE `raindetails` DISABLE KEYS */;
INSERT INTO `raindetails` VALUES (1,6,'2024-08-30 03:52:00',31);
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
  `acre_id` int DEFAULT NULL,
  `total_expenditure` float DEFAULT NULL,
  `total_revenue` float DEFAULT NULL,
  `profit_loss` float DEFAULT NULL,
  PRIMARY KEY (`report_id`),
  KEY `idx_acre_id` (`acre_id`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`acre_id`) REFERENCES `acres` (`acre_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,6,222222,888889000,25),(2,6,200000,1000000,800000);
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
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Asnika','asnika','owner',1,'asnikasridhar1@gmail.com'),(3,'Pavan','pavan','owner',1,'pavan@bhushan.com'),(4,'Ishaan','chiinipaapu','owner',1,'ishaan@baabi.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-01 22:50:26
