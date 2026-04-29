-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for osx10.10 (x86_64)
--
-- Host: localhost    Database: recruitmen_db
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

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
-- Table structure for table `candidates`
--

DROP TABLE IF EXISTS `candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `candidate_id` varchar(50) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telepon` varchar(20) NOT NULL,
  `portofolio` text DEFAULT NULL,
  `posisi` varchar(50) NOT NULL,
  `job_id` varchar(50) NOT NULL,
  `cv_original_name` varchar(255) DEFAULT NULL,
  `cv_url` text DEFAULT NULL,
  `cv_google_drive_id` varchar(200) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `justifikasi` text DEFAULT NULL,
  `status` enum('pending','processing','processed','accepted','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `recruiter_note` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `candidate_id` (`candidate_id`),
  KEY `idx_candidates_job_id` (`job_id`),
  KEY `idx_candidates_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates`
--

LOCK TABLES `candidates` WRITE;
/*!40000 ALTER TABLE `candidates` DISABLE KEYS */;
INSERT INTO `candidates` VALUES (1,'CND-mnu81u02-L8RONY','Budi Santoso','budi@email.com','081234567890',NULL,'Technology','J-FE-001','test.pdf','/uploads/1775905111585_test.pdf',NULL,NULL,NULL,'pending','2026-04-11 10:58:31','2026-04-11 10:58:31',NULL),(2,'CND-mnu8bvjw-ZO8T5I','Budi Santoso','budi@email.com','081234567890',NULL,'Technology','J-FE-001','test.pdf','/uploads/1775905580156_test.pdf',NULL,NULL,NULL,'pending','2026-04-11 11:06:20','2026-04-11 11:06:20',NULL),(3,'CND-mnu8c6fn-PPLABW','Budi Santoso','budi@email.com','081234567890',NULL,'Technology','J-FE-001','test.pdf','/uploads/1775905594258_test.pdf',NULL,NULL,NULL,'pending','2026-04-11 11:06:34','2026-04-11 11:06:34',NULL),(4,'CND-mnu8esad-RHALZK','Budi Santoso','budi@email.com','081234567890',NULL,'Technology','J-FE-001','test.pdf','/uploads/1775905715893_test.pdf',NULL,NULL,NULL,'pending','2026-04-11 11:08:35','2026-04-11 11:08:35',NULL),(5,'CND-mnu8m5mn-PYINJG','Budi Santoso','budi@email.com','081234567890',NULL,'Technology','J-FE-001','test.pdf','/uploads/1775906059774_test.pdf',NULL,NULL,NULL,'pending','2026-04-11 11:14:19','2026-04-11 11:14:19',NULL),(6,'CND-mnu8n86d-WBGWK8','Budi Santoso','budi@email.com','081234567890',NULL,'Technology','J-FE-001','test.pdf','/uploads/1775906109733_test.pdf',NULL,NULL,NULL,'pending','2026-04-11 11:15:09','2026-04-11 11:15:09',NULL),(7,'CND-mnu8ovsk-R32NLE','Budi Santoso','budi@email.com','081234567890',NULL,'Technology','J-FE-001','test.pdf','/uploads/1775906186994_test.pdf',NULL,NULL,NULL,'pending','2026-04-11 11:16:27','2026-04-11 11:16:27',NULL),(8,'CND-mnu8ua10-R1XK2M','Budi Santoso','budi@email.com','081234567890',NULL,'Technology','J-FE-001','test.pdf','/uploads/1775906438723_test.pdf',NULL,NULL,NULL,'pending','2026-04-11 11:20:38','2026-04-11 11:20:38',NULL),(9,'CND-mnu8v9u8-IPUZKF','Budi Santoso','budi@email.com','081234567890',NULL,'Technology','J-FE-001','test.pdf','/uploads/1775906485136_test.pdf',NULL,NULL,NULL,'pending','2026-04-11 11:21:25','2026-04-11 11:21:25',NULL),(10,'CND-mnu8vb6s-KUB9IM','Budi Santoso','budi@email.com','081234567890',NULL,'Technology','J-FE-001','test.pdf','/uploads/1775906486883_test.pdf',NULL,NULL,NULL,'pending','2026-04-11 11:21:26','2026-04-11 11:21:26',NULL),(11,'CND-mnu8yhku-A6TCNJ','Budi Santoso','budi@email.com','081234567890',NULL,'Technology','J-FE-001','test.pdf','/uploads/1775906635134_test.pdf',NULL,NULL,NULL,'pending','2026-04-11 11:23:55','2026-04-11 11:23:55',NULL),(12,'CND-mnu9zlz9-JVJQ5E','Budi Santoso','budi@email.com','081234567890','https://linkedin.com/in/budi','Technology','J-FE-001','sample.pdf','/uploads/1775908367108_sample.pdf',NULL,NULL,NULL,'pending','2026-04-11 11:52:47','2026-04-11 11:52:47',NULL),(13,'CND-mnuactc8-8P16XM','Budi Santoso','budi@email.com','081234567890','https://linkedin.com/in/budi','Technology','J-FE-001','sample.pdf','/uploads/1775908983176_sample.pdf',NULL,NULL,NULL,'pending','2026-04-11 12:03:03','2026-04-11 12:03:03',NULL),(14,'CND-mnuakmxu-KRXMF5','Budi Santoso','budi@email.com','081234567890','https://linkedin.com/in/budi','Technology','J-FE-001','sample.pdf','/uploads/1775909348130_sample.pdf',NULL,NULL,NULL,'pending','2026-04-11 12:09:08','2026-04-11 12:09:08',NULL),(15,'CND-mnuartf5-EXA6VY','Budi Santoso','budi@email.com','081234567890','https://linkedin.com/in/budi','Technology','J-FE-001','test.pdf','/uploads/1775909683121_test.pdf',NULL,NULL,NULL,'pending','2026-04-11 12:14:43','2026-04-11 12:14:43',NULL),(16,'CND-mnwyn7ys-6ZOE72','Budi Santoso','budi@email.com','081234567890','https://linkedin.com/in/budi','Frontend Developer','J-FE-001','sample.pdf','/uploads/1776070711827_sample.pdf',NULL,NULL,NULL,'pending','2026-04-13 08:58:31','2026-04-13 08:58:31',NULL),(17,'CND-mnwys147-D526XE','Budi Santoso','budi@email.com','081234567890','https://linkedin.com/in/budi','Frontend Developer','J-FE-001','sample.pdf','/uploads/1776070936231_sample.pdf',NULL,NULL,NULL,'pending','2026-04-13 09:02:16','2026-04-13 09:02:16',NULL),(18,'CND-mnwyyct5-KF1ACU','Budi Santoso','budi@email.com','081234567890','https://linkedin.com/in/budi','Frontend Developer','J-FE-001','sample.pdf','/uploads/1776071231320_sample.pdf',NULL,NULL,NULL,'pending','2026-04-13 09:07:11','2026-04-13 09:07:11',NULL),(19,'CND-mnwyzwez-6VMQUA','Budi Santoso','budi@email.com','081234567890','https://linkedin.com/in/budi','Frontend Developer','J-FE-001','real-sample.pdf','/uploads/1776071303387_real-sample.pdf',NULL,NULL,NULL,'pending','2026-04-13 09:08:23','2026-04-13 09:08:23',NULL),(20,'CND-mnwz3z2t-CFYHSD','Budi Santoso','budi@email.com','081234567890','https://linkedin.com/in/budi','Frontend Developer','J-FE-001','real-sample.pdf','/uploads/1776071493461_real-sample.pdf',NULL,NULL,NULL,'pending','2026-04-13 09:11:33','2026-04-13 09:11:33',NULL),(21,'CND-mnwz5im7-NFA1XF','Budi Santoso','budi@email.com','081234567890','https://linkedin.com/in/budi','Frontend Developer','J-FE-001','real-sample.pdf','/uploads/1776071565438_real-sample.pdf',NULL,NULL,NULL,'pending','2026-04-13 09:12:45','2026-04-13 09:12:45',NULL),(22,'CND-mnwzhavi-RCFU9H','Budi Santoso','budi@email.com','081234567890','https://linkedin.com/in/budi','Frontend Developer','J-FE-001','real-sample.pdf','/uploads/Budi_Santoso_1776072115277.pdf','Budi_Santoso_1776072115277.pdf',NULL,NULL,'pending','2026-04-13 09:21:55','2026-04-13 09:21:55',NULL),(23,'CND-mnwzs08l-UZ6EBR','Budi Santoso','budi@email.com','081234567890','https://linkedin.com/in/budi','Frontend Developer','J-FE-001','real-sample.pdf','/uploads/Budi_Santoso_1776072614708.pdf','Budi_Santoso_1776072614708.pdf',NULL,NULL,'pending','2026-04-13 09:30:14','2026-04-13 09:30:14',NULL),(24,'CND-mnwzxy3z-39XT8P','Budi Santoso','budi@email.com','081234567890','https://linkedin.com/in/budi','Frontend Developer','J-FE-001','real-sample.pdf','/uploads/Budi_Santoso_1776072891887.pdf','Budi_Santoso_1776072891887.pdf',NULL,NULL,'pending','2026-04-13 09:34:51','2026-04-13 09:34:51',NULL),(25,'CND-mnzwp975-9LYQRF','Budi Santoso','budi@email.com','081234567890','https://linkedin.com/in/budi','Frontend Developer','J-FE-001','real-sample.pdf','https://drive.google.com/file/d/13rYsEqqye5SRFIwlpka1HGxw7FaP22AM/view','13rYsEqqye5SRFIwlpka1HGxw7FaP22AM',NULL,NULL,'pending','2026-04-15 10:27:26','2026-04-15 10:27:26',NULL),(26,'CND-mnzzlz3v-O9JH8F','tantry purba','tantry351@gmail.com','081914691181','https://tantry351','Senior UX Designer','JOB-1234','sample.pdf','https://drive.google.com/file/d/1HhDxD3AaaMG9AW4J7nvdMr94O57J-E3j/view','1HhDxD3AaaMG9AW4J7nvdMr94O57J-E3j',NULL,NULL,'pending','2026-04-15 11:48:51','2026-04-15 11:48:51',NULL),(27,'CND-mnzzsnx5-LA070I','Test From Terminal','test@terminal.com','081234567890',NULL,'Senior UX Designer','JOB-mnzyuege-DSC9','real-sample.pdf','https://drive.google.com/file/d/1o-2QYl_c3pAd-cSUg6fuxqaScPjrIDYr/view','1o-2QYl_c3pAd-cSUg6fuxqaScPjrIDYr',NULL,NULL,'pending','2026-04-15 11:54:03','2026-04-15 11:54:03',NULL),(28,'CND-mnzzwbpr-KF2HX4','tantry purba','tantry351@gmail.com','081914691181','https://tantry351','Senior UX Designer','JOB-1234','sample.pdf','https://drive.google.com/file/d/10cDUg02_a0lGpfjIUz79ZBHffFNVwS1d/view','10cDUg02_a0lGpfjIUz79ZBHffFNVwS1d',NULL,NULL,'pending','2026-04-15 11:56:54','2026-04-15 11:56:54',NULL),(29,'CND-mnzzzacb-F6CG2I','tantry purba','tantry351@gmail.com','081914691181','https://tantry351','Senior UX Designer','JOB-1234','sample.pdf','https://drive.google.com/file/d/1BPlE0z0456MNVLikOjQpyVsebLOGO_sA/view','1BPlE0z0456MNVLikOjQpyVsebLOGO_sA',NULL,NULL,'pending','2026-04-15 11:59:12','2026-04-15 11:59:12',NULL),(30,'CND-mo5obanf-ILZ48Q','Budi Test','test@example.com','081234567890',NULL,'Frontend Developer','J-FE-001','real-sample.pdf','https://drive.google.com/file/d/1W35i_i0A5OFHi_6ISzkUdwM1njUf5q6p/view','1W35i_i0A5OFHi_6ISzkUdwM1njUf5q6p',NULL,NULL,'pending','2026-04-19 11:19:14','2026-04-19 11:19:14',NULL),(31,'CND-mo5od4hq-VHKPR9','tantry','tantry351@gmail.com','081914691181','https://linked','Senior UX Designer','JOB-1234','real-sample.pdf','https://drive.google.com/file/d/1yqg9br7Ct_AeqpvxC1XyxZUAd69u8vWC/view','1yqg9br7Ct_AeqpvxC1XyxZUAd69u8vWC',NULL,NULL,'pending','2026-04-19 11:20:40','2026-04-19 11:20:40',NULL),(32,'CND-mo79r17v-TVTVYV','tes tantry','testantry@gmail.com','08191461191','https://linked','Senior UX Designer','JOB-1234','real-sample.pdf','https://drive.google.com/file/d/1RRjQ9OkVATk1i9aIV9fU-QfZ0OMV-ijc/view','1RRjQ9OkVATk1i9aIV9fU-QfZ0OMV-ijc',NULL,NULL,'pending','2026-04-20 14:07:07','2026-04-20 14:07:07',NULL),(33,'CND-ACCEPT-01','John Doe','emailasli@gmail.com','081234567890',NULL,'AI Engineer','J-AI-001',NULL,NULL,NULL,90,NULL,'accepted','2026-04-20 15:51:49','2026-04-20 15:51:49',NULL),(34,'CND-mo7x5rbe-QQWD71','tes1tantry','tantry@gmail.com','081914691181','https://linked','Senior UX Designer','JOB-1234','sample.pdf','https://drive.google.com/file/d/1YeZRoO3RwHehbY0FZBSwOueuMBwQ8oxJ/view','1YeZRoO3RwHehbY0FZBSwOueuMBwQ8oxJ',NULL,NULL,'pending','2026-04-21 01:02:25','2026-04-21 01:02:25',NULL),(35,'CND-mo82cp1a-B8QQJD','Tantry Test','tantry351@gmail.com','81914691181','https://linked','Senior UX Designer','JOB-1234','real-sample.pdf','https://drive.google.com/file/d/1pxkMhpqUMKigm6N_ueuFuwrzY4ulxMMh/view','1pxkMhpqUMKigm6N_ueuFuwrzY4ulxMMh',NULL,NULL,'pending','2026-04-21 03:27:47','2026-04-21 03:27:47',NULL),(36,'CND-mo82obk7-IQR0AB','tntry','tantry351@gmail.com','086453242342','https://linked','Senior UX Designer','JOB-1234','real-sample.pdf','https://drive.google.com/file/d/1iNmS-fI3aiz5xLYeeYWytZcjXF8uH1qg/view','1iNmS-fI3aiz5xLYeeYWytZcjXF8uH1qg',NULL,NULL,'pending','2026-04-21 03:36:49','2026-04-21 03:36:49',NULL),(37,'CND-mofi0aqm-52Y0W9','tantry','tantry351@gmail.com','081914691181','https://linked','Senior UX Designer','JOB-1234','real-sample.pdf','https://drive.google.com/uc?export=download&id=1A_nfN7jigdQmDHOOr9FNDDTZdGi35Zx1','1A_nfN7jigdQmDHOOr9FNDDTZdGi35Zx1',NULL,NULL,'pending','2026-04-26 08:20:25','2026-04-26 08:20:25',NULL),(38,'CND-mofiqm6n-U33OJZ','tantry Purba','tantry351cobabaru@gmail.com','918837474737','https://linked','Senior UX Designer','JOB-1234','test.pdf','https://drive.google.com/uc?export=download&id=1_qXNCcc564uta549nvbxibodXB-WEBDt','1_qXNCcc564uta549nvbxibodXB-WEBDt',NULL,NULL,'pending','2026-04-26 08:40:53','2026-04-26 08:40:53',NULL),(39,'CND-mofizfvw-J4WG7T','Tantry AI Test','tantry.ai@test.com','081234567890','htttps://linked','Senior UX Designer','JOB-1234','sample.pdf','https://drive.google.com/uc?export=download&id=112w5I-67ASHtdaAg7c1RgC7leQVlcX0H','112w5I-67ASHtdaAg7c1RgC7leQVlcX0H',NULL,NULL,'pending','2026-04-26 08:47:45','2026-04-26 08:47:45',NULL),(40,'CND-mojwnxy7-DKX4YY','Budi Test','budi.test@example.com','08123456789',NULL,'Backend Developer','JOB-xxxxx','dummy.pdf','https://drive.google.com/uc?export=download&id=1zgaWfVqhPtvKJ5ca2TNkiz99wR03ihN6','1zgaWfVqhPtvKJ5ca2TNkiz99wR03ihN6',NULL,NULL,'pending','2026-04-29 10:21:48','2026-04-29 10:21:48',NULL),(41,'CND-mojwua8c-VR0P2A','Budi Test','budi.test@example.com','08123456789',NULL,'Backend Developer','JOB-mojwtob1-9DWO','dummy.pdf','https://drive.google.com/uc?export=download&id=1IFeIEAG_KpnMh5PDIuachuCJkdBaKtyc','1IFeIEAG_KpnMh5PDIuachuCJkdBaKtyc',NULL,NULL,'pending','2026-04-29 10:26:44','2026-04-29 10:26:44',NULL);
/*!40000 ALTER TABLE `candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `threshold_score` int(11) DEFAULT 70,
  `employment_type` varchar(50) DEFAULT 'Full-time',
  `location` varchar(255) DEFAULT NULL,
  `work_setup` enum('Remote','Hybrid','On-site','Office') DEFAULT 'Office',
  `key_responsibilities` text DEFAULT NULL,
  `minimum_qualifications` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `job_id` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,'J-FE-001','Frontend Developer','React.js, Tailwind CSS',75,'Full-time',NULL,'Office',NULL,NULL,1,NULL,'2026-04-15 11:29:57','2026-04-15 11:29:57'),(2,'J-BE-001','Backend Developer','Node.js, Express, MySQL',70,'Full-time',NULL,'Office',NULL,NULL,1,NULL,'2026-04-15 11:29:57','2026-04-15 11:29:57'),(3,'J-AI-001','AI Engineer','LLM, Python, Machine Learning',80,'Full-time',NULL,'Office',NULL,NULL,1,NULL,'2026-04-15 11:29:57','2026-04-15 11:29:57'),(4,'JOB-mnzyuege-DSC9','Senior UX Designer','Mendesain pengalaman pengguna untuk platform RecruitAI',85,'Full-time','Jakarta, Indonesia','Hybrid','- Mendesain UI/UX\n- Melakukan user research\n- Membuat prototype','- Min 3 tahun pengalaman\n- Menguasai Figma\n- Portfolio yang kuat',1,'USR-mnzyc3pt-G4IAND','2026-04-15 11:29:57','2026-04-15 11:29:57'),(5,'JOB-mojwtob1-9DWO','Backend Developer','Mengembangkan API dengan Node.js',70,'Full-time',NULL,'Office',NULL,NULL,1,'USR-mojuldqo-YAQYG1','2026-04-29 10:26:15','2026-04-29 10:26:15');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `used` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_token` (`token`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
INSERT INTO `password_resets` VALUES (1,'test@example.com','f56d1d5248d131cd4e2a3cd531b676acb93d223db6147fe3db357480a3acee5a','2026-04-15 12:20:54',0,'2026-04-15 11:20:54');
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','hr','recruiter') DEFAULT 'hr',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'USR-mnzyc3pt-G4IAND','Test User','Test Company','test@example.com','$2b$10$uQWZ5AyJ/DUe5sfYJ.eqBeC8bmCbtEGezaJqtD7c97V18pju26gza','hr','2026-04-15 11:13:11','2026-04-15 11:13:11'),(2,'USR-mo0853pq-TMPK13','Test','Test','test@test.com','$2b$10$o91uln3hg2QkXXALhXkV.OIzbxfxIRZ/.6nfSY41pTJGvaOBwDo2S','hr','2026-04-15 15:47:41','2026-04-15 15:47:41'),(3,'USR-mo08hb5u-SSBYOB','Budi','PT Jalin','budi@jalin.com','$2b$10$UKYyvxQ3DD6O3mUXvOIgH.dxFhcC8AgCo16zOU7o86eAk23dCeIcq','hr','2026-04-15 15:57:10','2026-04-15 15:57:10'),(4,'USR-moju663i-7IW6HK','HR Test','PT Test','hr@test.com','$2b$10$yDwCFfMNc0r4xKb3K9apQecXadbWaDCs6g76h5gi8r0QkCMPCKpju','hr','2026-04-29 09:11:59','2026-04-29 09:11:59'),(5,'USR-mojuldqo-YAQYG1','Budi','PT Maju','budi@test.com','$2b$10$3snFMzG.v5HdD3hEDJmRFusaur.Ff/UL7wa0GjfbEfAuOSKg2i.ou','hr','2026-04-29 09:23:49','2026-04-29 09:23:49'),(6,'USR-mojvs5gg-OHQRHZ','tes467','pt jalin','tantry353@gmail.com','$2b$10$2WQ2D3j22h2mwKXNmFyS/Oa/AwwlJM4f1249J5PkC5.QM/EhlCeVG','hr','2026-04-29 09:57:05','2026-04-29 09:57:05'),(7,'USR-mojw2s7e-6OJ2UP','tantry','pt jalin','tantry351@gmail.com','$2b$10$b.98sLs2WDTswf8AJ0ojpu2MUqoSGuaqNkT6oLj.3G.W2CtUTzFVC','hr','2026-04-29 10:05:21','2026-04-29 10:05:21');
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

-- Dump completed on 2026-04-29 18:25:40
