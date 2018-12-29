-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 14, 2018 at 10:39 AM
-- Server version: 5.7.21-0ubuntu0.16.04.1
-- PHP Version: 7.0.28-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `WebIncident`
--
DROP DATABASE IF EXISTS `WebIncidentTest`;
CREATE DATABASE `WebIncidentTest` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `WebIncidentTest`;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id_admin` int(11) NOT NULL,
  `mot_de_passe` varchar(20) DEFAULT NULL,
  KEY `id_admin` (`id_admin`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `mot_de_passe`) VALUES
(1, 'root'),
(2, 'root'),
(3, 'root');

-- --------------------------------------------------------

--
-- Table structure for table `attribution_incident`
--

CREATE TABLE IF NOT EXISTS `attribution_incident` (
  `id_partage` int(11) NOT NULL,
  `id_destinataire` int(11) NOT NULL,
  PRIMARY KEY (`id_partage`,`id_destinataire`),
  KEY `id_destinataire` (`id_destinataire`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `attribution_notification`
--

CREATE TABLE IF NOT EXISTS `attribution_notification` (
  `id_notification` int(11) NOT NULL,
  `id_destinataire` int(11) NOT NULL,
  PRIMARY KEY (`id_notification`,`id_destinataire`),
  KEY `id_destinataire` (`id_destinataire`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `avancement`
--

CREATE TABLE IF NOT EXISTS `avancement` (
  `id_avancement` int(11) NOT NULL,
  `etat` varchar(20) NOT NULL,
  PRIMARY KEY (`id_avancement`),
  UNIQUE KEY `etat` (`etat`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Table structure for table `criticite`
--

CREATE TABLE IF NOT EXISTS `criticite` (
  `id_criticite` int(11) NOT NULL AUTO_INCREMENT,
  `ampleur` varchar(20) NOT NULL,
  PRIMARY KEY (`id_criticite`),
  UNIQUE KEY `ampleur` (`ampleur`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

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

CREATE TABLE IF NOT EXISTS `incident` (
  `id_incident` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime(6) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `incident`
--

INSERT INTO `incident` (`id_incident`, `date`, `id_auteur`, `declaration`, `id_criticite`, `id_localisation`, `id_avancement`, `date_de_creation`) VALUES
(1, '2018-03-17 10:50:00.000000', 2, 'plus de piles', 2, 1, 1, '2018-03-18 10:55:17'),
(2, '2018-03-17 10:50:00.000000', 2, 'Plus de papier toilette!', 2, 1, 2, '2018-03-17 22:30:14'),
(3, '2018-03-15 15:45:00.000000', 2, 'Besoin de paracétamol', 3, 1, 2, '2018-03-17 22:21:30'),
(4, '2018-03-16 09:45:00.000000', 4, 'J\'ai perdu mon Hamster ><', 4, 2, 3, '2018-03-17 22:21:30'),
(5, '2018-02-28 10:50:00.000000', 4, 'J\'ai perdu mon serpent (oops)', 1, 1, 2, '2018-03-18 06:56:03'),
(6, '2018-03-05 12:29:00.000000', 5, 'faim!', 4, 3, 3, '2018-03-18 06:56:17'),
(7, '2018-03-20 12:40:00.000000', 1, 'Un arbre est tombé dans le jardin', 4, 7, 3, '2018-03-18 06:56:17'),
(8, '2018-03-20 12:40:00.000000', 1, 'Tondre de la pelouse', 4, 7, 3, '2018-03-18 06:56:17'),
(9, '2018-03-25 15:39:00.000000', 3, 'La terrasse est sale', 1, 11, 1, '2018-03-18 06:56:17');

-- --------------------------------------------------------

--
-- Table structure for table `localisation`
--

CREATE TABLE IF NOT EXISTS `localisation` (
  `id_localisation` int(11) NOT NULL AUTO_INCREMENT,
  `lieu` varchar(20) NOT NULL,
  PRIMARY KEY (`id_localisation`),
  UNIQUE KEY `lieu` (`lieu`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

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

CREATE TABLE IF NOT EXISTS `notification` (
  `id_notification` int(11) NOT NULL AUTO_INCREMENT,
  `id_incident` int(11) NOT NULL,
  `id_auteur` int(11) NOT NULL,
  `description` varchar(50) NOT NULL,
  PRIMARY KEY (`id_notification`,`id_incident`),
  KEY `id_notification` (`id_notification`),
  KEY `notification_ibfk_1` (`id_incident`),
  KEY `notification_ibfk_2` (`id_auteur`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `avatars`
--

CREATE TABLE IF NOT EXISTS `avatars` (
  `id_image` int(10) NOT NULL AUTO_INCREMENT,
  `image_file` varchar(200) NOT NULL,
  PRIMARY KEY (`id_image`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `avatars`
--

INSERT INTO `avatars` (`id_image`, `image_file`) VALUES
(1,'/img/avatars/default/adults/businessman.png'),
(2,'/img/avatars/default/adults/businesswoman.png'),
(3,'/img/avatars/default/adults/man-1.png'),
(4,'/img/avatars/default/adults/man-2.png'),
(5,'/img/avatars/default/adults/man-3.png'),
(6,'/img/avatars/default/adults/man-4.png'),
(7,'/img/avatars/default/adults/man-5.png'),
(8,'/img/avatars/default/adults/man-6.png'),
(9,'/img/avatars/default/adults/man-7.png'),
(10,'/img/avatars/default/adults/man-8.png'),
(11,'/img/avatars/default/adults/man-9.png'),
(12,'/img/avatars/default/adults/man-10.png'),
(13,'/img/avatars/default/adults/man-11.png'),
(14,'/img/avatars/default/adults/man-12.png'),
(15,'/img/avatars/default/adults/man-13.png'),
(16,'/img/avatars/default/adults/man-14.png'),
(17,'/img/avatars/default/adults/man-15.png'),
(18,'/img/avatars/default/adults/man-16.png'),
(19,'/img/avatars/default/adults/man-17.png'),
(20,'/img/avatars/default/adults/man-18.png'),
(21,'/img/avatars/default/adults/man-19.png'),
(22,'/img/avatars/default/adults/man-20.png'),
(23,'/img/avatars/default/adults/man-21.png'),
(24,'/img/avatars/default/adults/man-22.png'),
(25,'/img/avatars/default/adults/man-23.png'),
(26,'/img/avatars/default/adults/man-24.png'),
(27,'/img/avatars/default/adults/man-25.png'),
(28,'/img/avatars/default/adults/man-26.png'),
(29,'/img/avatars/default/adults/man-27.png'),
(30,'/img/avatars/default/adults/man-28.png'),
(31,'/img/avatars/default/adults/man-29.png'),
(32,'/img/avatars/default/adults/man-30.png'),
(33,'/img/avatars/default/adults/man-31.png'),
(34,'/img/avatars/default/adults/man-32.png'),
(35,'/img/avatars/default/adults/man-33.png'),
(36,'/img/avatars/default/adults/man-34.png'),
(37,'/img/avatars/default/adults/man.png'),
(38,'/img/avatars/default/adults/woman-1.png'),
(39,'/img/avatars/default/adults/woman-2.png'),
(40,'/img/avatars/default/adults/woman-3.png'),
(41,'/img/avatars/default/adults/woman-4.png'),
(42,'/img/avatars/default/adults/woman-5.png'),
(43,'/img/avatars/default/adults/woman-6.png'),
(44,'/img/avatars/default/adults/woman-7.png'),
(45,'/img/avatars/default/adults/woman-8.png'),
(46,'/img/avatars/default/adults/woman-9.png'),
(47,'/img/avatars/default/adults/woman-10.png'),
(48,'/img/avatars/default/adults/woman-11.png'),
(49,'/img/avatars/default/adults/woman-12.png'),
(50,'/img/avatars/default/adults/woman.png'),
(51,'/img/avatars/default/kids/boy.png'),
(52,'/img/avatars/default/kids/boy-1.png'),
(53,'/img/avatars/default/kids/boy-2.png'),
(54,'/img/avatars/default/kids/boy-3.png'),
(55,'/img/avatars/default/kids/boy-4.png'),
(56,'/img/avatars/default/kids/boy-5.png'),
(57,'/img/avatars/default/kids/boy-6.png'),
(58,'/img/avatars/default/kids/boy-7.png'),
(59,'/img/avatars/default/kids/boy-8.png'),
(60,'/img/avatars/default/kids/boy-9.png'),
(61,'/img/avatars/default/kids/boy-10.png'),
(62,'/img/avatars/default/kids/boy-11.png'),
(63,'/img/avatars/default/kids/boy-12.png'),
(64,'/img/avatars/default/kids/boy-13.png'),
(65,'/img/avatars/default/kids/boy-14.png'),
(66,'/img/avatars/default/kids/boy-15.png'),
(67,'/img/avatars/default/kids/boy-16.png'),
(68,'/img/avatars/default/kids/boy-17.png'),
(69,'/img/avatars/default/kids/boy-18.png'),
(70,'/img/avatars/default/kids/boy-19.png'),
(71,'/img/avatars/default/kids/boy-20.png'),
(72,'/img/avatars/default/kids/boy-21.png'),
(73,'/img/avatars/default/kids/boy-22.png'),
(74,'/img/avatars/default/kids/girl.png'),
(75,'/img/avatars/default/kids/girl-1.png'),
(76,'/img/avatars/default/kids/girl-2.png'),
(77,'/img/avatars/default/kids/girl-3.png'),
(78,'/img/avatars/default/kids/girl-4.png'),
(79,'/img/avatars/default/kids/girl-5.png'),
(80,'/img/avatars/default/kids/girl-6.png'),
(81,'/img/avatars/default/kids/girl-7.png'),
(82,'/img/avatars/default/kids/girl-8.png'),
(83,'/img/avatars/default/kids/girl-9.png'),
(84,'/img/avatars/default/kids/girl-10.png'),
(85,'/img/avatars/default/kids/girl-11.png'),
(86,'/img/avatars/default/kids/girl-12.png'),
(87,'/img/avatars/default/kids/girl-13.png'),
(88,'/img/avatars/default/kids/girl-14.png'),
(89,'/img/avatars/default/kids/girl-15.png'),
(90,'/img/avatars/default/kids/girl-16.png'),
(91,'/img/avatars/default/kids/girl-17.png'),
(92,'/img/avatars/default/kids/girl-18.png'),
(93,'/img/avatars/default/kids/girl-19.png'),
(94,'/img/avatars/default/kids/girl-20.png'),
(95,'/img/avatars/default/kids/girl-21.png'),
(96,'/img/avatars/default/kids/girl-22.png'),
(97,'/img/avatars/default/kids/girl-23.png'),
(98,'/img/avatars/default/kids/girl-24.png'),
(99,'/img/avatars/default/kids/girl-25.png'),
(100,'/img/avatars/default/kids/girl-26.png');
-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(20) NOT NULL,
  `id_avatar` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_utilisateur`),
  UNIQUE KEY `nom` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`id_utilisateur`, `nom`, `id_avatar`) VALUES
(3, 'Claire', 4),
(4, 'Cloud', 1),
(5, 'Marc', 5),
(1, 'Paul', 3),
(2, 'Sophie', 2);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `utilisateur` (`id_utilisateur`);

--
-- Constraints for table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`id_avatar`) REFERENCES `avatars` (`id_image`);

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
