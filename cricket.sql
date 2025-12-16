-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2025 at 03:11 PM
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
  `rollid` int(11) NOT NULL,
  `team_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `userId`, `password`, `rollid`, `team_id`) VALUES
(1, 'supAdmin', 'Admin@123', 1, 0),
(2, 'pintu', 'pintu@123', 1, 0),
(3, 'deepak', 'deepak@123', 1, 0),
(4, 'user', 'user@123', 0, 0),
(6, 'team1', 'team1@123', 2, 1),
(7, 'team2', 'team2@123', 2, 2),
(8, 'team3', 'team3@123', 2, 3),
(9, 'team4', 'team4@123', 2, 4);

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
  `updated_by` int(11) DEFAULT 0,
  `player_roll` varchar(20) DEFAULT 'P'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `player_registration`
--

INSERT INTO `player_registration` (`id`, `name`, `mobile_no`, `age`, `photo`, `base_price`, `occupied_price`, `status`, `team`, `type_of_player`, `created_at`, `updated_at`, `updated_by`, `player_roll`) VALUES
(1, 'gyana g', '7205569189', 57, '1765448194_Jsupfm5S.png', 50, 0, 1, 1, 'Batsman', NULL, NULL, 0, 'C'),
(2, 'gynaa p', '7206679189', 32, '1765457824_lbDY5t6v.jpg', 50, 0, 1, 1, 'Bowler', NULL, NULL, 0, 'VC'),
(3, 'ghytg', '7205569189', 34, '1765458140_iT7fgeji.jpg', 50, 0, 1, 1, 'Batsman', NULL, NULL, 0, 'WK'),
(4, 'gyana s', '7205569189', 23, '1765459236_1ahNILRp.jpg', 50, 0, 1, 1, 'Batsman', NULL, NULL, 0, 'P');

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
  `woner_image` varchar(200) DEFAULT NULL,
  `short_name` varchar(50) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `team_name`, `amount`, `amount_status`, `logo`, `woner_name`, `woner_image`, `short_name`, `status`, `created_at`, `updated_at`, `created_by`) VALUES
(1, 'team 1', 5000, 1, '1CYinCWdiHNoVlBEP49l.jpeg', 'Mukesh Ambani', 'sbPorYVdpkfBW5eig7Jy.jpeg', 't1', 1, '2025-12-15 13:05:36', '2025-12-15 13:13:11', 2),
(2, 'team2', 5000, 1, '4gbwdKdCeAXtCEhUOGwd.jpeg', 'N. Srinivasan', 'RBppRvPbt6QVOHvq04fv.jpeg', 't2', 1, '2025-12-15 13:06:19', '2025-12-15 13:13:08', 2),
(3, 'team3', 5000, 1, 'nU59ofKxMnJbPQXtQ3zO.jpeg', 'Shah Rukh Khan', 'jzZfnC81ZHTZ2SeZXiEM.jpeg', 't3', 1, '2025-12-15 13:06:53', '2025-12-15 13:13:05', 2),
(4, 'team4', 5000, 1, '13uRHC6ux30GUAeC17F3.png', 'Kalanithi Maran', 'DZ2ItztVoCHMqppGZ9Bg.png', 't4', 1, '2025-12-15 13:07:42', '2025-12-15 13:13:01', 2);

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
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `player_registration`
--
ALTER TABLE `player_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
