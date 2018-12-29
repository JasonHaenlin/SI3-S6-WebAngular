-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 15, 2018 at 05:59 PM
-- Server version: 5.7.19-0ubuntu0.16.04.1
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mqttTest`
--
CREATE DATABASE IF NOT EXISTS `mqttTest` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `mqttTest`;

-- --------------------------------------------------------
 
--
-- Table structure for table `test1`
--

CREATE TABLE `test1` (
  `idData` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(11) NOT NULL,
  `text` varchar(50) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(`idData`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

