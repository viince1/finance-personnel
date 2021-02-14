-- Utilisation de la base de donnees
USE ProjetFinEtude;
-- Utilisateur X
-- Budget X
-- CategorieDepense X
-- CategorieRevenu X
-- Compte X
-- Revenu X
-- Depense X
-- DepenseFrequence X
-- TypeCompte X
-- DepenseSuivi
-- RevenuSuivi
-- OrdreAchat
-- Portefeuille
-- TitreBoursier

-- Donnees .utilisateurs
INSERT INTO Utilisateur VALUES (0,'Lavallee','Vincent','514-555-5555','vincent@email.com');
INSERT INTO Utilisateur VALUES (0,'Dubovoyi','Sacha','514-444-4444','sacha@email.com');
INSERT INTO Utilisateur VALUES (0,'Bellhasen','Hamza','514-333-3333','hamza@email.com');
-- Donneees TypeCompte
INSERT INTO TypeCompte VALUES (0,'CELI','Compte epargne libre dimpots');
INSERT INTO TypeCompte VALUES (0,'REER','Compte regime enregistre epargne retraite');
INSERT INTO TypeCompte VALUES (0,'NE','Compte non enregistree');
INSERT INTO TypeCompte VALUES (0,'REEE','Compte regime epargne etude enregistree');
-- Donnees Budget
INSERT INTO Budget VALUES (0,'Budget 2018',1);
INSERT INTO Budget VALUES (0,'Budget 2019',1);
INSERT INTO Budget VALUES (0,'Budget 2017',2);
INSERT INTO Budget VALUES (0,'Budget 2018',2);
INSERT INTO Budget VALUES (0,'Budget 2019',3);
INSERT INTO Budget VALUES (0,'Budget 2020',3);
-- Donnees CategorieDepense
INSERT INTO CategorieDepense VALUES (0,'Transport',1);
INSERT INTO CategorieDepense VALUES (0,'Habitation',1);
INSERT INTO CategorieDepense VALUES (0,'Utilitaires',1);
INSERT INTO CategorieDepense VALUES (0,'Education',1);
INSERT INTO CategorieDepense VALUES (0,'Alimentation',1);
INSERT INTO CategorieDepense VALUES (0,'Personnel',1);
-- Donnees CategorieRevenu
INSERT INTO CategorieRevenu VALUES (0,'Salaire horaire',1);
INSERT INTO CategorieRevenu VALUES (0,'Salaire annuel',1);
INSERT INTO CategorieRevenu VALUES (0,'Comission',1);
INSERT INTO CategorieRevenu VALUES (0,'Versement unique',1);
INSERT INTO CategorieRevenu VALUES (0,'Bonus',1);
-- Donnees Compte
INSERT INTO COMPTE VALUES (0,'Compte #1 pour projet', 'Compte investi en bourse pour planifier mon projet dachat immobilier',1,1);
INSERT INTO COMPTE VALUES (0,'Compte cheque', 'Compte de transactions regulieres',3,1);
INSERT INTO COMPTE VALUES (0,'Compte #2 pour retraite', 'Compte investi en bourse pour planifier ma retraite',2,1);
INSERT INTO COMPTE VALUES (0,'Compte epargne', 'Compte investi en bourse pour planifier ma retraite',2,1);
INSERT INTO COMPTE VALUES (0,'Compte #3 pour projet', 'Compte investi en bourse pour planifier mon projet dachat immobilier',1,2);
INSERT INTO COMPTE VALUES (0,'Compte #4 pour retraite', 'Compte investi en bourse pour planifier ma retraite',2,2);
INSERT INTO COMPTE VALUES (0,'Compte #5 pour projet', 'Compte investi en bourse pour planifier mon projet dachat immobilier',1,3);
INSERT INTO COMPTE VALUES (0,'Compte #6 pour retraite', 'Compte investi en bourse pour planifier ma retraite',2,3);
INSERT INTO COMPTE VALUES (0,'Compte #6 pour retraite', 'Compte investi en bourse pour planifier ma retraite',2,1);
-- Donnees DepenseFrequence
INSERT INTO DepenseFrequence VALUES (0,'Hebdo');
INSERT INTO DepenseFrequence VALUES (0,'Bi-Hebdo');
INSERT INTO DepenseFrequence VALUES (0,'Mensuel');
INSERT INTO DepenseFrequence VALUES (0,'Annuel');
-- Donnees Depense
INSERT INTO Depense VALUES(0,'Immatriculation',187.35,1,1,4);
INSERT INTO Depense VALUES(0,'Permis de conduire',85.00,1,1,4);
INSERT INTO Depense VALUES(0,'Maintenance',1000.00,1,1,4);
INSERT INTO Depense VALUES(0,'Gas',50.00,1,1,2);
INSERT INTO Depense VALUES(0,'Assurance',153.45,1,1,3);
INSERT INTO Depense VALUES(0,'Paiements',00.00,1,1,2);
INSERT INTO Depense VALUES(0,'Cellulaire',70.30,3,1,3);
INSERT INTO Depense VALUES(0,'Technologie',1000.00,3,1,4);
INSERT INTO Depense VALUES(0,'Vetements',600.00,6,1,4);
INSERT INTO Depense VALUES(0,'Sorties',50.00,6,1,1);
INSERT INTO Depense VALUES(0,'Autre',25.00,6,1,1);
INSERT INTO Depense VALUES(0,'Technologie',1500.00,6,4,4);
INSERT INTO Depense VALUES(0,'Immatriculation',187.35,1,3,4);
INSERT INTO Depense VALUES(0,'Permis de conduire',85.00,1,3,4);
INSERT INTO Depense VALUES(0,'Maintenance',1000.00,1,3,4);
INSERT INTO Depense VALUES(0,'Gas',50.00,1,3,2);
INSERT INTO Depense VALUES(0,'Assurance',153.45,1,3,3);
INSERT INTO Depense VALUES(0,'Paiements',00.00,1,3,2);
INSERT INTO Depense VALUES(0,'Cellulaire',70.30,3,3,3);
INSERT INTO Depense VALUES(0,'Technologie',1000.00,3,3,4);
INSERT INTO Depense VALUES(0,'Vetements',600.00,6,3,4);
INSERT INTO Depense VALUES(0,'Sorties',50.00,6,3,1);
INSERT INTO Depense VALUES(0,'Autre',25.00,6,3,2);
INSERT INTO Depense VALUES(0,'Technologie',1500.00,6,3,4);
-- Donnees revenus
INSERT INTO Revenu VALUES (0,'Salaire horaire de epicerie',12.50,1,1);
INSERT INTO Revenu VALUES (0,'Salaire horaire de epicerie',13.00,1,2);
INSERT INTO Revenu VALUES (0,'Salaire horaire de depanneur',13.00,1,3);
INSERT INTO Revenu VALUES (0,'Salaire horaire de depanneur',13.50,1,4);
INSERT INTO Revenu VALUES (0,'Bonus de depanneur',50.00,5,2);
INSERT INTO Revenu VALUES (0,'Bonus de depanneur',50.00,5,4);
-- Donnees ObjectifStatus
INSERT INTO ObjectifStatut VALUES (0,'Succes',99);
INSERT INTO ObjectifStatut VALUES (0,'En cours',1);
INSERT INTO ObjectifStatut VALUES (0,'A faire',49);
-- Donnees Objectif
INSERT INTO Objectif VALUES (0,'Amasser 50 000$','Projet pour lachat de la premiere maison','2020-01-22',3,1);
INSERT INTO Objectif VALUES (0,'Amasser 10 000$','Payer luniversite','2020-01-22',1,1);
INSERT INTO Objectif VALUES (0,'Amasser 50 000$','Projet pour lachat de la premiere maison','2020-01-22',3,1);
INSERT INTO Objectif VALUES (0,'Amasser 10 000$','Payer luniversite','2020-01-22',1,1);
INSERT INTO Objectif VALUES (0,'Amasser 50 000$','Projet pour lachat de la premiere maison','2020-01-22',3,1);
INSERT INTO Objectif VALUES (0,'Amasser 10 000$','Payer luniversite','2020-01-22',1,1);
INSERT INTO Objectif VALUES (0,'Amasser 10 000$','Payer la carte de credit','2020-01-22',2,2);
-- Mettre le no de priorite dans objectif a place de objectif status
-- Donnees DepenseSuivi
-- Rajouter une description facultative de la depense
INSERT INTO DepenseSuivi VALUES (0,199.99,'2020-01-21', 1,1,'Immatriculation');
INSERT INTO DepenseSuivi VALUES (0,20.99,'2020-01-21', 10,1,'Test');
INSERT INTO DepenseSuivi VALUES (0,400.99,'2020-01-21', 20,1,'Ordinateur');
INSERT INTO DepenseSuivi VALUES (0,12.99,'2020-01-21', 23,1,'Clopes');

