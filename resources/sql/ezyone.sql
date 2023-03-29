-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2023 at 09:24 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ezyone`
--

-- --------------------------------------------------------

--
-- Table structure for table `otps`
--

CREATE TABLE `otps` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `otp` varchar(6) NOT NULL,
  `type` enum('mobile_verification','forgot_password') DEFAULT 'mobile_verification',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `otps`
--

INSERT INTO `otps` (`id`, `otp`, `type`, `created_at`, `updated_at`, `user_id`) VALUES
('a74c61de-0ec2-4963-826a-d7f1a98d7b84', '186848', 'mobile_verification', '2023-03-29 19:24:25', '2023-03-29 19:24:25', 'ee250a27-5bb8-4dbe-a679-7a78a3554e89');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(100) NOT NULL,
  `mobile` varchar(13) NOT NULL,
  `password` varchar(200) NOT NULL,
  `is_phone_verified` tinyint(1) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `mobile`, `password`, `is_phone_verified`, `created_at`, `updated_at`) VALUES
('ee250a27-5bb8-4dbe-a679-7a78a3554e89', 'Umair Farooqui', '9867503256', '$2a$04$Sq4tRqERryhITaRvtHb3zObOTW6Ou25hpZNaXTRKxwLjvGmhm1qZu', 0, '2023-03-29 19:24:25', '2023-03-29 19:24:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `otps`
--
ALTER TABLE `otps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile` (`mobile`),
  ADD UNIQUE KEY `mobile_2` (`mobile`),
  ADD UNIQUE KEY `mobile_3` (`mobile`),
  ADD UNIQUE KEY `mobile_4` (`mobile`),
  ADD UNIQUE KEY `mobile_5` (`mobile`),
  ADD UNIQUE KEY `mobile_6` (`mobile`),
  ADD UNIQUE KEY `mobile_7` (`mobile`),
  ADD UNIQUE KEY `mobile_8` (`mobile`),
  ADD UNIQUE KEY `mobile_9` (`mobile`),
  ADD UNIQUE KEY `mobile_10` (`mobile`),
  ADD UNIQUE KEY `mobile_11` (`mobile`),
  ADD UNIQUE KEY `mobile_12` (`mobile`),
  ADD UNIQUE KEY `mobile_13` (`mobile`),
  ADD UNIQUE KEY `mobile_14` (`mobile`),
  ADD UNIQUE KEY `mobile_15` (`mobile`),
  ADD UNIQUE KEY `mobile_16` (`mobile`),
  ADD UNIQUE KEY `mobile_17` (`mobile`),
  ADD UNIQUE KEY `mobile_18` (`mobile`),
  ADD UNIQUE KEY `mobile_19` (`mobile`),
  ADD UNIQUE KEY `mobile_20` (`mobile`),
  ADD UNIQUE KEY `mobile_21` (`mobile`),
  ADD UNIQUE KEY `mobile_22` (`mobile`),
  ADD UNIQUE KEY `mobile_23` (`mobile`),
  ADD UNIQUE KEY `mobile_24` (`mobile`),
  ADD UNIQUE KEY `mobile_25` (`mobile`),
  ADD UNIQUE KEY `mobile_26` (`mobile`),
  ADD UNIQUE KEY `mobile_27` (`mobile`),
  ADD UNIQUE KEY `mobile_28` (`mobile`),
  ADD UNIQUE KEY `mobile_29` (`mobile`),
  ADD UNIQUE KEY `mobile_30` (`mobile`),
  ADD UNIQUE KEY `mobile_31` (`mobile`),
  ADD UNIQUE KEY `mobile_32` (`mobile`),
  ADD UNIQUE KEY `mobile_33` (`mobile`),
  ADD UNIQUE KEY `mobile_34` (`mobile`),
  ADD UNIQUE KEY `mobile_35` (`mobile`),
  ADD UNIQUE KEY `mobile_36` (`mobile`),
  ADD UNIQUE KEY `mobile_37` (`mobile`),
  ADD UNIQUE KEY `mobile_38` (`mobile`),
  ADD UNIQUE KEY `mobile_39` (`mobile`),
  ADD UNIQUE KEY `mobile_40` (`mobile`),
  ADD UNIQUE KEY `mobile_41` (`mobile`),
  ADD UNIQUE KEY `mobile_42` (`mobile`),
  ADD UNIQUE KEY `mobile_43` (`mobile`),
  ADD UNIQUE KEY `mobile_44` (`mobile`),
  ADD UNIQUE KEY `mobile_45` (`mobile`),
  ADD UNIQUE KEY `mobile_46` (`mobile`),
  ADD UNIQUE KEY `mobile_47` (`mobile`),
  ADD UNIQUE KEY `mobile_48` (`mobile`),
  ADD UNIQUE KEY `mobile_49` (`mobile`),
  ADD UNIQUE KEY `mobile_50` (`mobile`),
  ADD UNIQUE KEY `mobile_51` (`mobile`),
  ADD UNIQUE KEY `mobile_52` (`mobile`),
  ADD UNIQUE KEY `mobile_53` (`mobile`),
  ADD UNIQUE KEY `mobile_54` (`mobile`),
  ADD UNIQUE KEY `mobile_55` (`mobile`),
  ADD UNIQUE KEY `mobile_56` (`mobile`),
  ADD UNIQUE KEY `mobile_57` (`mobile`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `otps`
--
ALTER TABLE `otps`
  ADD CONSTRAINT `otps_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
