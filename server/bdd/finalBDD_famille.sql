-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 12, 2018 at 03:16 AM
-- Server version: 5.7.22-0ubuntu0.16.04.1
-- PHP Version: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ps6_web`
--
DROP DATABASE IF EXISTS `ps6_web`;
CREATE DATABASE `ps6_web` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `ps6_web`;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--
-- Creation: Jun 10, 2018 at 09:47 AM
-- Last update: Jun 11, 2018 at 09:18 AM
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id_admin` int(11) NOT NULL,
  `mot_de_passe` varchar(20) DEFAULT NULL,
  KEY `id_admin` (`id_admin`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `admin`:
--   `id_admin`
--       `utilisateur` -> `id_utilisateur`
--

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `mot_de_passe`) VALUES
(1, 'root'),
(2, 'root'),
(54, 'root');

-- --------------------------------------------------------

--
-- Table structure for table `attribution_incident`
--
-- Creation: May 27, 2018 at 08:37 AM
--

CREATE TABLE IF NOT EXISTS `attribution_incident` (
  `id_partage` int(11) NOT NULL,
  `id_destinataire` int(11) NOT NULL,
  PRIMARY KEY (`id_partage`,`id_destinataire`),
  KEY `id_destinataire` (`id_destinataire`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `attribution_incident`:
--   `id_destinataire`
--       `utilisateur` -> `id_utilisateur`
--   `id_partage`
--       `incident` -> `id_incident`
--

-- --------------------------------------------------------

--
-- Table structure for table `attribution_notification`
--
-- Creation: May 27, 2018 at 08:37 AM
-- Last update: Jun 11, 2018 at 09:21 AM
--

CREATE TABLE IF NOT EXISTS `attribution_notification` (
  `id_notification` int(11) NOT NULL,
  `id_destinataire` int(11) NOT NULL,
  PRIMARY KEY (`id_notification`,`id_destinataire`),
  KEY `id_destinataire` (`id_destinataire`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `attribution_notification`:
--   `id_destinataire`
--       `utilisateur` -> `id_utilisateur`
--   `id_notification`
--       `notification` -> `id_notification`
--
-- --------------------------------------------------------

--
-- Table structure for table `avancement`
--
-- Creation: May 27, 2018 at 08:37 AM
--

CREATE TABLE IF NOT EXISTS `avancement` (
  `id_avancement` int(11) NOT NULL,
  `etat` varchar(20) NOT NULL,
  PRIMARY KEY (`id_avancement`),
  UNIQUE KEY `etat` (`etat`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `avancement`:
--

--
-- Dumping data for table `avancement`
--

INSERT INTO `avancement` (`id_avancement`, `etat`) VALUES
(5, 'Annulé'),
(1, 'En attente'),
(3, 'En cours'),
(2, 'Pris en compte'),
(4, 'Terminé');

-- --------------------------------------------------------

--
-- Table structure for table `avatars`
--
-- Creation: May 27, 2018 at 08:37 AM
--

CREATE TABLE IF NOT EXISTS `avatars` (
  `id_image` int(10) NOT NULL AUTO_INCREMENT,
  `image_file` varchar(200) NOT NULL,
  PRIMARY KEY (`id_image`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `avatars`:
--

--
-- Dumping data for table `avatars`
--

INSERT INTO `avatars` (`id_image`, `image_file`) VALUES
(1, '/img/avatars/default/adults/businessman.png'),
(2, '/img/avatars/default/adults/businesswoman.png'),
(3, '/img/avatars/default/adults/man-1.png'),
(4, '/img/avatars/default/adults/man-2.png'),
(5, '/img/avatars/default/adults/man-3.png'),
(6, '/img/avatars/default/adults/man-4.png'),
(7, '/img/avatars/default/adults/man-5.png'),
(8, '/img/avatars/default/adults/man-6.png'),
(9, '/img/avatars/default/adults/man-7.png'),
(10, '/img/avatars/default/adults/man-8.png'),
(11, '/img/avatars/default/adults/man-9.png'),
(12, '/img/avatars/default/adults/man-10.png'),
(13, '/img/avatars/default/adults/man-11.png'),
(14, '/img/avatars/default/adults/man-12.png'),
(15, '/img/avatars/default/adults/man-13.png'),
(16, '/img/avatars/default/adults/man-14.png'),
(17, '/img/avatars/default/adults/man-15.png'),
(18, '/img/avatars/default/adults/man-16.png'),
(19, '/img/avatars/default/adults/man-17.png'),
(20, '/img/avatars/default/adults/man-18.png'),
(21, '/img/avatars/default/adults/man-19.png'),
(22, '/img/avatars/default/adults/man-20.png'),
(23, '/img/avatars/default/adults/man-21.png'),
(24, '/img/avatars/default/adults/man-22.png'),
(25, '/img/avatars/default/adults/man-23.png'),
(26, '/img/avatars/default/adults/man-24.png'),
(27, '/img/avatars/default/adults/man-25.png'),
(28, '/img/avatars/default/adults/man-26.png'),
(29, '/img/avatars/default/adults/man-27.png'),
(30, '/img/avatars/default/adults/man-28.png'),
(31, '/img/avatars/default/adults/man-29.png'),
(32, '/img/avatars/default/adults/man-30.png'),
(33, '/img/avatars/default/adults/man-31.png'),
(34, '/img/avatars/default/adults/man-32.png'),
(35, '/img/avatars/default/adults/man-33.png'),
(36, '/img/avatars/default/adults/man-34.png'),
(37, '/img/avatars/default/adults/man.png'),
(38, '/img/avatars/default/adults/woman-1.png'),
(39, '/img/avatars/default/adults/woman-2.png'),
(40, '/img/avatars/default/adults/woman-3.png'),
(41, '/img/avatars/default/adults/woman-4.png'),
(42, '/img/avatars/default/adults/woman-5.png'),
(43, '/img/avatars/default/adults/woman-6.png'),
(44, '/img/avatars/default/adults/woman-7.png'),
(45, '/img/avatars/default/adults/woman-8.png'),
(46, '/img/avatars/default/adults/woman-9.png'),
(47, '/img/avatars/default/adults/woman-10.png'),
(48, '/img/avatars/default/adults/woman-11.png'),
(49, '/img/avatars/default/adults/woman-12.png'),
(50, '/img/avatars/default/adults/woman.png'),
(51, '/img/avatars/default/kids/boy.png'),
(52, '/img/avatars/default/kids/boy-1.png'),
(53, '/img/avatars/default/kids/boy-2.png'),
(54, '/img/avatars/default/kids/boy-3.png'),
(55, '/img/avatars/default/kids/boy-4.png'),
(56, '/img/avatars/default/kids/boy-5.png'),
(57, '/img/avatars/default/kids/boy-6.png'),
(58, '/img/avatars/default/kids/boy-7.png'),
(59, '/img/avatars/default/kids/boy-8.png'),
(60, '/img/avatars/default/kids/boy-9.png'),
(61, '/img/avatars/default/kids/boy-10.png'),
(62, '/img/avatars/default/kids/boy-11.png'),
(63, '/img/avatars/default/kids/boy-12.png'),
(64, '/img/avatars/default/kids/boy-13.png'),
(65, '/img/avatars/default/kids/boy-14.png'),
(66, '/img/avatars/default/kids/boy-15.png'),
(67, '/img/avatars/default/kids/boy-16.png'),
(68, '/img/avatars/default/kids/boy-17.png'),
(69, '/img/avatars/default/kids/boy-18.png'),
(70, '/img/avatars/default/kids/boy-19.png'),
(71, '/img/avatars/default/kids/boy-20.png'),
(72, '/img/avatars/default/kids/boy-21.png'),
(73, '/img/avatars/default/kids/boy-22.png'),
(74, '/img/avatars/default/kids/girl.png'),
(75, '/img/avatars/default/kids/girl-1.png'),
(76, '/img/avatars/default/kids/girl-2.png'),
(77, '/img/avatars/default/kids/girl-3.png'),
(78, '/img/avatars/default/kids/girl-4.png'),
(79, '/img/avatars/default/kids/girl-5.png'),
(80, '/img/avatars/default/kids/girl-6.png'),
(81, '/img/avatars/default/kids/girl-7.png'),
(82, '/img/avatars/default/kids/girl-8.png'),
(83, '/img/avatars/default/kids/girl-9.png'),
(84, '/img/avatars/default/kids/girl-10.png'),
(85, '/img/avatars/default/kids/girl-11.png'),
(86, '/img/avatars/default/kids/girl-12.png'),
(87, '/img/avatars/default/kids/girl-13.png'),
(88, '/img/avatars/default/kids/girl-14.png'),
(89, '/img/avatars/default/kids/girl-15.png'),
(90, '/img/avatars/default/kids/girl-16.png'),
(91, '/img/avatars/default/kids/girl-17.png'),
(92, '/img/avatars/default/kids/girl-18.png'),
(93, '/img/avatars/default/kids/girl-19.png'),
(94, '/img/avatars/default/kids/girl-20.png'),
(95, '/img/avatars/default/kids/girl-21.png'),
(96, '/img/avatars/default/kids/girl-22.png'),
(97, '/img/avatars/default/kids/girl-23.png'),
(98, '/img/avatars/default/kids/girl-24.png'),
(99, '/img/avatars/default/kids/girl-25.png'),
(100, '/img/avatars/default/kids/girl-26.png'),
(101, '/img/avatars/users/2016-07-28-1469685942-7343603-smarthome-thumb.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `criticite`
--
-- Creation: May 27, 2018 at 08:37 AM
--

CREATE TABLE IF NOT EXISTS `criticite` (
  `id_criticite` int(11) NOT NULL AUTO_INCREMENT,
  `ampleur` varchar(20) NOT NULL,
  PRIMARY KEY (`id_criticite`),
  UNIQUE KEY `ampleur` (`ampleur`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `criticite`:
--

--
-- Dumping data for table `criticite`
--

INSERT INTO `criticite` (`id_criticite`, `ampleur`) VALUES
(4, 'Critique'),
(1, 'Faible'),
(3, 'Grave'),
(2, 'Moyen');

-- --------------------------------------------------------

--
-- Table structure for table `incident`
--
-- Creation: Jun 09, 2018 at 09:08 AM
-- Last update: Jun 11, 2018 at 09:21 AM
--

CREATE TABLE IF NOT EXISTS `incident` (
  `id_incident` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime(6) NOT NULL,
  `id_auteur` int(11) NOT NULL,
  `declaration` varchar(200) NOT NULL,
  `id_criticite` int(11) NOT NULL DEFAULT '1',
  `id_localisation` int(11) NOT NULL DEFAULT '1',
  `id_avancement` int(11) NOT NULL DEFAULT '1',
  `date_de_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_incident`),
  KEY `id_auteur` (`id_auteur`),
  KEY `id_criticite` (`id_criticite`),
  KEY `id_localisation` (`id_localisation`),
  KEY `incident_ibfk_4` (`id_avancement`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `incident`:
--   `id_auteur`
--       `utilisateur` -> `id_utilisateur`
--   `id_criticite`
--       `criticite` -> `id_criticite`
--   `id_localisation`
--       `localisation` -> `id_localisation`
--   `id_avancement`
--       `avancement` -> `id_avancement`
--

--
-- Dumping data for table `incident`
--

INSERT INTO `incident` (`id_incident`, `date`, `id_auteur`, `declaration`, `id_criticite`, `id_localisation`, `id_avancement`, `date_de_creation`) VALUES
(11, '2018-06-10 12:29:24.485218', 4, 'Le grillage du jardin est cassé', 3, 7, 1, '2018-06-11 09:19:44'),
(12, '2018-06-06 16:28:13.819257', 2, 'Ramasser les poubelles du jardin', 3, 7, 1, '2018-06-10 13:36:23'),
(13, '2018-06-04 09:24:24.408405', 1, 'Faire rentrer le linge car il va pleuvoir !', 3, 7, 2, '2018-06-10 13:37:31'),
(14, '2018-06-06 16:28:13.820000', 2, 'Rangez vos chambres !', 1, 2, 2, '2018-06-10 13:44:48'),
(15, '2018-05-10 12:29:24.485218', 51, 'Je veux manger ! ', 3, 3, 3, '2018-06-10 13:44:56'),
(17, '2018-06-03 00:00:00.000000', 1, 'N\'oubliez pas d’éteindre le chauffage', 2, 1, 1, '2018-06-10 13:43:24'),
(18, '2018-06-10 12:39:24.485218', 8, 'Rangez vos jouets du jardin avant ma venue pour que je puisse faire mon travail', 3, 7, 1, '2018-06-10 21:45:40'),
(19, '2018-10-06 16:28:13.819257', 48, 'Besoin d\'aide pour mes maths !', 3, 1, 4, '2018-06-11 09:21:19');

-- --------------------------------------------------------

--
-- Table structure for table `localisation`
--
-- Creation: May 27, 2018 at 08:37 AM
--

CREATE TABLE IF NOT EXISTS `localisation` (
  `id_localisation` int(11) NOT NULL AUTO_INCREMENT,
  `lieu` varchar(20) NOT NULL,
  PRIMARY KEY (`id_localisation`),
  UNIQUE KEY `lieu` (`lieu`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `localisation`:
--

--
-- Dumping data for table `localisation`
--

INSERT INTO `localisation` (`id_localisation`, `lieu`) VALUES
(1, 'Autres'),
(8, 'Cave'),
(2, 'Chambre'),
(3, 'Cuisine'),
(4, 'Garage'),
(6, 'Grenier'),
(7, 'Jardin'),
(9, 'Parking'),
(10, 'Piscine'),
(5, 'Salle de bain'),
(11, 'Terrasse');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--
-- Creation: May 27, 2018 at 08:37 AM
-- Last update: Jun 11, 2018 at 09:21 AM
--

CREATE TABLE IF NOT EXISTS `notification` (
  `id_notification` int(11) NOT NULL AUTO_INCREMENT,
  `id_incident` int(11) NOT NULL,
  `id_auteur` int(11) NOT NULL,
  `description` varchar(150) NOT NULL,
  PRIMARY KEY (`id_notification`,`id_incident`),
  KEY `id_notification` (`id_notification`),
  KEY `notification_ibfk_1` (`id_incident`),
  KEY `notification_ibfk_2` (`id_auteur`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `notification`:
--   `id_incident`
--       `incident` -> `id_incident`
--   `id_auteur`
--       `utilisateur` -> `id_utilisateur`
--

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id_notification`, `id_incident`, `id_auteur`, `description`) VALUES
(41, 11, 54, 'tu peux le faire ?'),
(42, 19, 54, 'je m\'en occupe');

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--
-- Creation: May 27, 2018 at 08:37 AM
-- Last update: Jun 11, 2018 at 09:18 AM
--

CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(20) NOT NULL,
  `id_avatar` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_utilisateur`),
  UNIQUE KEY `nom` (`nom`),
  KEY `utilisateur_ibfk_1` (`id_avatar`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `utilisateur`:
--   `id_avatar`
--       `avatars` -> `id_image`
--

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`id_utilisateur`, `nom`, `id_avatar`) VALUES
(1, 'Paul', 34),
(2, 'Marie', 46),
(4, 'Marc', 67),
(8, 'Fred', 28),
(48, 'Samia', 82),
(51, 'Kirikou', 73),
(54, 'jeanne', 38),
(3, 'smartHome', 101);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `utilisateur` (`id_utilisateur`);

--
-- Constraints for table `attribution_incident`
--
ALTER TABLE `attribution_incident`
  ADD CONSTRAINT `attribution_incident_ibfk_1` FOREIGN KEY (`id_destinataire`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `attribution_incident_ibfk_2` FOREIGN KEY (`id_partage`) REFERENCES `incident` (`id_incident`);

--
-- Constraints for table `attribution_notification`
--
ALTER TABLE `attribution_notification`
  ADD CONSTRAINT `attribution_notification_ibfk_1` FOREIGN KEY (`id_destinataire`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `attribution_notification_ibfk_2` FOREIGN KEY (`id_notification`) REFERENCES `notification` (`id_notification`);

--
-- Constraints for table `incident`
--
ALTER TABLE `incident`
  ADD CONSTRAINT `incident_ibfk_1` FOREIGN KEY (`id_auteur`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `incident_ibfk_2` FOREIGN KEY (`id_criticite`) REFERENCES `criticite` (`id_criticite`),
  ADD CONSTRAINT `incident_ibfk_3` FOREIGN KEY (`id_localisation`) REFERENCES `localisation` (`id_localisation`),
  ADD CONSTRAINT `incident_ibfk_4` FOREIGN KEY (`id_avancement`) REFERENCES `avancement` (`id_avancement`);

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`id_incident`) REFERENCES `incident` (`id_incident`),
  ADD CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`id_auteur`) REFERENCES `utilisateur` (`id_utilisateur`);

--
-- Constraints for table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`id_avatar`) REFERENCES `avatars` (`id_image`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