INSERT INTO DepenseSuivi VALUES (0,199.99,'2021-01-21', 1,1,'Immatriculation');
INSERT INTO DepenseSuivi VALUES (0,20.99,'2021-01-21', 10,1,'Test');
INSERT INTO DepenseSuivi VALUES (0,400.99,'2021-01-21', 20,1,'Ordinateur');
INSERT INTO DepenseSuivi VALUES (0,12.99,'2021-01-21', 23,1,'Clopes');



SELECT * FROM DepenseSuivi
INNER JOIN Depense D on DepenseSuivi.IdDepense = D.IdDepense
INNER JOIN CategorieDepense CD on D.IdCategorieDepense = CD.IdCategorieDepense;

USE ProjetFinEtude;
INSERT INTO RevenuSuivi VALUES (0,2000,'2021-01-21', 1,1,'Paie');
INSERT INTO RevenuSuivi VALUES (0,1000,'2021-01-21', 1,1,'Comission');
INSERT INTO RevenuSuivi VALUES (0,80,'2020-01-21', 1, 1, 'Paiement de voiture');
INSERT INTO RevenuSuivi VALUES (0,80,'2021-01-21', 1, 2, 'Paiement de voiture');
INSERT INTO RevenuSuivi VALUES (0,40,'2021-01-19', 1,2, 'Paiement de cellulaire');



