-- MySQL dump 10.13  Distrib 8.0.11, for macos10.13 (x86_64)
--
-- Host: localhost    Database: gshl
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `gs_food`
--

DROP TABLE IF EXISTS `gs_food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `gs_food` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `categoryId` int(11) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `description` text,
  `imgUrl` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT '0',
  `shopId` int(11) DEFAULT NULL,
  `price` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gs_food`
--

LOCK TABLES `gs_food` WRITE;
/*!40000 ALTER TABLE `gs_food` DISABLE KEYS */;
INSERT INTO `gs_food` VALUES (1,1,'宫保鸡丁','最好吃的菜','1500956143eba179b58b377f6d5a2d2d.png',1,1,120),(2,1,'鱼香肉丝','哈哈哈','1500956143eba179b58b377f6d5a2d2d.png',2,1,50),(3,1,'鸡腿','鸡腿','https://cn.vuejs.org/images/state.png',0,1,12);
/*!40000 ALTER TABLE `gs_food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gs_food_category`
--

DROP TABLE IF EXISTS `gs_food_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `gs_food_category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `shopId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gs_food_category`
--

LOCK TABLES `gs_food_category` WRITE;
/*!40000 ALTER TABLE `gs_food_category` DISABLE KEYS */;
INSERT INTO `gs_food_category` VALUES (1,'测试分组',1),(2,'测试分组2',1),(3,'测试分组3',1),(4,'测试4',1);
/*!40000 ALTER TABLE `gs_food_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gs_order`
--

DROP TABLE IF EXISTS `gs_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `gs_order` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `time` varchar(20) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gs_order`
--

LOCK TABLES `gs_order` WRITE;
/*!40000 ALTER TABLE `gs_order` DISABLE KEYS */;
INSERT INTO `gs_order` VALUES (3,'1527329292153',0,'[{\"name\":\"宫保鸡丁\",\"id\":1,\"quantity\":1}]');
/*!40000 ALTER TABLE `gs_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gs_shop`
--

DROP TABLE IF EXISTS `gs_shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `gs_shop` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `info` text,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gs_shop`
--

LOCK TABLES `gs_shop` WRITE;
/*!40000 ALTER TABLE `gs_shop` DISABLE KEYS */;
INSERT INTO `gs_shop` VALUES (1,'测试小店','店家简称',1),(2,'测试小店','店家简称',1);
/*!40000 ALTER TABLE `gs_shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gs_test`
--

DROP TABLE IF EXISTS `gs_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `gs_test` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gs_test`
--

LOCK TABLES `gs_test` WRITE;
/*!40000 ALTER TABLE `gs_test` DISABLE KEYS */;
INSERT INTO `gs_test` VALUES (1,'test');
/*!40000 ALTER TABLE `gs_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gs_user`
--

DROP TABLE IF EXISTS `gs_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `gs_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `role` int(1) NOT NULL DEFAULT '0',
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gs_user`
--

LOCK TABLES `gs_user` WRITE;
/*!40000 ALTER TABLE `gs_user` DISABLE KEYS */;
INSERT INTO `gs_user` VALUES (1,0,'xs','b6989d17c2458f02c4f4fa118033ffac');
/*!40000 ALTER TABLE `gs_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-26 18:32:21
