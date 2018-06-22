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
-- Table `Movie`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Movie` ;
CREATE TABLE IF NOT EXISTS `Movie` (
	`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`Name` VARCHAR(32) NOT NULL,
	`Description` VARCHAR(256) NOT NULL,
	`AgeRating` INT NOT NULL,
	`Duration` INT NOT NULL,
	`PosterURL` VARCHAR(128) NOT NULL,
	PRIMARY KEY (`ID`)
);

INSERT INTO `Movie` (Name, Description, AgeRating, Duration, PosterURL) VALUES ('Star Wars: Episode VIII - The Last Jedi', 'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares for battle with the First Order.', 12, 152, 'https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SY1000_CR0,0,675,1000_AL_.jpg');

-- -----------------------------------------------------
-- Table `studentenhuis`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `studentenhuis` ;
CREATE TABLE IF NOT EXISTS `studentenhuis` (
	`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`Naam` VARCHAR(32) NOT NULL,
	`Adres` VARCHAR(32) DEFAULT 'hier het adres',
	`UserID` INT UNSIGNED NOT NULL,
	PRIMARY KEY (`ID`)
) 
ENGINE = InnoDB;

ALTER TABLE `studentenhuis` 
ADD CONSTRAINT `fk_studentenhuis_user`
FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`)
ON DELETE NO ACTION
ON UPDATE CASCADE;

-- Voorbeeld insert query. Wanneer je in Nodejs de ? variant gebruikt hoeven de '' niet om de waarden.
INSERT INTO `studentenhuis` (Naam, Adres, UserID) VALUES ('Lovensdijk', 'Lovensdijkstraat, Breda', 1);

-- -----------------------------------------------------
-- Table `maaltijd`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `maaltijd` ;
CREATE TABLE IF NOT EXISTS `maaltijd` (
	`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`Naam` VARCHAR(32) NOT NULL,
	`Beschrijving` VARCHAR(64) NOT NULL,
	`Ingredienten` VARCHAR(64) NOT NULL,
	`Allergie` VARCHAR(32) NOT NULL,
	`Prijs` INT UNSIGNED  NOT NULL,
	`UserID` INT UNSIGNED NOT NULL,
	`StudentenhuisID` INT UNSIGNED NOT NULL,
	PRIMARY KEY (`ID`)
) 
ENGINE = InnoDB;

ALTER TABLE `maaltijd` 
ADD CONSTRAINT `fk_maaltijd_user`
FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`)
ON DELETE NO ACTION
ON UPDATE CASCADE,
ADD CONSTRAINT `fk_maaltijd_studentenhuis`
FOREIGN KEY (`StudentenhuisID`) REFERENCES `studentenhuis` (`ID`)
ON DELETE NO ACTION
ON UPDATE CASCADE;

-- Voorbeeld insert query.
INSERT INTO `maaltijd` (Naam, Beschrijving, Ingredienten, Allergie, Prijs, UserID, StudentenhuisID) VALUES 
('Zuurkool met worst', 'Zuurkool a la Montizaan, specialiteit van het huis.', 'Zuurkool, worst, spekjes', 'Lactose, gluten', 5, 1, 1);

-- -----------------------------------------------------
-- Table `deelnemers`
-- Bevat de users die deelnemen aan een maaltijd in een studentenhuis.
-- 
-- -----------------------------------------------------
DROP TABLE IF EXISTS `deelnemers` ;
CREATE TABLE IF NOT EXISTS `deelnemers` (
	`UserID` INT UNSIGNED NOT NULL,
	`StudentenhuisID` INT UNSIGNED NOT NULL,
	`MaaltijdID` INT UNSIGNED NOT NULL,
	PRIMARY KEY (`UserID`, `StudentenhuisID`, `MaaltijdID`)
) 
ENGINE = InnoDB;

ALTER TABLE `deelnemers` 
ADD CONSTRAINT `fk_deelnemers_user`
FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`)
ON DELETE NO ACTION
ON UPDATE CASCADE,
ADD CONSTRAINT `fk_deelnemers_studentenhuis`
FOREIGN KEY (`StudentenhuisID`) REFERENCES `studentenhuis` (`ID`)
ON DELETE NO ACTION
ON UPDATE CASCADE,
ADD CONSTRAINT `fk_deelnemers_maaltijd`
FOREIGN KEY (`MaaltijdID`) REFERENCES `maaltijd` (`ID`)
ON DELETE NO ACTION
ON UPDATE CASCADE;

-- Voorbeeld insert query.
-- Let op: je kunt je maar één keer aanmelden voor een maaltijd in een huis.
-- Je kunt je natuurlijk wel afmelden en opnieuw aanmelden. .
INSERT INTO `deelnemers` (UserID, StudentenhuisID, MaaltijdID) VALUES (1, 1, 1);
-- Voorbeeld van afmelden:
DELETE FROM `deelnemers` WHERE UserID = 1 AND StudentenhuisID = 1 AND MaaltijdID = 1;
-- En opnieuw aanmelden:
INSERT INTO `deelnemers` (UserID, StudentenhuisID, MaaltijdID) VALUES (1, 1, 1);

-- -----------------------------------------------------
-- View om deelnemers bij een maaltijd in een studentenhuis in te zien.
-- 
-- -----------------------------------------------------
CREATE OR REPLACE VIEW `view_studentenhuis` AS 
SELECT 
	`studentenhuis`.`ID`,
	`studentenhuis`.`Naam`,
	`studentenhuis`.`Adres`,
	CONCAT(`user`.`Voornaam`, ' ', `user`.`Achternaam`) AS `Contact`,
	`user`.`Email`
FROM `studentenhuis`
LEFT JOIN `user` ON `studentenhuis`.`UserID` = `user`.`ID`;

SELECT * FROM `view_studentenhuis`;

-- -----------------------------------------------------
-- View om deelnemers bij een maaltijd in een studentenhuis in te zien.
-- -----------------------------------------------------
CREATE OR REPLACE VIEW `view_deelnemers` AS 
SELECT 
	`deelnemers`.`StudentenhuisID`,
	`deelnemers`.`MaaltijdID`,
	`user`.`Voornaam`,
	`user`.`Achternaam`,
	`user`.`Email`
FROM `deelnemers`
LEFT JOIN `user` ON `deelnemers`.`UserID` = `user`.`ID`;

-- Voorbeeldquery.
SELECT * from `view_deelnemers` WHERE StudentenhuisID = 1 AND MaaltijdID = 1; 

