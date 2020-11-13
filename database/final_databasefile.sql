CREATE DATABASE  IF NOT EXISTS `newsapi` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `newsapi`;
-- MySQL dump 10.13  Distrib 5.5.16, for Win32 (x86)
--
-- Host: localhost    Database: newsapi
-- ------------------------------------------------------
-- Server version	5.1.45-community

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ROLE_USER'),(2,'ROLE_ADMIN'),(3,'ROLE_DEVELOPER');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-05 17:21:53
CREATE DATABASE  IF NOT EXISTS `newsapi` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `newsapi`;
-- MySQL dump 10.13  Distrib 5.5.16, for Win32 (x86)
--
-- Host: localhost    Database: newsapi
-- ------------------------------------------------------
-- Server version	5.1.45-community

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `search`
--

DROP TABLE IF EXISTS `search`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `search` (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `creation_date` datetime DEFAULT NULL,
  `keyword` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sid`),
  KEY `FKfw6q3tcl81bfafbq7qos24ib8` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `search`
--

LOCK TABLES `search` WRITE;
/*!40000 ALTER TABLE `search` DISABLE KEYS */;
INSERT INTO `search` VALUES (1,'2019-03-03 00:45:34','bts',10,NULL),(2,'2019-03-03 00:45:45','mockito',10,NULL),(3,'2019-03-03 00:45:54','blackpink',10,NULL),(4,'2019-03-03 00:46:11','mockito',10,NULL),(5,'2019-03-03 00:47:08','bts',28,NULL),(18,'2019-03-05 16:24:22','jimin',19,NULL);
/*!40000 ALTER TABLE `search` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-05 17:21:50
CREATE DATABASE  IF NOT EXISTS `newsapi` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `newsapi`;
-- MySQL dump 10.13  Distrib 5.5.16, for Win32 (x86)
--
-- Host: localhost    Database: newsapi
-- ------------------------------------------------------
-- Server version	5.1.45-community

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `roles` int(11) NOT NULL,
  `active_status` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'manoj123@gmail.com','sowjanyaML','$2a$10$U7/DP30BL.2bnYCnpOag8eHDzcdExZg82EjfwFgDMmStRDgh8WyhK',1,''),(4,'sowjanyamanoj123@gmail.com','sowjanyaML','$2a$10$SLCjaOTpaUQkW56bPH6ICOrWJcs1oL4FFM80GPsC4SjLDpawQLAge',1,''),(6,'sowjanya@gmail.com','sowjanya','$2a$10$7fHN0AFFy8BSkFAAeh6je.BJgIqmsmgQ6/LUrDO/aFdtoOC1RE2YK',1,''),(7,'sowjanyaram@gmail.com','Ram','$2a$10$Fj567dQ4JlfMpW2BCcj3ieG8Pc.YANJxUbtek0fuQCMMCJgdtUiie',1,''),(8,'manojram@gmail.com','Manoj','$2a$10$S2NVzaOiwmpTDJHEYeGmDuNQNDwz3mMnRY6dr0YVHl9en9Lyr934C',1,''),(9,'sowji1512@gmail.com','sowjanya','$2a$10$L02StdWrWeukMQQFER39GOMAohpkMsm09jTboGXVz.f7rWwablwCG',2,''),(10,'parvathi@gmail.com','parvathi','$2a$10$bMOrAxnTS24c07/3cv/Ukeie5YPB6XFfXkFI8ADbEwSRvf6yb103a',1,''),(11,'sowjanyam@gmail.com','Sowjanya','$2a$10$6ZBdFCtTe5scpPXDxfB.pu/XqJPt6srkEpWPzuczPZx6rAwSPuvgO',1,''),(12,'sowjanyam1512@gmail.com','Sowjanya','$2a$10$djRLcU4Bsb2iFRZY7gvqVeko66Iifw2lf8pA85g.8vu7Sa3k3suIa',1,''),(13,'ramsowji@gmail.com','ram','$2a$10$8ZPhqljgiO61s6Ju3ajt9.7Z3Alejs3R1joePWVTkTutVyhfcnIIi',2,''),(14,'manoj1231@gmail.com','manoj','$2a$10$hg9.n4QmekySQoQ6rP.pIuvnfjvu1x0sJZrfzFqJBY2w1wXLVNa1m',1,''),(15,'lekhyasree@gmail.com','lekhyaa','$2a$10$adtkvgZYJjoCcA8U4mv/1O5skDuZUzhye7mPbYYDNJBvPR5MKqRVK',1,''),(16,'manoj1231hg@gmail.com','manoj','$2a$10$49cYXyYwxQTaAH/C4uLn3./gPlxU91LeKGiHNWKvjSILW88gqa8ma',1,''),(17,'nikitha@gmail.com','nikitha','$2a$10$mFLmhThgK4YZsUa53bSrIeGAQ9gZxiCUDYFdSLwBjWS/aEX8rl.su',1,''),(18,'sowjanya1512@gmail.com','nikitha','$2a$10$sLf.BUZgSBYQXGRsFZmnvuNTEcEshnGu.LGW0H/rHr0XsCAio89U.',1,''),(19,'sowjanyamaguluri@gmail.com','sowjanya','$2a$10$DwEDmpkjVI2iPhHSGEZVy.VzxOnEGjg164k/7KiRlskTjUZQ48EXS',1,''),(20,'sowjanyamaguluri1@gmail.com','sowjanya1','$2a$10$U/OZOwfXXRt0FONfyOumFuItcmKdTudCUJmOgM0xEjIIWyQTtzjsW',1,''),(21,'sowjanyamaguluri1@gmai2.com','sowjanya1','$2a$10$F.yvQSHU/RSGIEXkk0iouOMLFnziaHUpkjKR059hsURGsOQGGBY3G',1,''),(22,'sowjanyamaguluri@gmai2.com','sowjanya','$2a$10$Zzd55LYpvsv3qTT4vgtQsO2ynDMjw3BrUwIgwJ0CiLvJiaWdfjk/2',1,''),(23,'sowjanyamaguluri2@gmail.com','sowjanya1','$2a$10$xqFKaNqDhIYmoeFvs10hnuxabQnDPl6Nd9hlGdw32/edAqtdvlfYS',1,''),(24,'sowjanyamaguluri3@gmail.com','sowjanya1','$2a$10$CjRem3t9c6VasoxPpH0I5OP/SjiQjMhcKBjqwx1hHKyOy.oGD9PBm',1,''),(25,'sowjanyamaguluri23@gmail.com','sowjanya','$2a$10$Eg/fnN1dUGIysvu.IdH06OAFwQW6MFHdgBR9uDjMXHlwnfmzWcsnO',1,''),(26,'sowjanyamaguluri4@gmail.com','sowjanya1','$2a$10$QndBEjz1gT6EJhcV0066FeWZLOgp/k.lGGG5UaEC6M/CuJ8T/cmXO',1,''),(27,'sowjanyamaguluri5@gmail.com','sowjanya1','$2a$10$2RFzT8a74x2F1h4JlpSXv.r0wci71Pgrf91vjXzJxxq/vakJZLW6S',1,''),(28,'sowjanya123789@gmail.com','Sowjanya','$2a$10$xlYL3Y4Np/AgU/JoJLbT5uWNt3XZF8fjRuf9W/xWO0o6JYVoSmMAu',1,''),(29,'sowjanyavandu@gmail.com','sowjanya3','$2a$10$MZ0bkbvXOF8W3VgNMFZNGOXgWzl8fKxicd4wohWPS32/snAM8nVvu',1,''),(30,'sowjanyamaguluri6@gmail.com','sowjanya1','$2a$10$frFHBBPPI63VUYEOpnwyMuHYYj1NzcAYZCkrKIzrxsKMxnluj6MeS',1,''),(31,'sowjanyamaguluri8@gmail.com','sowjanya','$2a$10$zbtLoa.MwUhK/xfQr9W4guBYGfjODmQ2hEdC3annLp2M8cft8pMw2',1,''),(32,'sowjanyamaguluri9@gmail.com','sowjanya1','$2a$10$5GJnriIR/bkHnpzZGDQkd./z/D9qvenEbW4EWLABufo25qJg/qxLK',1,''),(33,'sowjanyamaguluri10@gmail.com','sowjanya1','$2a$10$9en3rQh723eEDR5XgeNjzefGAqlWVrKYecG2RBdRZn9SRTxB1zjxa',1,''),(34,'sowjanyamaguluri11@gmail.com','sowjanya1','$2a$10$CSkvlBaebddQ2YHyGie8tO5MMzGNu1o4iyhYbH2OgqKxgYTAgSnqy',1,'\0'),(35,'sowjanyamaguluri12@gmail.com','sowjanya1','$2a$10$cerj2.mViT94Gr0YKlPFTe1mRG2gZ5UQOBDIBgeYQv2ebEhAvYA3W',1,'\0'),(36,'sowjnayaram@684.com','sowjanya1','$2a$10$OsdrgoUUuLTOOj/pVQ8dO.95trYTlYz06GZsHRHpbemtGxozf9TVu',1,''),(37,'eydeh@ghjrkf.fyh','sowjnaya7','$2a$10$UibudU7xvK60DbgWwgNlCuPWQcJlhxLDcuRBt2Ye8rLBhk4FnwiBy',1,'\0'),(38,'sowjnayaram@772.com','sowjanya1','$2a$10$4NF0Y6HIaUGlsFwj4GONR.uw41j6fJlKXGA71Ed.UU2x/FeC7KrSi',1,''),(46,'sowjnayaram@510.com','sowjanya1','$2a$10$aguIHxdAPqb.Wa0kpf5D5Oc8njyJeGdEM78tsJROEFqcbGVgzINX.',1,''),(47,'sowjnayaram@606.com','sowjanya1','$2a$10$RYkIYq8T/.BmvutM1WKwyOgg83i07LJoD/VRPUDgGzQEvI4ncvl2C',1,'');
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

-- Dump completed on 2019-03-05 17:21:51