USE ProjetFinEtude;

-- Montant planifie pour une categorie de depense
SELECT d.IdCategorieDepense, sum(
      CASE d.IdDepenseFrequence
          WHEN 1 THEN Montant * 52
          WHEN 2 THEN Montant * 26
          WHEN 3 THEN Montant * 12
          WHEN 4 THEN Montant * 1
      END) as SommeParCategorie, CD.Nom
  FROM Depense d
  INNER JOIN Budget B on d.IdBudget = B.IdBudget
  INNER JOIN CategorieDepense CD on d.IdCategorieDepense = CD.IdCategorieDepense
  WHERE B.IdBudget = 1
  GROUP BY IdCategorieDepense
  ORDER BY IdCategorieDepense;

-- Montant actuel par categorie depense
SELECT d.IdCategorieDepense, sum(ds.Montant) as SommeDepenseSuivi, CD.Nom
FROM DepenseSuivi ds
INNER JOIN Depense d ON d.IdDepense = ds.IdDepense
INNER JOIN CategorieDepense CD on d.IdCategorieDepense = CD.IdCategorieDepense
WHERE ds.IdBudget = 1
GROUP BY d.IdCategorieDepense, CD.Nom
ORDER BY d.IdCategorieDepense;





-- TESTSESETESTSESETESTSTESES

SELECT d.IdCategorieDepense, sum(
      CASE d.IdDepenseFrequence
          WHEN 1 THEN Montant * 52
          WHEN 2 THEN Montant * 26
          WHEN 3 THEN Montant * 12
          WHEN 4 THEN Montant * 1
      END) as SommeParCategorie, CD.Nom, rapport.SommeDepenseSuivi
  FROM Depense d
  INNER JOIN Budget B on d.IdBudget = B.IdBudget
  INNER JOIN CategorieDepense CD on d.IdCategorieDepense = CD.IdCategorieDepense
INNER JOIN (SELECT d.IdCategorieDepense, sum(ds.Montant) as SommeDepenseSuivi
                FROM DepenseSuivi ds
                INNER JOIN Depense d ON d.IdDepense = ds.IdDepense
                INNER JOIN CategorieDepense CD on d.IdCategorieDepense = CD.IdCategorieDepense
                WHERE ds.IdBudget = 1
                GROUP BY d.IdCategorieDepense, CD.Nom
                ORDER BY d.IdCategorieDepense)
as rapport ON rapport.IdCategorieDepense = d.IdCategorieDepense
  WHERE B.IdBudget = 1
  GROUP BY d.IdCategorieDepense, CD.Nom
  ORDER BY d.IdCategorieDepense;


SELECT * FROM Depense
