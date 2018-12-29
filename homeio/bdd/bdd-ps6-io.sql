-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 13, 2018 at 11:10 AM
-- Server version: 5.7.22-0ubuntu0.16.04.1
-- PHP Version: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ps6_iot`
--
DROP DATABASE IF EXISTS `ps6_iot`;
CREATE DATABASE `ps6_iot` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `ps6_iot`;

-- --------------------------------------------------------

--
-- Table structure for table `home_alarm_schedule`
--

CREATE TABLE IF NOT EXISTS `home_alarm_schedule` (
  `time_start` varchar(20) NOT NULL,
  `time_end` varchar(20) NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `home_alarm_schedule`:
--

--
-- Dumping data for table `home_alarm_schedule`
--

INSERT INTO `home_alarm_schedule` (`time_start`, `time_end`, `creation_date`) VALUES
('00:00', '23:59', '2018-06-13 19:51:55');

-- --------------------------------------------------------

--
-- Table structure for table `home_alarm_state`
--

CREATE TABLE IF NOT EXISTS `home_alarm_state` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` varchar(20) NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `home_alarm_state`:
--

--
-- Dumping data for table `home_alarm_state`
--

INSERT INTO `home_alarm_state` (`id`, `state`, `creation_date`) VALUES
(1, '1', '2018-06-13 19:52:27');

-- --------------------------------------------------------

--
-- Table structure for table `home_light`
--

CREATE TABLE IF NOT EXISTS `home_light` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `zone` varchar(20) NOT NULL,
  `light` int(11) NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `zone` (`zone`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `home_light`:
--   `zone`
--       `home_zone` -> `zone`
--

--
-- Dumping data for table `home_light`
--

INSERT INTO `home_light` (`id`, `zone`, `light`, `creation_date`) VALUES
(1, 'A', 0, '2018-06-13 14:52:13'),
(2, 'B', 0, '2018-06-13 14:52:13'),
(3, 'C', 0, '2018-06-13 14:52:13'),
(4, 'D', 0, '2018-06-13 14:52:13'),
(5, 'E', 0, '2018-06-13 14:52:13'),
(6, 'F', 0, '2018-06-13 14:52:13'),
(7, 'G', 0, '2018-06-13 14:52:13'),
(8, 'H', 0, '2018-06-13 14:52:13'),
(9, 'I', 0, '2018-06-13 14:52:13'),
(10, 'J', 0, '2018-06-13 14:52:13'),
(11, 'K', 0, '2018-06-13 14:52:13'),
(12, 'L', 0, '2018-06-13 14:52:13'),
(13, 'M', 0, '2018-06-13 14:52:13'),
(14, 'N', 0, '2018-06-13 14:52:13'),
(15, 'O', 0, '2018-06-13 14:52:13');

-- --------------------------------------------------------

--
-- Table structure for table `home_zone`
--

CREATE TABLE IF NOT EXISTS `home_zone` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `zone` varchar(20) NOT NULL,
  `description` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `zone` (`zone`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `home_zone`:
--

--
-- Dumping data for table `home_zone`
--

INSERT INTO `home_zone` (`id`, `zone`, `description`) VALUES
(1, 'A', 'Salon'),
(2, 'B', 'Toilettes invités'),
(3, 'C', 'Garde-manger'),
(4, 'D', 'Cuisine'),
(5, 'E', 'Hall principal'),
(6, 'F', 'Garage'),
(7, 'G', 'Chambre couloir'),
(8, 'H', 'Chambre enfant'),
(9, 'I', 'Salle de bain'),
(10, 'J', 'Chambre simple'),
(11, 'K', 'Salle de bain Privée'),
(12, 'L', 'Chambre parentale'),
(13, 'M', 'Buanderie'),
(14, 'N', 'Bureau'),
(15, 'O', 'Extérieur');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `home_light`
--
ALTER TABLE `home_light`
  ADD CONSTRAINT `home_light_ibfk_1` FOREIGN KEY (`zone`) REFERENCES `home_zone` (`zone`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
