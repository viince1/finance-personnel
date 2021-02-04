-- Creation de la base de donnees
CREATE DATABASE ProjetFinEtude;

-- Utilisation de la base de donnees
USE ProjetFinEtude;

-- Creation des tables
CREATE TABLE Utilisateur(
    IdUtilisateur INT NOT NULL AUTO_INCREMENT,
    Nom VARCHAR(50) NOT NULL,
    Prenom VARCHAR(50) NOT NULL,
    Telephone VARCHAR(12) NOT NULL,
    Email VARCHAR(65) NOT NULL,
    PRIMARY KEY (IdUtilisateur)
);

CREATE TABLE ObjectifStatut(
    IdObjectifStatus INT NOT NULL AUTO_INCREMENT,
    Nom VARCHAR(30) NOT NULL,
    NoStatus INT NOT NULL,
    PRIMARY KEY (IdObjectifStatus)
);

CREATE TABLE Objectif(
  IdObjectif INT NOT NULL AUTO_INCREMENT,
  Titre VARCHAR(40),
  Description VARCHAR(200),
  DateButoir DATE,
  IdObjectifStatus INT NOT NULL,
  IdUtilisateur INT NOT NULL,
  PRIMARY KEY (IdObjectif),
  FOREIGN KEY (IdObjectifStatus) REFERENCES ObjectifStatut(IdObjectifStatus),
  FOREIGN KEY (IdUtilisateur) REFERENCES Utilisateur(IdUtilisateur)
);

CREATE TABLE Budget(
    IdBudget INT NOT NULL AUTO_INCREMENT,
    Nom VARCHAR(40) NOT NULL,
    IdUtilisateur INT NOT NULL,
    PRIMARY KEY (IdBudget),
    FOREIGN KEY (IdUtilisateur) REFERENCES Utilisateur(IdUtilisateur)
);

CREATE TABLE CategorieRevenu(
    IdCategorieRevenu INT NOT NULL AUTO_INCREMENT,
    Nom VARCHAR(40) NOT NULL,
    PRIMARY KEY (IdCategorieRevenu)
);


CREATE TABLE Revenu(
    IdRevenu INT NOT NULL AUTO_INCREMENT,
    Titre VARCHAR(40) NOT NULL,
    Montant DECIMAL(13,2) NOT NULL,
    IdCategorieRevenu INT NOT NULL,
    IdBudget INT NOT NULL,
    PRIMARY KEY (IdRevenu),
    FOREIGN KEY (IdCategorieRevenu) REFERENCES CategorieRevenu(IdCategorieRevenu),
    FOREIGN KEY (IdBudget) REFERENCES Budget(IdBudget)
);

CREATE TABLE CategorieDepense(
    IdCategorieDepense INT NOT NULL AUTO_INCREMENT,
    Nom VARCHAR(40) NOT NULL,
    PRIMARY KEY (IdCategorieDepense)
);

CREATE TABLE DepenseFrequence(
    IdDepenseFrequence INT NOT NULL AUTO_INCREMENT,
    Nom VARCHAR(30),
    PRIMARY KEY (IdDepenseFrequence)
);

CREATE TABLE Depense(
    IdDepense INT NOT NULL AUTO_INCREMENT,
    Titre VARCHAR(40) NOT NULL,
    Montant DECIMAL(13,2) NOT NULL,
    IdCategorieDepense INT NOT NULL,
    IdBudget INT NOT NULL,
    IdDepenseFrequence INT NOT NULL,
    PRIMARY KEY (IdDepense),
    FOREIGN KEY (IdCategorieDepense) REFERENCES CategorieDepense(IdCategorieDepense),
    FOREIGN KEY (IdBudget) REFERENCES Budget(IdBudget),
    FOREIGN KEY (IdDepenseFrequence) REFERENCES DepenseFrequence(IdDepenseFrequence)
);

CREATE TABLE TypeCompte(
    IdTypeCompte INT NOT NULL AUTO_INCREMENT,
    Nom VARCHAR(40) NOT NULL,
    Description VARCHAR(500) NOT NULL,
    PRIMARY KEY (IdTypeCompte)
);

CREATE TABLE Compte(
    IdCompte INT NOT NULL AUTO_INCREMENT,
    Nom VARCHAR(40) NOT NULL,
    Description VARCHAR(500) NOT NULL,
    IdType INT NOT NULL,
    IdUtilisateur INT NOT NULL,
    PRIMARY KEY (IdCompte),
    FOREIGN KEY (IdType) REFERENCES TypeCompte(IdTypeCompte),
    FOREIGN KEY (IdUtilisateur) REFERENCES Utilisateur(IdUtilisateur)
);

CREATE TABLE Portefeuille(
    IdPortefeuille INT NOT NULL AUTO_INCREMENT,
    Nom VARCHAR(40) NOT NULL,
    Description VARCHAR(200) NOT NULL,
    IdCompte INT NOT NULL,
    PRIMARY KEY (IdPortefeuille),
    FOREIGN KEY (IdCompte) REFERENCES Compte(IdCompte)
);

CREATE TABLE TitreBoursier(
    IdTitreBoursier INT NOT NULL AUTO_INCREMENT,
    TitreCours VARCHAR(10) NOT NULL,
    TitreLong VARCHAR(50),
    Poids DECIMAL(3,2) NOT NULL,
    Region VARCHAR(4) NOT NULL,
    Devise VARCHAR(4) NOT NULL,
    Bourse VARCHAR(10) NOT NULL,
    IdPortefeuille INT NOT NULL,
    PRIMARY KEY (IdTitreBoursier),
    FOREIGN KEY (IdPortefeuille) REFERENCES Portefeuille(IdPortefeuille)
);


CREATE TABLE OrdreAchat(
    IdOrdreAchat INT NOT NULL AUTO_INCREMENT,
    DateAcquisition DATE NOT NULL,
    Quantite INT NOT NULL,
    IdCompte INT NOT NULL,
    PRIMARY KEY (IdOrdreAchat),
    FOREIGN KEY (IdCompte) REFERENCES Compte(IdCompte)
);

CREATE TABLE RevenuSuivi(
    IdRevenuSuivi INT NOT NULL AUTO_INCREMENT,
    Montant DECIMAL (13,2),
    DateEntree DATE NOT NULL,
    IdRevenu INT NOT NULL,
    IdCompte INT NOT NULL ,
    Nom VARCHAR(60) NOT NULL,
    Description VARCHAR(150),
    PRIMARY KEY (IdRevenuSuivi),
    FOREIGN KEY (IdRevenu) REFERENCES Revenu(IdRevenu),
    FOREIGN KEY (IdCompte) REFERENCES Compte(IdCompte)
);

CREATE TABLE DepenseSuivi(
    IdDepenseSuivi INT NOT NULL AUTO_INCREMENT,
    Montant DECIMAL (13,2),
    DateEntree DATE NOT NULL,
    IdDepense INT NOT NULL,
    IdCompte INT NOT NULL ,
    Nom VARCHAR(60) NOT NULL,
    Description VARCHAR(150),
    PRIMARY KEY (IdDepenseSuivi),
    FOREIGN KEY (IdDepense) REFERENCES Depense(IdDepense),
    FOREIGN KEY (IdCompte) REFERENCES Compte(IdCompte)
);