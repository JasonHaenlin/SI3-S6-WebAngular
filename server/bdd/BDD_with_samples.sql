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

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `mot_de_passe`) VALUES
(1, 'root');

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

CREATE TABLE `criticite` (
  `id_criticite` int(11) NOT NULL,
  `ampleur` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `criticite`
--

INSERT INTO `criticite` (`id_criticite`, `ampleur`) VALUES
(1, 'Faible'),
(2, 'Moyen'),
(3, 'Grave'),
(4, 'Critique');

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

--
-- Dumping data for table `incident`
--

INSERT INTO `incident` (`id_incident`, `date`, `id_auteur`, `declaration`, `id_criticite`, `id_localisation`, `id_avancement`, `date_de_creation`) VALUES
(1, '2018-03-13 10:50:00.000000', 2, 'plus de piles', 2, 1, 1, '2018-03-18 10:55:17'),
(2, '2018-03-14 10:50:00.000000', 2, 'Plus de papier toilette!', 2, 1, 2, '2018-03-17 22:30:14'),
(3, '2018-03-14 15:45:00.000000', 2, 'Besoin de paracétamol', 3, 1, 2, '2018-03-17 22:21:30'),
(4, '2018-03-15 09:45:00.000000', 5, 'J\'ai perdu mon Hamster ><', 4, 2, 3, '2018-03-17 22:21:30'),
(5, '2018-03-18 10:50:00.000000', 5, 'J\'ai perdu mon serpent (oops)', 1, 1, 2, '2018-03-18 06:56:03'),
(6, '2018-03-19 12:29:00.000000', 5, 'faim!', 4, 3, 3, '2018-03-18 06:56:17'),
(7, '2018-03-20 12:40:00.000000', 3, 'Un arbre est tombé dans le jardin', 4, 7, 3, '2018-03-18 06:56:17'),
(8, '2018-03-20 12:40:00.000000', 3, 'Tondre de la pelouse', 4, 7, 3, '2018-03-18 06:56:17'),
(9, '2018-03-25 15:39:00.000000', 3, 'La chat n\'a plus rien à manger', 1, 2, 1, '2018-03-19 23:56:17'),
(10, '2018-04-01 15:39:00.000000', 2, 'Une ampoule est cassé', 1, 8, 4, '2018-03-15 08:45:22'),
(11, '2018-04-01 15:39:00.000000', 4, 'La pluie a inondé la terrasse!', 4, 8, 2, '2018-03-19 15:20:31'),
(12, '2018-04-05 15:39:00.000000', 4, 'J\'ai oublier de fermer le chauffage, désolé><', 2, 5, 2, '2018-04-22 22:01:15'),
(13, '2018-04-07 15:39:00.000000', 7, 'Votre colis est arrivé hier matin', 2, 5, 2, '2018-04-27 22:01:15'),
(14, '2018-04-08 15:39:00.000000', 4, 'Terrasse a nettoyer', 2, 5, 2, '2018-04-27 22:01:15'),
(15, '2018-04-09 15:39:00.000000', 4, 'Trou dans le mur a cacher', 2, 5, 2, '2018-04-27 22:01:15'),
(16, '2018-04-09 15:39:00.000000', 8, 'Je vais venir a 20h', 2, 5, 2, '2018-04-27 22:01:15');





-- --------------------------------------------------------

--
-- Table structure for table `localisation`
--

CREATE TABLE `localisation` (
  `id_localisation` int(11) NOT NULL,
  `lieu` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `localisation`
--

INSERT INTO `localisation` (`id_localisation`, `lieu`) VALUES
(1, 'Autres'),
(2, 'Chambre'),
(3, 'Cuisine'),
(4, 'Garage'),
(5, 'Salle de bain'),
(6, 'Grenier'),
(7, 'Jardin'),
(8, 'Cave'),
(9, 'Parking'),
(10, 'Piscine'),
(11, 'Terrasse');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id_notification` int(11) NOT NULL,
  `id_incident` int(11) NOT NULL,
  `id_auteur` int(11) NOT NULL,
  `description` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id_notification`,`id_incident`,`id_auteur`,`description`) VALUES
(1,1,1,'Je vais acheter des pîles sur le chemin'),
(2,1,1,'J\'ai pris une bonne quantité de piles'),
(1,2,2,'Je ferais les courses demain matin'),
(1,3,2,'J\'irais à la pharmacie demain matin'),
(1,7,3,'Je me débrouille pour remettre en état le jardin'),
(1,8,3,'Je tond la pelouse demain car il pleut toute la journée');

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id_utilisateur` int(11) NOT NULL,
  `nom` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`id_utilisateur`, `nom`) VALUES
(1, 'admin'), -- admin papa
(2, 'Bob'), -- admin papa
(3, 'Sophie'), -- admin maman
(4, 'Sylvain'), -- admin gardien
(5, 'Claire'), -- fille
(6, 'Jeanne'), -- colocataire
(7, 'Concierge'), -- concierge
(8, 'Grand mère'); -- Grand mère



--
-- Indexes for dumped tables
--

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
  MODIFY `id_criticite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `incident`
--
ALTER TABLE `incident`
  MODIFY `id_incident` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `localisation`
--
ALTER TABLE `localisation`
  MODIFY `id_localisation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id_notification` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
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
