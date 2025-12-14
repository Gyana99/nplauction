-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2025 at 05:27 PM
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
-- Database: `cricket`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `userId` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `rollid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `userId`, `password`, `rollid`) VALUES
(1, 'supAdmin', 'Admin@123', 1),
(2, 'pintu', 'pintu@123', 1),
(3, 'deepak', 'deepak@123', 1),
(4, 'user', 'user@123', 0);

-- --------------------------------------------------------

--
-- Table structure for table `player_registration`
--

CREATE TABLE `player_registration` (
  `id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `mobile_no` varchar(100) DEFAULT NULL,
  `age` int(11) NOT NULL DEFAULT 18,
  `photo` varchar(100) DEFAULT NULL,
  `base_price` int(11) NOT NULL DEFAULT 50,
  `occupied_price` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 0,
  `team` int(11) NOT NULL DEFAULT 0,
  `type_of_player` varchar(100) NOT NULL DEFAULT 'NA',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `player_registration`
--

INSERT INTO `player_registration` (`id`, `name`, `mobile_no`, `age`, `photo`, `base_price`, `occupied_price`, `status`, `team`, `type_of_player`, `created_at`, `updated_at`, `updated_by`) VALUES
(1, 'gyana', '7205569128', 34, '1765505748_dekuA4ut.jpg', 50, 0, 1, 0, 'Right-hand Batsman', NULL, NULL, 0),
(2, 'Debabrata Behera ', '7848069684', 24, '1765544601_uoV6D8L8.jpg', 50, 0, 0, 0, 'Right-arm Bowling All-Rounder', NULL, NULL, 0),
(3, 'Chandan Majhi ', '8260785880', 20, '1765544639_CNZRyTOZ.jpg', 50, 0, 0, 0, 'Right-arm Bowler', NULL, NULL, 0),
(4, 'Chandan Majhi ', '8260785880', 20, '1765544644_9SpnAD7m.jpg', 50, 0, 0, 0, 'Right-arm Bowler', NULL, NULL, 0),
(5, 'Dipu(DlX)', '8260497341', 30, '1765544962_YmAHTr8P.jpg', 50, 0, 0, 0, 'Right-hand Batsman', NULL, NULL, 0),
(6, 'DEBABRATA NAYAK', '7751929972', 17, '1765545618_PqVDJPn3.jpg', 50, 0, 0, 0, 'Right-hand Batting All-Rounder', NULL, NULL, 0),
(7, 'SRIDHAR MAJHI ', '6382951891', 27, '1765545737_WG5ujtLa.jpg', 50, 0, 0, 0, 'Right-hand Batting All-Rounder', NULL, NULL, 0),
(8, 'Papunu Nayak', '6370829531', 22, '1765546082_XK91eWqQ.jpg', 50, 0, 0, 0, 'Right-hand Batting All-Rounder', NULL, NULL, 0),
(9, 'ABHIJIT BEHERA ', '9692389635', 19, '1765546456_IIRGEEVR.jpg', 50, 0, 0, 0, 'Right-arm Bowling All-Rounder', NULL, NULL, 0),
(10, 'Mukesh Nayak ', '6372407842', 22, '1765553387_cOSOpwEM.jpg', 50, 0, 0, 0, 'Right-hand WK Batsman', NULL, NULL, 0),
(11, 'Gyanaranjan pati ', '7205569189', 30, '1765554094_GIr8znAU.jpg', 50, 0, 0, 0, 'Right-hand WK Batsman', NULL, NULL, 0),
(12, 'Biswajit pati (Sonu)', '9348173270', 24, '1765556423_fSNvReP2.jpg', 50, 0, 0, 0, 'Right-hand WK Batsman', NULL, NULL, 0),
(13, 'Tapu Nayak ', '8117923330', 25, '1765570125_RCXRHq2v.jpg', 50, 0, 0, 0, 'Right-hand Batting All-Rounder', NULL, NULL, 0),
(14, 'Tapu Nayak ', '8117923330', 25, '1765570152_2IMVJKb8.jpg', 50, 0, 0, 0, 'Right-hand Batting All-Rounder', NULL, NULL, 0),
(15, 'Soubhagya Nayak', '8658354843', 31, '1765591597_ZesFyoWK.jpg', 50, 0, 0, 0, 'Right-arm Bowling All-Rounder', NULL, NULL, 0),
(16, 'Rajendra rout ', '8658200972', 31, '1765613702_MDVQUgJv.jpg', 50, 0, 0, 0, 'Right-arm Bowling All-Rounder', NULL, NULL, 0),
(17, 'Abhishek Mohanty', '9692911249', 20, '1765618662_SmGiFHpL.jpg', 50, 0, 0, 0, 'Right-hand Batting All-Rounder', NULL, NULL, 0),
(18, 'Jyotiranjan Pati', '8249919908', 33, '1765618846_TI5bp29d.jpg', 50, 0, 0, 0, 'Right-hand Batsman', NULL, NULL, 0),
(19, 'Jyotiranjan Behera ', '8144879471', 28, '1765618954_rSsCU2t3.jpg', 50, 0, 0, 0, 'Right-hand WK Batsman', NULL, NULL, 0),
(20, 'Satyajit Behera', '6371392260', 20, '1765619100_JRKc4hSu.jpg', 50, 0, 0, 0, 'Right-arm Bowling All-Rounder', NULL, NULL, 0),
(21, 'Bijaya Barik', '9114728410', 23, '1765619166_ATwblP1u.jpg', 50, 0, 0, 0, 'Right-arm Bowling All-Rounder', NULL, NULL, 0),
(22, 'Shivaranjan Majhi ', '8984680804', 20, '1765619287_GRfAZ7hU.jpg', 50, 0, 0, 0, 'Right-arm Bowling All-Rounder', NULL, NULL, 0),
(23, 'Chinmaya Pati', '6370190172', 30, '1765642337_6SvSRlQa.jpg', 50, 0, 0, 0, 'Right-hand Batting All-Rounder', NULL, NULL, 0),
(24, 'Satyajit Pati', '8917277100', 20, '1765643755_7QV5SRfI.jpg', 50, 0, 0, 0, 'Right-hand Batting All-Rounder', NULL, NULL, 0),
(25, 'Dinesh Singh', '7846966085', 27, '1765643856_n5zrqz48.jpg', 50, 0, 0, 0, 'Right-hand WK Batsman', NULL, NULL, 0),
(26, 'Omprakash Madhual', '8287521803', 15, '1765644025_fzhU50BT.jpg', 50, 0, 0, 0, 'Right-arm Bowling All-Rounder', NULL, NULL, 0),
(27, 'Sibapratap Sethi', '8457093878', 25, '1765645138_jNKTJVqj.jpg', 50, 0, 0, 0, 'Right-arm Bowling All-Rounder', NULL, NULL, 0),
(28, 'Pravash Nayak', '8118014738', 21, '1765645491_E6wcT5iv.jpg', 50, 0, 0, 0, 'Right-hand Batsman', NULL, NULL, 0),
(29, 'Ajaya Barik', '8249047625', 21, '1765645765_SUFkPy6U.jpg', 50, 0, 0, 0, 'Right-arm Bowling All-Rounder', NULL, NULL, 0),
(30, 'Abhiram Majhi', '7205976700', 30, '1765675544_NIaCG5Ci.jpg', 50, 0, 0, 0, 'Right-hand WK Batsman', NULL, NULL, 0),
(31, 'Tapan Biswal', '8093714495', 17, '1765682264_yaTMQ7Wz.jpg', 50, 0, 0, 0, 'Right-arm Bowling All-Rounder', NULL, NULL, 0),
(32, 'Lalat Barik', '9040292972', 19, '1765684391_xV6OQVcP.jpg', 50, 0, 0, 0, 'Right-arm Bowling All-Rounder', NULL, NULL, 0),
(33, 'Kalakanhu Behera', '9556706982', 19, '1765684617_T5U17id5.jpg', 50, 0, 0, 0, 'Right-arm Bowler', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `id` int(11) NOT NULL,
  `team_name` varchar(100) NOT NULL,
  `amount` int(11) NOT NULL DEFAULT 0,
  `amount_status` int(11) NOT NULL DEFAULT 0,
  `logo` varchar(100) DEFAULT NULL,
  `woner_name` varchar(200) DEFAULT NULL,
  `short_name` varchar(50) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `woner_image` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `team_name`, `amount`, `amount_status`, `logo`, `woner_name`, `short_name`, `status`, `woner_image`, `created_at`, `updated_at`, `created_by`) VALUES
