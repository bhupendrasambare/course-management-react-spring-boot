-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: courseapi
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL,
  `description` longtext,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (2,'none of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the program','Web Developement','112255447788.jpeg'),(3,'none of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the program','UI/UX','889955662233.jpeg'),(4,'none of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the program','LOGO Design','1122336655.jpeg'),(5,'none of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the program','Android Developement','778855449966.jpeg'),(6,'none of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the programnone of the discription is added in order to check the data of the program','Blockchain','89561278.jpeg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapters` (
  `id` bigint NOT NULL,
  `description` longtext,
  `name` varchar(255) DEFAULT NULL,
  `courses_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdybyoi2xtfi0mt30y19frmwoy` (`courses_id`),
  CONSTRAINT `FKdybyoi2xtfi0mt30y19frmwoy` FOREIGN KEY (`courses_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
INSERT INTO `chapters` VALUES (24,'<p><strong>Welcome to the first chapter of the HTML Page.</strong></p><p>Let\'s start the journey.</p><p>this is added</p>','HTML Home',18),(25,'<p>Welcome to the second Chapter.</p>','Second Chapter',18);
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` bigint NOT NULL,
  `date` datetime DEFAULT NULL,
  `description` longtext,
  `hour` varchar(20) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `minutes` varchar(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` varchar(20) DEFAULT NULL,
  `categories_id` bigint DEFAULT NULL,
  `mentor_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkxb4xq8ua07vlfakavfba98ji` (`categories_id`),
  KEY `FKixvcffkj3a3qbdscotecbpk67` (`mentor_id`),
  CONSTRAINT `FKixvcffkj3a3qbdscotecbpk67` FOREIGN KEY (`mentor_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKkxb4xq8ua07vlfakavfba98ji` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (18,'2022-09-25 19:03:00','<p>This is short description will be changed soon to check the insertion of data in the. This is the HTML Course for basic development of the web development journey.</p>','2','4455152download.png','15','Html Page','20.0',2,1),(19,'2022-09-02 03:04:27','This is the description of the basic CSS course for web developers. This short description will be changed soon to check the insertion of data in the. This is the HTML Course for basic development of the web development journey.','4','9714083download.jpg','30','Basic CSS','60.0',2,1),(20,'2022-09-02 03:09:13','This is the description of the basic CSS course for web developers. This short description will be changed soon to check the insertion of data in the. This is the HTML Course for basic development of the web development journey.','4','6794304download.jpg','30','HTML','60.0',2,1),(22,'2022-09-02 03:11:18','','0','9542969download (1).png','0','html h','0.0',2,1),(23,'2022-09-20 00:47:16','<p><strong>Course Description about the HTML And CSS Course to be entered for the temporary check.</strong></p><p>this is the desc</p>','4','7775399download (1).png','10','HTML & CSS','10.0',3,1);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (28),(1);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interest`
--

DROP TABLE IF EXISTS `interest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interest` (
  `id` bigint NOT NULL,
  `interest_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKiadstwgxibblufbo1m69wmadm` (`interest_id`),
  KEY `FKajeyee305qpdg3sq225xdg2qe` (`user_id`),
  CONSTRAINT `FKajeyee305qpdg3sq225xdg2qe` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKiadstwgxibblufbo1m69wmadm` FOREIGN KEY (`interest_id`) REFERENCES `interest` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interest`
--

LOCK TABLES `interest` WRITE;
/*!40000 ALTER TABLE `interest` DISABLE KEYS */;
/*!40000 ALTER TABLE `interest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interests`
--

DROP TABLE IF EXISTS `interests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interests` (
  `id` bigint NOT NULL,
  `categories_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8td0j23rnhwce7w8252ykxn7r` (`categories_id`),
  KEY `FKq9kr60l7n7h3yf82s44rkoe4g` (`user_id`),
  CONSTRAINT `FK8td0j23rnhwce7w8252ykxn7r` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `FKq9kr60l7n7h3yf82s44rkoe4g` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interests`
--

LOCK TABLES `interests` WRITE;
/*!40000 ALTER TABLE `interests` DISABLE KEYS */;
/*!40000 ALTER TABLE `interests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medias`
--

DROP TABLE IF EXISTS `medias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medias` (
  `id` bigint NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `pdf` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `topic_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgbkw5e8tndlaqddm6iufnv2kl` (`topic_id`),
  CONSTRAINT `FKgbkw5e8tndlaqddm6iufnv2kl` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medias`
--

LOCK TABLES `medias` WRITE;
/*!40000 ALTER TABLE `medias` DISABLE KEYS */;
/*!40000 ALTER TABLE `medias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `id` bigint NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `value` float DEFAULT NULL,
  `categories_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK43r74uj2y4mdioq73emtyeps2` (`categories_id`),
  KEY `FKf68lgbsbxl310n0jifwpfqgfh` (`user_id`),
  CONSTRAINT `FK43r74uj2y4mdioq73emtyeps2` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `FKf68lgbsbxl310n0jifwpfqgfh` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'USER'),(2,'MENTOR'),(3,'ADMIN');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topics` (
  `id` bigint NOT NULL,
  `description` longtext,
  `name` varchar(255) DEFAULT NULL,
  `chapter_id` bigint DEFAULT NULL,
  `position` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqygknu3ty9j5mxyr6y6tom8o9` (`chapter_id`),
  CONSTRAINT `FKqygknu3ty9j5mxyr6y6tom8o9` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
INSERT INTO `topics` VALUES (26,'<h2>What is HTML?&nbsp;</h2><p><br></p><ul style=\"box-sizing: inherit; color: rgb(0, 0, 0); font-family: Verdana, sans-serif; font-size: 15px;\"><li style=\"box-sizing: inherit;\">HTML stands for Hyper Text Markup Language</li><li style=\"box-sizing: inherit;\">HTML elements label pieces of content such as \"this is a heading\", \"this is a paragraph\", \"this is a link\", etc.</li><li style=\"box-sizing: inherit;\">HTML elements tell the browser how to display the content<ul></ul></li><li style=\"box-sizing: inherit;\">HTML consists of a series of elements<ul></ul></li><li style=\"box-sizing: inherit;\">HTML describes the structure of a Web page<ul></ul></li><li style=\"box-sizing: inherit;\">HTML is the standard markup language for creating Web pages<ul></ul></li></ul>','HTML Home',24,1),(27,'<p style=\"box-sizing: inherit; font-size: 32px; font-family: &quot;Segoe UI&quot;, Arial, sans-serif; margin-top: 10px; margin-bottom: 10px; color: rgb(0, 0, 0);\">Learn HTML Using Notepad or TextEdit</p><p style=\"box-sizing: inherit; margin-top: 1.2em; margin-bottom: 1.2em; font-size: 15px; color: rgb(0, 0, 0); font-family: Verdana, sans-serif;\">Web pages can be created and modified by using professional HTML editors.</p><p style=\"box-sizing: inherit; margin-top: 1.2em; margin-bottom: 1.2em; font-size: 15px; color: rgb(0, 0, 0); font-family: Verdana, sans-serif;\">However, for learning HTML we recommend a simple text editor like Notepad (PC) or TextEdit (Mac).</p><p style=\"box-sizing: inherit; margin-top: 1.2em; margin-bottom: 1.2em; font-size: 15px; color: rgb(0, 0, 0); font-family: Verdana, sans-serif;\">We believe that using a simple text editor is a good way to learn HTML.</p><p style=\"box-sizing: inherit; margin-top: 1.2em; margin-bottom: 1.2em; font-size: 15px; color: rgb(0, 0, 0); font-family: Verdana, sans-serif;\">Follow the steps below to create your first web page with Notepad or TextEdit.</p><h2 style=\"box-sizing: inherit; font-size: 32px; font-family: &quot;Segoe UI&quot;, Arial, sans-serif; margin-top: 10px; margin-bottom: 10px; color: rgb(0, 0, 0);\">Step 1: Open Notepad (PC)</h2><p style=\"box-sizing: inherit; margin-top: 1.2em; margin-bottom: 1.2em; font-size: 15px; color: rgb(0, 0, 0); font-family: Verdana, sans-serif;\"><span style=\"box-sizing: inherit; font-weight: bolder;\">Windows 8 or later:</span></p><p style=\"box-sizing: inherit; margin-top: 1.2em; margin-bottom: 1.2em; font-size: 15px; color: rgb(0, 0, 0); font-family: Verdana, sans-serif;\">Open the&nbsp;<span style=\"box-sizing: inherit; font-weight: bolder;\">Start Screen</span>&nbsp;(the window symbol at the bottom left on your screen). Type&nbsp;<span style=\"box-sizing: inherit; font-weight: bolder;\">Notepad</span>.</p><p style=\"box-sizing: inherit; margin-top: 1.2em; margin-bottom: 1.2em; font-size: 15px; color: rgb(0, 0, 0); font-family: Verdana, sans-serif;\"><span style=\"box-sizing: inherit; font-weight: bolder;\">Windows 7 or earlier:</span></p><p style=\"box-sizing: inherit; margin-top: 1.2em; margin-bottom: 1.2em; font-size: 15px; color: rgb(0, 0, 0); font-family: Verdana, sans-serif;\">Open&nbsp;<span style=\"box-sizing: inherit; font-weight: bolder;\">Start</span>&nbsp;&gt;<span style=\"box-sizing: inherit; font-weight: bolder;\">&nbsp;Programs &gt;</span>&nbsp;<span style=\"box-sizing: inherit; font-weight: bolder;\">Accessories &gt;</span>&nbsp;<span style=\"box-sizing: inherit; font-weight: bolder;\">Notepad</span></p><div><span style=\"box-sizing: inherit;\"><h2 style=\"font-weight: bolder; box-sizing: inherit; font-size: 32px; font-family: &quot;Segoe UI&quot;, Arial, sans-serif; margin-top: 10px; margin-bottom: 10px; color: rgb(0, 0, 0);\">Step 2: Write Some HTML</h2><p style=\"font-weight: 400; box-sizing: inherit; margin-top: 1.2em; margin-bottom: 1.2em; font-size: 15px; color: rgb(0, 0, 0); font-family: Verdana, sans-serif;\">Write or copy the following HTML code into Notepad:</p><div class=\"w3-example\" style=\"font-weight: 400; box-sizing: inherit; background-color: rgb(231, 233, 235); border-radius: 5px; padding: 8px 20px; margin: 24px -20px; color: rgb(0, 0, 0); font-family: Verdana, sans-serif; font-size: 15px; box-shadow: none !important;\"><span class=\"tagnamecolor\" style=\"box-sizing: inherit; color: brown; font-family: Consolas, Menlo, &quot;courier new&quot;, monospace;\"><span class=\"tagcolor\" style=\"box-sizing: inherit; color: mediumblue;\">&lt;</span>!DOCTYPE<span class=\"attributecolor\" style=\"box-sizing: inherit; color: red;\">&nbsp;html</span><span class=\"tagcolor\" style=\"box-sizing: inherit; color: mediumblue;\">&gt;</span></span><br style=\"box-sizing: inherit; font-family: Consolas, Menlo, &quot;courier new&quot;, monospace;\"><span class=\"tagnamecolor\" style=\"box-sizing: inherit; color: brown; font-family: Consolas, Menlo, &quot;courier new&quot;, monospace;\"><span class=\"tagcolor\" style=\"box-sizing: inherit; color: mediumblue;\">&lt;</span>html<span class=\"tagcolor\" style=\"box-sizing: inherit; color: mediumblue;\">&gt;</span></span><br style=\"box-sizing: inherit; font-family: Consolas, Menlo, &quot;courier new&quot;, monospace;\"><span class=\"tagnamecolor\" style=\"box-sizing: inherit; color: brown; font-family: Consolas, Menlo, &quot;courier new&quot;, monospace;\"><span class=\"tagcolor\" style=\"box-sizing: inherit; color: mediumblue;\">&lt;</span>body<span class=\"tagcolor\" style=\"box-sizing: inherit; color: mediumblue;\">&gt;</span></span><br style=\"box-sizing: inherit; font-family: Consolas, Menlo, &quot;courier new&quot;, monospace;\"><br style=\"box-sizing: inherit; font-family: Consolas, Menlo, &quot;courier new&quot;, monospace;\"><span class=\"tagnamecolor\" style=\"box-sizing: inherit; color: brown; font-family: Consolas, Menlo, &quot;courier new&quot;, monospace;\"><span class=\"tagcolor\" style=\"box-sizing: inherit; color: mediumblue;\">&lt;</span>h1<span class=\"tagcolor\" style=\"box-sizing: inherit; color: mediumblue;\">&gt;</span></span><span style=\"font-family: Consolas, Menlo, &quot;courier new&quot;, monospace; background-color: rgb(255, 255, 255);\">My First Heading</span><span class=\"tagnamecolor\" style=\"box-sizing: inherit; color: brown; font-family: Consolas, Menlo, &quot;courier new&quot;, monospace;\"><span class=\"tagcolor\" style=\"box-sizing: inherit; color: mediumblue;\">&lt;</span>/h1<span class=\"tagcolor\" style=\"box-sizing: inherit; color: mediumblue;\">&gt;</span></span><br style=\"box-sizing: inherit; font-family: Consolas, Menlo, &quot;courier new&quot;, monospace;\"><br style=\"box-sizing: inherit; font-family: Consolas, Menlo, &quot;courier new&quot;, monospace;\"><span class=\"tagnamecolor\" style=\"box-sizing: inherit; color: brown; font-family: Consolas, Menlo, &quot;courier new&quot;, monospace;\"><span class=\"tagcolor\" style=\"box-sizing: inherit; color: mediumblue;\">&lt;</span>p<span class=\"tagcolor\" style=\"box-sizing: inherit; color: mediumblue;\">&gt;</span></span><span style=\"font-family: Consolas, Menlo, &quot;courier new&quot;, monospace; background-color: rgb(255, 255, 255);\">My first paragraph.</span><span class=\"tagnamecolor\" style=\"box-sizing: inherit; color: brown; font-family: Consolas, Menlo, &quot;courier new&quot;, monospace;\"><span class=\"tagcolor\" style=\"box-sizing: inherit; color: mediumblue;\">&lt;</span>/p<span class=\"tagcolor\" style=\"box-sizing: inherit; color: mediumblue;\">&gt;</span></span><br style=\"box-sizing: inherit; font-family: Consolas, Menlo, &quot;courier new&quot;, monospace;\"><br style=\"box-sizing: inherit; font-family: Consolas, Menlo, &quot;courier new&quot;, monospace;\"><span class=\"tagnamecolor\" style=\"box-sizing: inherit; color: brown; font-family: Consolas, Menlo, &quot;courier new&quot;, monospace;\"><span class=\"tagcolor\" style=\"box-sizing: inherit; color: mediumblue;\">&lt;</span>/body<span class=\"tagcolor\" style=\"box-sizing: inherit; color: mediumblue;\">&gt;</span></span><br style=\"box-sizing: inherit; font-family: Consolas, Menlo, &quot;courier new&quot;, monospace;\"><span class=\"tagnamecolor\" style=\"box-sizing: inherit; color: brown; font-family: Consolas, Menlo, &quot;courier new&quot;, monospace;\"><span class=\"tagcolor\" style=\"box-sizing: inherit; color: mediumblue;\">&lt;</span>/html<span class=\"tagcolor\" style=\"box-sizing: inherit; color: mediumblue;\">&gt;</span></span></div><div class=\"w3-example\" style=\"box-sizing: inherit; border-radius: 5px; padding: 8px 20px; margin: 24px -20px; box-shadow: none !important;\">﻿<span style=\"color: rgb(0, 0, 0); font-family: &quot;Segoe UI&quot;, Arial, sans-serif; font-size: 32px;\">Step 3: Save the HTML Page</span></div></span><p style=\"box-sizing: inherit; margin-top: 1.2em; margin-bottom: 1.2em; font-size: 15px; color: rgb(0, 0, 0); font-family: Verdana, sans-serif;\">Save the file on your computer. Select&nbsp;<span style=\"box-sizing: inherit; font-weight: bolder;\">File &gt; Save as</span>&nbsp;in the Notepad menu.</p><p style=\"box-sizing: inherit; margin-top: 1.2em; margin-bottom: 1.2em; font-size: 15px; color: rgb(0, 0, 0); font-family: Verdana, sans-serif;\">Name the file&nbsp;<span style=\"box-sizing: inherit; font-weight: bolder;\">\"index.htm\"</span>&nbsp;and set the encoding to&nbsp;<span style=\"box-sizing: inherit; font-weight: bolder;\">UTF-8</span>&nbsp;(which is the preferred encoding for HTML files).</p><h2 style=\"box-sizing: inherit; font-size: 32px; font-family: &quot;Segoe UI&quot;, Arial, sans-serif; margin-top: 10px; margin-bottom: 10px; color: rgb(0, 0, 0);\">Step 4: View the HTML Page in Your Browser</h2><p style=\"box-sizing: inherit; margin-top: 1.2em; margin-bottom: 1.2em; font-size: 15px; color: rgb(0, 0, 0); font-family: Verdana, sans-serif;\">Open the saved HTML file in your favorite browser (double click on the file, or right-click - and choose \"Open with\").</p><p style=\"box-sizing: inherit; margin-top: 1.2em; margin-bottom: 1.2em; font-size: 15px; color: rgb(0, 0, 0); font-family: Verdana, sans-serif;\"><br></p><p style=\"box-sizing: inherit; margin-top: 1.2em; margin-bottom: 1.2em; font-size: 15px; color: rgb(0, 0, 0); font-family: Verdana, sans-serif;\"><img src=\"https://www.w3schools.com/html/img_chrome.png\" style=\"width: 635px;\"><br></p></div>','First HTML page',24,2);
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` bigint NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`),
  CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,1),(7,1),(8,1),(9,1),(10,1),(1,2),(7,2),(8,2),(10,2),(11,2),(1,3),(7,3),(8,3),(9,3),(11,3);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(120) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `last` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'bhupendrasam1404@gmail.com','$2a$10$LDvYVVTEIONoVAzt0Pn29.IQP/YyM67jrw5MTFn3RND82r7ylURym','bhupendra1404',NULL,'Sambare','Bhupendra'),(7,'adminuser@gmail.com','$2a$10$.fjeQSioMiajc1GFDyY5rOBrKmN2JXesZfxT0P0DuumvmV8H.SZpa','adminuser',NULL,'user','admin'),(8,'testuser@gmail.com','$2a$10$2SPr8TD59SHO1lJSI9RwiuTyuHbPdQLGJzCwrMX0HrOsXsXmHM3Iy','tester',NULL,'test','test'),(9,'nomentor@gmail.com','$2a$10$Db6Ca2L2runsmY2juybkD.CPWn2Lm/qQ.NCNZ2RPBfB.KRsuGsfYO','nomentor',NULL,'test','nomentor'),(10,'noadmin@gmail.com','$2a$10$NknuyQnUVCYBVK79CCCl7uUYO8Ro59Ku8YSNioFrSdXITFmdVx8ni','noadmin',NULL,'test','noadmin'),(11,'nouser@gmail.com','$2a$10$MSmVB0C2xW0XFo4WrLA9C.jLbltb.pTyVhbF9sy3Wfgd9fx.Tcz.C','nouser',NULL,'test','nouser');
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

-- Dump completed on 2022-10-02  3:26:56
