-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2025 at 02:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

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
(4, 'user', 'uasr@123', 0);

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
(1, 'gyana', '7205569189', 57, '1765448194_Jsupfm5S.png', 50, 0, 0, 0, 'Batsman', NULL, NULL, 0),
(2, 'gynaa', '7206679189', 32, '1765457824_lbDY5t6v.jpg', 50, 0, 0, 0, 'Bowler', NULL, NULL, 0),
(3, 'ghytg', '7205569189', 34, '1765458140_iT7fgeji.jpg', 50, 0, 0, 0, 'Batsman', NULL, NULL, 0),
(4, 'gyana', '7205569189', 23, '1765459236_1ahNILRp.jpg', 50, 0, 0, 0, 'Batsman', NULL, NULL, 0);

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
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `player_registration`
--
ALTER TABLE `player_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