(1, 'gyana', 0, 0, 'teams/logo/S9o7ea1VOVGHPd4oww0r.png', 'uynyt', 'name', 1, 'teams/owner/rQQOhhlciIVUSfdRzMjK.jpeg', '2025-12-14 20:22:54', NULL, 1),
(2, 'gyana', 0, 0, 'storage/uploads/logo', 'uynyt', 'name', 1, 'storage/uploads/owner', '2025-12-14 20:25:46', NULL, 1),
(3, 'gyana', 5000, 1, 'Jk7JA1JLW4mJC1NcxZkn.png', 'uynyt', 'name', 1, 'cLaDW07EDni8eAvSL1dx.jpeg', '2025-12-14 16:18:07', '2025-12-14 21:48:07', 1),
(4, 'gyhy', 0, 0, 'GBImavRuH5jppjAMiBWh.jpeg', 'hju', 'yut', 1, 'GqzilFGNBWPTHhwF6cKu.jpeg', '2025-12-14 20:36:00', NULL, 1),
(5, 'UYJKMKNN ', 0, 0, '5p40U1NngUxDv0SfuGk4.png', 'KIIOK', 'JJUJ', 1, 'Hm4lcD5Vre952FodIvM5.jpeg', '2025-12-14 15:49:11', '2025-12-14 21:19:11', 1),
(6, 'GHVBJNKM', 0, 0, 'baifA7g1FCpumXmftxZt.jpeg', 'IJB N', 'GVHB', 1, 'etwL9KvkLGBvlGlUT6GX.png', '2025-12-14 15:48:51', '2025-12-14 21:18:51', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userId` (`userId`);

--
-- Indexes for table `player_registration`
--
ALTER TABLE `player_registration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `player_registration`
--
ALTER TABLE `player_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
