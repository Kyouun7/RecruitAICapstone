-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2026 at 12:09 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recruitmen_db`
--

CREATE DATABASE IF NOT EXISTS `recruitmen_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `recruitmen_db`;

-- --------------------------------------------------------

--
-- Table structure for table `candidates`
--

CREATE TABLE `candidates` (
  `id` int(11) NOT NULL,
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
  `extracted_text` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `candidates`
--

INSERT INTO `candidates` (`id`, `candidate_id`, `nama`, `email`, `telepon`, `portofolio`, `posisi`, `job_id`, `cv_original_name`, `cv_url`, `cv_google_drive_id`, `score`, `justifikasi`, `status`, `created_at`, `updated_at`, `recruiter_note`, `extracted_text`) VALUES
(1, 'CND-mnu81u02-L8RONY', 'Budi Santoso', 'budi@email.com', '081234567890', NULL, 'Technology', 'J-FE-001', 'test.pdf', '/uploads/1775905111585_test.pdf', NULL, NULL, NULL, 'pending', '2026-04-11 10:58:31', '2026-04-11 10:58:31', NULL, NULL),
(2, 'CND-mnu8bvjw-ZO8T5I', 'Budi Santoso', 'budi@email.com', '081234567890', NULL, 'Technology', 'J-FE-001', 'test.pdf', '/uploads/1775905580156_test.pdf', NULL, NULL, NULL, 'pending', '2026-04-11 11:06:20', '2026-04-11 11:06:20', NULL, NULL),
(3, 'CND-mnu8c6fn-PPLABW', 'Budi Santoso', 'budi@email.com', '081234567890', NULL, 'Technology', 'J-FE-001', 'test.pdf', '/uploads/1775905594258_test.pdf', NULL, NULL, NULL, 'pending', '2026-04-11 11:06:34', '2026-04-11 11:06:34', NULL, NULL),
(4, 'CND-mnu8esad-RHALZK', 'Budi Santoso', 'budi@email.com', '081234567890', NULL, 'Technology', 'J-FE-001', 'test.pdf', '/uploads/1775905715893_test.pdf', NULL, NULL, NULL, 'pending', '2026-04-11 11:08:35', '2026-04-11 11:08:35', NULL, NULL),
(5, 'CND-mnu8m5mn-PYINJG', 'Budi Santoso', 'budi@email.com', '081234567890', NULL, 'Technology', 'J-FE-001', 'test.pdf', '/uploads/1775906059774_test.pdf', NULL, NULL, NULL, 'pending', '2026-04-11 11:14:19', '2026-04-11 11:14:19', NULL, NULL),
(6, 'CND-mnu8n86d-WBGWK8', 'Budi Santoso', 'budi@email.com', '081234567890', NULL, 'Technology', 'J-FE-001', 'test.pdf', '/uploads/1775906109733_test.pdf', NULL, NULL, NULL, 'pending', '2026-04-11 11:15:09', '2026-04-11 11:15:09', NULL, NULL),
(7, 'CND-mnu8ovsk-R32NLE', 'Budi Santoso', 'budi@email.com', '081234567890', NULL, 'Technology', 'J-FE-001', 'test.pdf', '/uploads/1775906186994_test.pdf', NULL, NULL, NULL, 'pending', '2026-04-11 11:16:27', '2026-04-11 11:16:27', NULL, NULL),
(8, 'CND-mnu8ua10-R1XK2M', 'Budi Santoso', 'budi@email.com', '081234567890', NULL, 'Technology', 'J-FE-001', 'test.pdf', '/uploads/1775906438723_test.pdf', NULL, NULL, NULL, 'pending', '2026-04-11 11:20:38', '2026-04-11 11:20:38', NULL, NULL),
(9, 'CND-mnu8v9u8-IPUZKF', 'Budi Santoso', 'budi@email.com', '081234567890', NULL, 'Technology', 'J-FE-001', 'test.pdf', '/uploads/1775906485136_test.pdf', NULL, NULL, NULL, 'pending', '2026-04-11 11:21:25', '2026-04-11 11:21:25', NULL, NULL),
(10, 'CND-mnu8vb6s-KUB9IM', 'Budi Santoso', 'budi@email.com', '081234567890', NULL, 'Technology', 'J-FE-001', 'test.pdf', '/uploads/1775906486883_test.pdf', NULL, NULL, NULL, 'pending', '2026-04-11 11:21:26', '2026-04-11 11:21:26', NULL, NULL),
(11, 'CND-mnu8yhku-A6TCNJ', 'Budi Santoso', 'budi@email.com', '081234567890', NULL, 'Technology', 'J-FE-001', 'test.pdf', '/uploads/1775906635134_test.pdf', NULL, NULL, NULL, 'pending', '2026-04-11 11:23:55', '2026-04-11 11:23:55', NULL, NULL),
(12, 'CND-mnu9zlz9-JVJQ5E', 'Budi Santoso', 'budi@email.com', '081234567890', 'https://linkedin.com/in/budi', 'Technology', 'J-FE-001', 'sample.pdf', '/uploads/1775908367108_sample.pdf', NULL, NULL, NULL, 'pending', '2026-04-11 11:52:47', '2026-04-11 11:52:47', NULL, NULL),
(13, 'CND-mnuactc8-8P16XM', 'Budi Santoso', 'budi@email.com', '081234567890', 'https://linkedin.com/in/budi', 'Technology', 'J-FE-001', 'sample.pdf', '/uploads/1775908983176_sample.pdf', NULL, NULL, NULL, 'pending', '2026-04-11 12:03:03', '2026-04-11 12:03:03', NULL, NULL),
(14, 'CND-mnuakmxu-KRXMF5', 'Budi Santoso', 'budi@email.com', '081234567890', 'https://linkedin.com/in/budi', 'Technology', 'J-FE-001', 'sample.pdf', '/uploads/1775909348130_sample.pdf', NULL, NULL, NULL, 'pending', '2026-04-11 12:09:08', '2026-04-11 12:09:08', NULL, NULL),
(15, 'CND-mnuartf5-EXA6VY', 'Budi Santoso', 'budi@email.com', '081234567890', 'https://linkedin.com/in/budi', 'Technology', 'J-FE-001', 'test.pdf', '/uploads/1775909683121_test.pdf', NULL, NULL, NULL, 'pending', '2026-04-11 12:14:43', '2026-04-11 12:14:43', NULL, NULL),
(16, 'CND-mnwyn7ys-6ZOE72', 'Budi Santoso', 'budi@email.com', '081234567890', 'https://linkedin.com/in/budi', 'Frontend Developer', 'J-FE-001', 'sample.pdf', '/uploads/1776070711827_sample.pdf', NULL, NULL, NULL, 'pending', '2026-04-13 08:58:31', '2026-04-13 08:58:31', NULL, NULL),
(17, 'CND-mnwys147-D526XE', 'Budi Santoso', 'budi@email.com', '081234567890', 'https://linkedin.com/in/budi', 'Frontend Developer', 'J-FE-001', 'sample.pdf', '/uploads/1776070936231_sample.pdf', NULL, NULL, NULL, 'pending', '2026-04-13 09:02:16', '2026-04-13 09:02:16', NULL, NULL),
(18, 'CND-mnwyyct5-KF1ACU', 'Budi Santoso', 'budi@email.com', '081234567890', 'https://linkedin.com/in/budi', 'Frontend Developer', 'J-FE-001', 'sample.pdf', '/uploads/1776071231320_sample.pdf', NULL, NULL, NULL, 'pending', '2026-04-13 09:07:11', '2026-04-13 09:07:11', NULL, NULL),
(19, 'CND-mnwyzwez-6VMQUA', 'Budi Santoso', 'budi@email.com', '081234567890', 'https://linkedin.com/in/budi', 'Frontend Developer', 'J-FE-001', 'real-sample.pdf', '/uploads/1776071303387_real-sample.pdf', NULL, NULL, NULL, 'pending', '2026-04-13 09:08:23', '2026-04-13 09:08:23', NULL, NULL),
(20, 'CND-mnwz3z2t-CFYHSD', 'Budi Santoso', 'budi@email.com', '081234567890', 'https://linkedin.com/in/budi', 'Frontend Developer', 'J-FE-001', 'real-sample.pdf', '/uploads/1776071493461_real-sample.pdf', NULL, NULL, NULL, 'pending', '2026-04-13 09:11:33', '2026-04-13 09:11:33', NULL, NULL),
(21, 'CND-mnwz5im7-NFA1XF', 'Budi Santoso', 'budi@email.com', '081234567890', 'https://linkedin.com/in/budi', 'Frontend Developer', 'J-FE-001', 'real-sample.pdf', '/uploads/1776071565438_real-sample.pdf', NULL, NULL, NULL, 'pending', '2026-04-13 09:12:45', '2026-04-13 09:12:45', NULL, NULL),
(22, 'CND-mnwzhavi-RCFU9H', 'Budi Santoso', 'budi@email.com', '081234567890', 'https://linkedin.com/in/budi', 'Frontend Developer', 'J-FE-001', 'real-sample.pdf', '/uploads/Budi_Santoso_1776072115277.pdf', 'Budi_Santoso_1776072115277.pdf', NULL, NULL, 'pending', '2026-04-13 09:21:55', '2026-04-13 09:21:55', NULL, NULL),
(23, 'CND-mnwzs08l-UZ6EBR', 'Budi Santoso', 'budi@email.com', '081234567890', 'https://linkedin.com/in/budi', 'Frontend Developer', 'J-FE-001', 'real-sample.pdf', '/uploads/Budi_Santoso_1776072614708.pdf', 'Budi_Santoso_1776072614708.pdf', NULL, NULL, 'pending', '2026-04-13 09:30:14', '2026-04-13 09:30:14', NULL, NULL),
(24, 'CND-mnwzxy3z-39XT8P', 'Budi Santoso', 'budi@email.com', '081234567890', 'https://linkedin.com/in/budi', 'Frontend Developer', 'J-FE-001', 'real-sample.pdf', '/uploads/Budi_Santoso_1776072891887.pdf', 'Budi_Santoso_1776072891887.pdf', NULL, NULL, 'pending', '2026-04-13 09:34:51', '2026-04-13 09:34:51', NULL, NULL),
(25, 'CND-mnzwp975-9LYQRF', 'Budi Santoso', 'budi@email.com', '081234567890', 'https://linkedin.com/in/budi', 'Frontend Developer', 'J-FE-001', 'real-sample.pdf', 'https://drive.google.com/file/d/13rYsEqqye5SRFIwlpka1HGxw7FaP22AM/view', '13rYsEqqye5SRFIwlpka1HGxw7FaP22AM', NULL, NULL, 'pending', '2026-04-15 10:27:26', '2026-04-15 10:27:26', NULL, NULL),
(26, 'CND-mnzzlz3v-O9JH8F', 'tantry purba', 'tantry351@gmail.com', '081914691181', 'https://tantry351', 'Senior UX Designer', 'JOB-1234', 'sample.pdf', 'https://drive.google.com/file/d/1HhDxD3AaaMG9AW4J7nvdMr94O57J-E3j/view', '1HhDxD3AaaMG9AW4J7nvdMr94O57J-E3j', NULL, NULL, 'pending', '2026-04-15 11:48:51', '2026-04-15 11:48:51', NULL, NULL),
(27, 'CND-mnzzsnx5-LA070I', 'Test From Terminal', 'test@terminal.com', '081234567890', NULL, 'Senior UX Designer', 'JOB-mnzyuege-DSC9', 'real-sample.pdf', 'https://drive.google.com/file/d/1o-2QYl_c3pAd-cSUg6fuxqaScPjrIDYr/view', '1o-2QYl_c3pAd-cSUg6fuxqaScPjrIDYr', NULL, NULL, 'pending', '2026-04-15 11:54:03', '2026-04-15 11:54:03', NULL, NULL),
(28, 'CND-mnzzwbpr-KF2HX4', 'tantry purba', 'tantry351@gmail.com', '081914691181', 'https://tantry351', 'Senior UX Designer', 'JOB-1234', 'sample.pdf', 'https://drive.google.com/file/d/10cDUg02_a0lGpfjIUz79ZBHffFNVwS1d/view', '10cDUg02_a0lGpfjIUz79ZBHffFNVwS1d', NULL, NULL, 'pending', '2026-04-15 11:56:54', '2026-04-15 11:56:54', NULL, NULL),
(29, 'CND-mnzzzacb-F6CG2I', 'tantry purba', 'tantry351@gmail.com', '081914691181', 'https://tantry351', 'Senior UX Designer', 'JOB-1234', 'sample.pdf', 'https://drive.google.com/file/d/1BPlE0z0456MNVLikOjQpyVsebLOGO_sA/view', '1BPlE0z0456MNVLikOjQpyVsebLOGO_sA', NULL, NULL, 'pending', '2026-04-15 11:59:12', '2026-04-15 11:59:12', NULL, NULL),
(30, 'CND-mo5obanf-ILZ48Q', 'Budi Test', 'test@example.com', '081234567890', NULL, 'Frontend Developer', 'J-FE-001', 'real-sample.pdf', 'https://drive.google.com/file/d/1W35i_i0A5OFHi_6ISzkUdwM1njUf5q6p/view', '1W35i_i0A5OFHi_6ISzkUdwM1njUf5q6p', NULL, NULL, 'pending', '2026-04-19 11:19:14', '2026-04-19 11:19:14', NULL, NULL),
(31, 'CND-mo5od4hq-VHKPR9', 'tantry', 'tantry351@gmail.com', '081914691181', 'https://linked', 'Senior UX Designer', 'JOB-1234', 'real-sample.pdf', 'https://drive.google.com/file/d/1yqg9br7Ct_AeqpvxC1XyxZUAd69u8vWC/view', '1yqg9br7Ct_AeqpvxC1XyxZUAd69u8vWC', NULL, NULL, 'pending', '2026-04-19 11:20:40', '2026-04-19 11:20:40', NULL, NULL),
(32, 'CND-mo79r17v-TVTVYV', 'tes tantry', 'testantry@gmail.com', '08191461191', 'https://linked', 'Senior UX Designer', 'JOB-1234', 'real-sample.pdf', 'https://drive.google.com/file/d/1RRjQ9OkVATk1i9aIV9fU-QfZ0OMV-ijc/view', '1RRjQ9OkVATk1i9aIV9fU-QfZ0OMV-ijc', NULL, NULL, 'pending', '2026-04-20 14:07:07', '2026-04-20 14:07:07', NULL, NULL),
(33, 'CND-ACCEPT-01', 'John Doe', 'emailasli@gmail.com', '081234567890', NULL, 'AI Engineer', 'J-AI-001', NULL, NULL, NULL, 90, NULL, 'accepted', '2026-04-20 15:51:49', '2026-04-20 15:51:49', NULL, NULL),
(34, 'CND-mo7x5rbe-QQWD71', 'tes1tantry', 'tantry@gmail.com', '081914691181', 'https://linked', 'Senior UX Designer', 'JOB-1234', 'sample.pdf', 'https://drive.google.com/file/d/1YeZRoO3RwHehbY0FZBSwOueuMBwQ8oxJ/view', '1YeZRoO3RwHehbY0FZBSwOueuMBwQ8oxJ', NULL, NULL, 'pending', '2026-04-21 01:02:25', '2026-04-21 01:02:25', NULL, NULL),
(35, 'CND-mo82cp1a-B8QQJD', 'Tantry Test', 'tantry351@gmail.com', '81914691181', 'https://linked', 'Senior UX Designer', 'JOB-1234', 'real-sample.pdf', 'https://drive.google.com/file/d/1pxkMhpqUMKigm6N_ueuFuwrzY4ulxMMh/view', '1pxkMhpqUMKigm6N_ueuFuwrzY4ulxMMh', NULL, NULL, 'pending', '2026-04-21 03:27:47', '2026-04-21 03:27:47', NULL, NULL),
(36, 'CND-mo82obk7-IQR0AB', 'tntry', 'tantry351@gmail.com', '086453242342', 'https://linked', 'Senior UX Designer', 'JOB-1234', 'real-sample.pdf', 'https://drive.google.com/file/d/1iNmS-fI3aiz5xLYeeYWytZcjXF8uH1qg/view', '1iNmS-fI3aiz5xLYeeYWytZcjXF8uH1qg', NULL, NULL, 'pending', '2026-04-21 03:36:49', '2026-04-21 03:36:49', NULL, NULL),
(37, 'CND-mofi0aqm-52Y0W9', 'tantry', 'tantry351@gmail.com', '081914691181', 'https://linked', 'Senior UX Designer', 'JOB-1234', 'real-sample.pdf', 'https://drive.google.com/uc?export=download&id=1A_nfN7jigdQmDHOOr9FNDDTZdGi35Zx1', '1A_nfN7jigdQmDHOOr9FNDDTZdGi35Zx1', NULL, NULL, 'pending', '2026-04-26 08:20:25', '2026-04-26 08:20:25', NULL, NULL),
(38, 'CND-mofiqm6n-U33OJZ', 'tantry Purba', 'tantry351cobabaru@gmail.com', '918837474737', 'https://linked', 'Senior UX Designer', 'JOB-1234', 'test.pdf', 'https://drive.google.com/uc?export=download&id=1_qXNCcc564uta549nvbxibodXB-WEBDt', '1_qXNCcc564uta549nvbxibodXB-WEBDt', NULL, NULL, 'pending', '2026-04-26 08:40:53', '2026-04-26 08:40:53', NULL, NULL),
(39, 'CND-mofizfvw-J4WG7T', 'Tantry AI Test', 'tantry.ai@test.com', '081234567890', 'htttps://linked', 'Senior UX Designer', 'JOB-1234', 'sample.pdf', 'https://drive.google.com/uc?export=download&id=112w5I-67ASHtdaAg7c1RgC7leQVlcX0H', '112w5I-67ASHtdaAg7c1RgC7leQVlcX0H', NULL, NULL, 'pending', '2026-04-26 08:47:45', '2026-04-26 08:47:45', NULL, NULL),
(40, 'CND-mojwnxy7-DKX4YY', 'Budi Test', 'budi.test@example.com', '08123456789', NULL, 'Backend Developer', 'JOB-xxxxx', 'dummy.pdf', 'https://drive.google.com/uc?export=download&id=1zgaWfVqhPtvKJ5ca2TNkiz99wR03ihN6', '1zgaWfVqhPtvKJ5ca2TNkiz99wR03ihN6', NULL, NULL, 'pending', '2026-04-29 10:21:48', '2026-04-29 10:21:48', NULL, NULL),
(41, 'CND-mojwua8c-VR0P2A', 'Budi Test', 'budi.test@example.com', '08123456789', NULL, 'Backend Developer', 'JOB-mojwtob1-9DWO', 'dummy.pdf', 'https://drive.google.com/uc?export=download&id=1IFeIEAG_KpnMh5PDIuachuCJkdBaKtyc', '1IFeIEAG_KpnMh5PDIuachuCJkdBaKtyc', NULL, NULL, 'pending', '2026-04-29 10:26:44', '2026-04-29 10:26:44', NULL, NULL),
(42, 'CND-TEST-001', 'Demo', 'wikanandq20@student.ub.ac.id', '08123456767', NULL, 'Frontend Developer', 'J-FE-001', NULL, NULL, NULL, 90, 'The candidate demonstrates solid experience with React.js and Tailwind CSS across multiple professional projects and a current frontend role, directly matching the core job requirements. Their performance optimization and UI component library work further strengthen their fit.', 'accepted', '2026-05-06 06:19:57', '2026-05-13 06:57:43', NULL, NULL),
(43, 'CND-motovmbr-W39ZDO', 'Rendy', 'Rendy@gmai.com', '08234324234', NULL, 'Brainrot promter', 'JOB-mototnk0-D7O6', 'Budi_Santoso_CV.pdf', '/uploads/Rendy_1778049691331.pdf', 'Rendy_1778049691331.pdf', NULL, NULL, 'pending', '2026-05-06 06:41:31', '2026-05-06 06:41:31', NULL, NULL),
(44, 'CND-mp3p4o8n-Q35JOV', 'Test2', 'wikanandq20@student.ub.ac.id', '3575375373', NULL, 'Software Engineer', 'JOB-mp3nwhni-YMNC', 'Mister_Miko_CV.pdf', 'https://drive.google.com/uc?export=download&id=1ymZMHqz--jzP_i4DGzXHvGY6F8O-WNir', '1ymZMHqz--jzP_i4DGzXHvGY6F8O-WNir', 78, 'The candidate demonstrates strong frontend expertise, solid performance optimization, and relevant project experience, aligning well with many software engineering tasks. However, the CV shows limited backend or full‑stack experience and minimal evidence of algorithmic problem‑solving, which are typical expectations for a general software engineer role.', 'rejected', '2026-05-13 06:46:15', '2026-05-13 06:46:21', NULL, NULL),
(45, 'CND-mp3p9z27-T8UAYH', 'test3', 'wikanandq20@student.ub.ac.id', '135135135637', NULL, 'Software Engineer', 'JOB-mp3nwhni-YMNC', 'Budi_Santoso_CV.pdf', 'https://drive.google.com/uc?export=download&id=1SmlwoWR7jcDbloIq4oHPNIMHwG4n3bbG', '1SmlwoWR7jcDbloIq4oHPNIMHwG4n3bbG', 88, 'The candidate demonstrates exceptional technical expertise, leadership as CTO, and a strong track record of research, publications, and large‑scale ML infrastructure, aligning well with a software engineering role in a tech company. However, the CV focuses heavily on research and AI‑specific work, with limited evidence of broader software product development experience.', 'accepted', '2026-05-13 06:50:22', '2026-05-13 06:50:27', NULL, NULL),
(46, 'CND-mp3pc5up-LRVQ9J', 'test4', 'wikanandq20@student.ub.ac.id', '646246422727', NULL, 'Software Engineer', 'JOB-mp3nwhni-YMNC', 'unrelated_sample.pdf', 'https://drive.google.com/uc?export=download&id=1prDBzKUQ1Bh_w5-bJdqNpydUoO4iBO60', '1prDBzKUQ1Bh_w5-bJdqNpydUoO4iBO60', 20, 'The candidate demonstrates strong leadership and operational experience but lacks any software engineering skills, relevant technical knowledge, or formal education required for the role.', 'rejected', '2026-05-13 06:52:04', '2026-05-13 06:52:08', NULL, NULL),
(47, 'CND-mp3pndih-1Q7KKE', 'demo2', 'wikanandq20@student.ub.ac.id', '08234324234', NULL, 'Software Engineer', 'JOB-mp3nwhni-YMNC', 'unrelated_sample.pdf', 'https://drive.google.com/uc?export=download&id=1ZqktdscAGxaMYQnCW0GiD5GWqvqxeQXF', '1ZqktdscAGxaMYQnCW0GiD5GWqvqxeQXF', 20, 'The candidate demonstrates strong leadership, discipline, and operational experience, but lacks any software development, programming, or relevant technical qualifications required for a Software Engineer role. Consequently, the fit for the position is very low.', 'rejected', '2026-05-13 07:00:48', '2026-05-13 07:00:50', NULL, NULL),
(48, 'CND-mp6g3sii-HEOC04', 'Dummy1', 'wikanandq20@student.ub.ac.id', '25082053623', NULL, 'Cybersecurity Analyst', 'JOB-mp6g0ufm-5Z5Y', 'Mister_Miko_CV.pdf', 'https://drive.google.com/uc?export=download&id=1TjL2_i-689N4y44kVjvfNdb-kYNwoxWn', '1TjL2_i-689N4y44kVjvfNdb-kYNwoxWn', 30, 'The candidate demonstrates strong frontend development skills but lacks any cybersecurity experience, relevant certifications, or knowledge of security tools and practices required for a Cybersecurity Analyst role.', 'rejected', '2026-05-15 04:56:56', '2026-05-15 04:57:00', NULL, NULL),
(49, 'CND-mp6hkwql-RWHQYY', 'Dummy2', 'wikanandq20@student.ub.ac.id', '082345333534', NULL, 'Cybersecurity Analyst', 'JOB-mp6g0ufm-5Z5Y', 'Budi_Santoso_CV.pdf', 'https://drive.google.com/uc?export=download&id=1TXMTOMC6izVzjdBgkB8xgc49aG42RCi2', '1TXMTOMC6izVzjdBgkB8xgc49aG42RCi2', 20, 'The candidate has an outstanding AI/ML research and leadership background but lacks any demonstrated experience, education, or certifications in cybersecurity. This misalignment with core job responsibilities and required skills results in a low suitability score.', 'rejected', '2026-05-15 05:38:14', '2026-05-15 05:38:17', NULL, NULL),
(50, 'CND-mp6jd0zc-Z99QI9', 'Deva Wikananda', 'wikanandq20@student.ub.ac.id', '646246422727', NULL, 'NLP Engineer', 'JOB-mp6jb9bq-YH7Z', 'Budi_Santoso_CV.pdf', 'https://drive.google.com/uc?export=download&id=1Uued0tNnZxsupd2HArYkmzxUWZL6lpSG', '1Uued0tNnZxsupd2HArYkmzxUWZL6lpSG', 68, 'The candidate demonstrates exceptional research and engineering expertise in large‑scale model infrastructure and efficient inference, which aligns with the AI engineering aspects of the role. However, the CV lacks concrete experience in core NLP tasks such as text preprocessing, tokenization, and building language‑specific applications, which are central to the position.', 'rejected', '2026-05-15 06:28:06', '2026-05-15 06:28:10', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `job_id`, `title`, `description`, `threshold_score`, `employment_type`, `location`, `work_setup`, `key_responsibilities`, `minimum_qualifications`, `is_active`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'J-FE-001', 'Frontend Developer', 'React.js, Tailwind CSS', 75, 'Full-time', NULL, 'Office', NULL, NULL, 1, NULL, '2026-04-15 11:29:57', '2026-04-15 11:29:57'),
(2, 'J-BE-001', 'Backend Developer', 'Node.js, Express, MySQL', 70, 'Full-time', NULL, 'Office', NULL, NULL, 1, NULL, '2026-04-15 11:29:57', '2026-04-15 11:29:57'),
(3, 'J-AI-001', 'AI Engineer', 'LLM, Python, Machine Learning', 80, 'Full-time', NULL, 'Office', NULL, NULL, 1, NULL, '2026-04-15 11:29:57', '2026-04-15 11:29:57'),
(4, 'JOB-mnzyuege-DSC9', 'Senior UX Designer', 'Mendesain pengalaman pengguna untuk platform RecruitAI', 85, 'Full-time', 'Jakarta, Indonesia', 'Hybrid', '- Mendesain UI/UX\n- Melakukan user research\n- Membuat prototype', '- Min 3 tahun pengalaman\n- Menguasai Figma\n- Portfolio yang kuat', 1, 'USR-mnzyc3pt-G4IAND', '2026-04-15 11:29:57', '2026-04-15 11:29:57'),
(5, 'JOB-mojwtob1-9DWO', 'Backend Developer', 'Mengembangkan API dengan Node.js', 70, 'Full-time', NULL, 'Office', NULL, NULL, 1, 'USR-mojuldqo-YAQYG1', '2026-04-29 10:26:15', '2026-04-29 10:26:15'),
(6, 'JOB-mototnk0-D7O6', 'Brainrot prompter', 'sdfasdfasdf', 85, 'Full-time', 'Brawijaya', 'Remote', 'asdfasdf', '', 1, 'USR-motot2fn-V5P836', '2026-05-06 06:39:59', '2026-05-13 04:16:57'),
(7, 'JOB-mp3nwhni-YMNC', 'Software Engineer', 'Kami mencari Software Engineer yang memiliki kemampuan problem solving yang baik dan antusias dalam membangun aplikasi modern yang scalable, aman, dan mudah digunakan. Kandidat akan bekerja sama dengan tim product, UI/UX, dan AI engineer untuk mengembangkan fitur baru, meningkatkan performa sistem, serta memastikan pengalaman pengguna tetap optimal.', 85, 'Full-time', 'Jakarta', 'Remote', 'Mengembangkan dan memelihara fitur aplikasi web sesuai kebutuhan bisnis\nBerkolaborasi dengan tim desain dan backend dalam pengembangan produk\nMelakukan debugging dan perbaikan bug pada sistem\nMenulis kode yang bersih, terstruktur, dan mudah dipelihara\nMelakukan testing dan optimasi performa aplikasi\nBerpartisipasi dalam code review dan diskusi teknis', 'Pendidikan minimal D3/S1 Teknik Informatika atau bidang terkait\nMemahami JavaScript/TypeScript dan framework modern\nMemiliki pengalaman menggunakan React atau Next.js\nMemahami dasar REST API dan integrasi frontend-backend\nMampu menggunakan Git dan workflow kolaborasi\nMemiliki kemampuan komunikasi dan kerja tim yang baik', 1, 'USR-mp3myivv-TD4PMA', '2026-05-13 06:11:54', '2026-05-13 06:11:54'),
(8, 'JOB-mp6g0ufm-5Z5Y', 'Cybersecurity Analyst', 'Kami mencari Cybersecurity Analyst yang memiliki perhatian tinggi terhadap keamanan sistem dan data perusahaan. Posisi ini bertanggung jawab dalam memantau, menganalisis, dan menangani potensi ancaman keamanan siber pada aplikasi maupun infrastruktur perusahaan. Kandidat akan bekerja sama dengan tim IT, DevOps, dan Software Engineer untuk memastikan sistem berjalan secara aman, stabil, dan sesuai dengan standar keamanan yang berlaku.', 75, 'Full-time', 'Malang, Indonesia', 'Hybrid', 'Memantau aktivitas keamanan jaringan dan sistem secara berkala\nMelakukan identifikasi, analisis, dan mitigasi terhadap potensi ancaman siber\nMelakukan vulnerability assessment dan security testing pada aplikasi maupun server\nMenangani insiden keamanan serta membuat laporan investigasi\nMenerapkan dan memelihara kebijakan keamanan sistem perusahaan\nBerkolaborasi dengan tim pengembang untuk meningkatkan keamanan aplikasi\nMelakukan monitoring log, firewall, dan sistem deteksi ancaman\nMemberikan rekomendasi peningkatan keamanan berdasarkan hasil analisis', 'Pendidikan minimal D3/S1 Teknik Informatika, Sistem Informasi, atau bidang terkait\nMemahami dasar keamanan jaringan, sistem operasi, dan web security\nMemiliki pengetahuan mengenai vulnerability assessment dan penetration testing dasar\nMemahami konsep firewall, SIEM, IDS/IPS, dan manajemen akses pengguna\nMemiliki kemampuan analisis dan problem solving yang baik\nTerbiasa menggunakan Linux dan tools keamanan siber dasar\nMampu bekerja secara individu maupun dalam tim\nMemiliki sertifikasi keamanan siber menjadi nilai tambah (misalnya Security+, CEH, atau sejenisnya)', 1, 'USR-mp3myivv-TD4PMA', '2026-05-15 04:54:38', '2026-05-15 04:54:38'),
(9, 'JOB-mp6jb9bq-YH7Z', 'NLP Engineer', 'Kami mencari NLP Engineer yang memiliki ketertarikan dalam pengembangan sistem berbasis Artificial Intelligence dan Natural Language Processing (NLP). Posisi ini bertanggung jawab untuk membangun, melatih, dan mengoptimalkan model AI yang mampu memahami, memproses, dan menghasilkan bahasa manusia secara efektif. Kandidat akan bekerja sama dengan tim AI Engineer, Data Scientist, dan Software Engineer untuk mengembangkan solusi AI seperti chatbot, CV screening, text classification, sentiment analysis, dan automation system berbasis language model.', 75, 'Full-time', 'Malang, Indonesia', 'Remote', 'Mengembangkan dan mengimplementasikan model Natural Language Processing (NLP)\nMelakukan preprocessing, cleaning, dan analisis data teks\nMelatih, mengevaluasi, dan melakukan fine-tuning model machine learning atau LLM\nMengintegrasikan model AI ke dalam aplikasi atau sistem backend\nMelakukan riset dan eksperimen terhadap teknologi AI terbaru\nMengoptimalkan performa model untuk akurasi dan efisiensi sistem\nBerkolaborasi dengan tim backend dan frontend dalam implementasi fitur AI\nMembuat dokumentasi teknis terkait model dan pipeline AI', 'Pendidikan minimal D3/S1 Teknik Informatika, Ilmu Komputer, Data Science, atau bidang terkait\nMemahami dasar machine learning, deep learning, dan Natural Language Processing\nMemiliki pengalaman menggunakan Python dan library AI seperti PyTorch, TensorFlow, atau scikit-learn\nMemahami penggunaan transformer model dan framework seperti Hugging Face menjadi nilai tambah\nMemahami konsep text preprocessing, tokenization, embedding, dan model evaluation\nMemiliki kemampuan problem solving dan analisis data yang baik\nTerbiasa menggunakan Git dan workflow kolaborasi tim\nMemiliki pengalaman dalam pengembangan AI project atau chatbot menjadi nilai tambah', 1, 'USR-mp6iu697-HUEYS7', '2026-05-15 06:26:43', '2026-05-15 06:26:43');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `used` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`id`, `email`, `token`, `expires_at`, `used`, `created_at`) VALUES
(1, 'test@example.com', 'f56d1d5248d131cd4e2a3cd531b676acb93d223db6147fe3db357480a3acee5a', '2026-04-15 12:20:54', 0, '2026-04-15 11:20:54');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','hr','recruiter') DEFAULT 'hr',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_id`, `full_name`, `company_name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'USR-mnzyc3pt-G4IAND', 'Test User', 'Test Company', 'test@example.com', '$2b$10$uQWZ5AyJ/DUe5sfYJ.eqBeC8bmCbtEGezaJqtD7c97V18pju26gza', 'hr', '2026-04-15 11:13:11', '2026-04-15 11:13:11'),
(2, 'USR-mo0853pq-TMPK13', 'Test', 'Test', 'test@test.com', '$2b$10$o91uln3hg2QkXXALhXkV.OIzbxfxIRZ/.6nfSY41pTJGvaOBwDo2S', 'hr', '2026-04-15 15:47:41', '2026-04-15 15:47:41'),
(3, 'USR-mo08hb5u-SSBYOB', 'Budi', 'PT Jalin', 'budi@jalin.com', '$2b$10$UKYyvxQ3DD6O3mUXvOIgH.dxFhcC8AgCo16zOU7o86eAk23dCeIcq', 'hr', '2026-04-15 15:57:10', '2026-04-15 15:57:10'),
(4, 'USR-moju663i-7IW6HK', 'HR Test', 'PT Test', 'hr@test.com', '$2b$10$yDwCFfMNc0r4xKb3K9apQecXadbWaDCs6g76h5gi8r0QkCMPCKpju', 'hr', '2026-04-29 09:11:59', '2026-04-29 09:11:59'),
(5, 'USR-mojuldqo-YAQYG1', 'Budi', 'PT Maju', 'budi@test.com', '$2b$10$3snFMzG.v5HdD3hEDJmRFusaur.Ff/UL7wa0GjfbEfAuOSKg2i.ou', 'hr', '2026-04-29 09:23:49', '2026-04-29 09:23:49'),
(6, 'USR-mojvs5gg-OHQRHZ', 'tes467', 'pt jalin', 'tantry353@gmail.com', '$2b$10$2WQ2D3j22h2mwKXNmFyS/Oa/AwwlJM4f1249J5PkC5.QM/EhlCeVG', 'hr', '2026-04-29 09:57:05', '2026-04-29 09:57:05'),
(7, 'USR-mojw2s7e-6OJ2UP', 'tantry', 'pt jalin', 'tantry351@gmail.com', '$2b$10$b.98sLs2WDTswf8AJ0ojpu2MUqoSGuaqNkT6oLj.3G.W2CtUTzFVC', 'hr', '2026-04-29 10:05:21', '2026-04-29 10:05:21'),
(8, 'USR-motot2fn-V5P836', 'Toni', 'hehehe', 'toni@gmail.com', '$2b$10$CHgKBc3gy3eD5V5eQHIhDugkdPQEqa/1YKGisugIQkx6s7D4Ls12.', 'hr', '2026-05-06 06:39:32', '2026-05-06 06:39:32'),
(9, 'USR-mp3myivv-TD4PMA', 'test', 'test', 'test@gmail.com', '$2b$10$9j8sNzi13tyNnvHS/Amj4uKrj9fdWyb0Ns3ICzbwCv0iTENAbuHkm', 'hr', '2026-05-13 05:45:29', '2026-05-13 05:45:29'),
(10, 'USR-mp6iu697-HUEYS7', 'Rheza Yanto', 'Filkom', 'rheza@gmail.com', '$2b$10$Gm63gfea2pv1wIfH4JEK5ObAXgfRWOWx5e0SiUN8rs6TMdUi0yPGG', 'hr', '2026-05-15 06:13:26', '2026-05-15 06:13:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candidates`
--
ALTER TABLE `candidates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `candidate_id` (`candidate_id`),
  ADD KEY `idx_candidates_job_id` (`job_id`),
  ADD KEY `idx_candidates_status` (`status`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `job_id` (`job_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_token` (`token`),
  ADD KEY `idx_email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candidates`
--
ALTER TABLE `candidates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
