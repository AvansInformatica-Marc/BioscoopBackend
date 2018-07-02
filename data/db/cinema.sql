DROP DATABASE IF EXISTS `Cinema`;
CREATE DATABASE `Cinema`;
USE `Cinema`;

-- Create users
CREATE USER 'mijnbios'@'%' IDENTIFIED BY 'mijnbiosapp';
CREATE USER 'mijnbios'@'localhost' IDENTIFIED BY 'mijnbiosapp';

-- Give user full rights
GRANT SELECT, INSERT, DELETE, UPDATE ON `Cinema`.* TO 'mijnbios'@'%';
GRANT SELECT, INSERT, DELETE, UPDATE ON `Cinema`.* TO 'mijnbios'@'localhost';

-- -----------------------------------------------------
-- Table `Cinema`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Cinema` ;
CREATE TABLE IF NOT EXISTS `Cinema` (
	`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`City` VARCHAR(32) NOT NULL,
	`Street` VARCHAR(32) NOT NULL,
	`PostalCode` VARCHAR(10) NOT NULL,
	`Number` VARCHAR(32) NOT NULL,
	`PhoneNumber` VARCHAR(32) NOT NULL,
	`Email` VARCHAR(32) NOT NULL,
	PRIMARY KEY (`ID`)
);

INSERT INTO `Cinema` 
	(City, Street, PostalCode, Number, PhoneNumber, Email) 
VALUES 
	("Sliedrecht", "Deltalaan", "3363AG", "217", "+31 (184) 123456", "sld@mijnbios.nl"),
    ("Dordrecht", "Johan de Wittstraat", "3311KG", "15", "+31 (78) 1234567", "ddr@mijnbios.nl");

-- -----------------------------------------------------
-- Table `Hall`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Hall` ;
CREATE TABLE IF NOT EXISTS `Hall` (
	`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`CinemaID` INT UNSIGNED NOT NULL,
	`Name` VARCHAR(32) DEFAULT 'hier het adres',
	`SeatsHorizontal` INT UNSIGNED NOT NULL,
	`SeatsVertical` INT UNSIGNED NOT NULL,
	PRIMARY KEY (`ID`)
);

ALTER TABLE `Hall` 
ADD CONSTRAINT `FK_Hall_Cinema`
FOREIGN KEY (`CinemaID`) REFERENCES `Cinema` (`ID`)
ON DELETE NO ACTION
ON UPDATE CASCADE;

INSERT INTO `Hall` 
	(CinemaID, Name, SeatsHorizontal, SeatsVertical) 
VALUES 
	(1, "1", 4, 6),
    (2, "1A", 6, 8),
    (2, "1B", 6, 8),
    (2, "2", 8, 12);
    
    
-- -----------------------------------------------------
-- Table `Show`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Show` ;
CREATE TABLE IF NOT EXISTS `Show` (
	`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`HallID` INT UNSIGNED NOT NULL,
	`MovieID` INT NOT NULL,
	`DateTime` VARCHAR(24) NOT NULL,
	`SeatsTaken` INT NOT NULL DEFAULT 0,
	PRIMARY KEY (`ID`)
);

ALTER TABLE `Show` 
ADD CONSTRAINT `FK_Show_Hall`
FOREIGN KEY (`HallID`) REFERENCES `Hall` (`ID`)
ON DELETE NO ACTION
ON UPDATE CASCADE;

INSERT INTO `Show` 
	(HallID, MovieID, DateTime, SeatsTaken) 
VALUES 
	(1, 157336, '2018-07-02T20:00:00Z', 4),
    (3, 181808, '2018-07-02T20:30:00Z', 13),
    (3, 206647, '2018-07-02T23:30:00Z', 13),
    (2, 49047, '2018-07-08T21:30:00Z', 13),
    (2, 286217, '2018-07-09T20:30:00Z', 13),
    (3, 337339, '2018-07-09T20:30:00Z', 13),
    (1, 181808, '2018-07-10T20:00:00Z', 13),
    (4, 181808, '2018-07-10T20:00:00Z', 13),
    (1, 135397, '2018-07-11T20:00:00Z', 13),
    (2, 348350, '2018-07-12T09:30:00Z', 13),
    (3, 568, '2018-07-12T18:45:00Z', 13);