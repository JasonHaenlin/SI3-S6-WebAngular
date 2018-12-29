-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 18, 2018 at 06:56 AM
-- Server version: 5.7.21-0ubuntu0.16.04.1
-- PHP Version: 7.0.25-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `WebIncident`
--
DROP DATABASE IF EXISTS `WebIncident`;
CREATE DATABASE `WebIncident` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `WebIncident`;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `mot_de_passe` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `attribution_incident`
--

CREATE TABLE `attribution_incident` (
  `id_partage` int(11) NOT NULL,
  `id_destinataire` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `attribution_notification`
--

CREATE TABLE `attribution_notification` (
  `id_notification` int(11) NOT NULL,
  `id_destinataire` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `avancement`
--

CREATE TABLE `avancement` (
  `id_avancement` int(11) NOT NULL,
  `etat` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `criticite`
--

CREATE TABLE `criticite` (
  `id_criticite` int(11) NOT NULL,
  `ampleur` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `incident`
--

CREATE TABLE `incident` (
  `id_incident` int(11) NOT NULL,
  `date` datetime(6) DEFAULT NULL,
  `id_auteur` int(11) NOT NULL,
  `declaration` varchar(200) NOT NULL,
  `id_criticite` int(11) NOT NULL DEFAULT '1',
  `id_localisation` int(11) NOT NULL DEFAULT '1',
  `id_avancement` int(11) NOT NULL DEFAULT '1',
  `date_de_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `localisation`
--

CREATE TABLE `localisation` (
  `id_localisation` int(11) NOT NULL,
  `lieu` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id_notification` int(11) NOT NULL,
  `id_incident` int(11) NOT NULL,
  `id_auteur` int(11) NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id_utilisateur` int(11) NOT NULL,
  `nom` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD KEY `id_admin` (`id_admin`);

--
-- Indexes for table `attribution_incident`
--
ALTER TABLE `attribution_incident`
  ADD PRIMARY KEY (`id_partage`,`id_destinataire`),
  ADD KEY `id_destinataire` (`id_destinataire`);

--
-- Indexes for table `attribution_notification`
--
ALTER TABLE `attribution_notification`
  ADD PRIMARY KEY (`id_notification`,`id_destinataire`),
  ADD KEY `id_destinataire` (`id_destinataire`);

--
-- Indexes for table `avancement`
--
ALTER TABLE `avancement`
  ADD PRIMARY KEY (`id_avancement`),
  ADD UNIQUE KEY `etat` (`etat`);

--
-- Indexes for table `criticite`
--
ALTER TABLE `criticite`
  ADD PRIMARY KEY (`id_criticite`),
  ADD UNIQUE KEY `ampleur` (`ampleur`);

--
-- Indexes for table `incident`
--
ALTER TABLE `incident`
  ADD PRIMARY KEY (`id_incident`),
  ADD KEY `id_auteur` (`id_auteur`),
  ADD KEY `id_criticite` (`id_criticite`),
  ADD KEY `id_localisation` (`id_localisation`),
  ADD KEY `incident_ibfk_4` (`id_avancement`);

--
-- Indexes for table `localisation`
--
ALTER TABLE `localisation`
  ADD PRIMARY KEY (`id_localisation`),
  ADD UNIQUE KEY `lieu` (`lieu`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id_notification`,`id_incident`),
  ADD KEY `id_notification` (`id_notification`),
  ADD KEY `notification_ibfk_1` (`id_incident`),
  ADD KEY `notification_ibfk_2` (`id_auteur`);

--
-- Indexes for table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id_utilisateur`),
  ADD UNIQUE KEY `nom` (`nom`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `criticite`
--
ALTER TABLE `criticite`
  MODIFY `id_criticite` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `incident`
--
ALTER TABLE `incident`
  MODIFY `id_incident` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `localisation`
--
ALTER TABLE `localisation`
  MODIFY `id_localisation` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id_notification` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT;
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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
