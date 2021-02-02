var express = require('express');
var router = express.Router();
var mysql = require('mysql')

var connection = mysql.createConnection({
  // Mettre bonnes infos de connexion selon votre bd local
  host: 'localhost',
  user: 'root',
  password: 'localhost',
  database: 'ProjetFinEtude',
  insecureAuth: true,
});

connection.connect()

router.get('/', (req,res, next) => {
  const uid = req.query.uid;
  console.log(uid);
  connection.query(`SELECT *
  FROM DepenseSuivi
  INNER JOIN Compte C on DepenseSuivi.IdCompte = C.IdCompte
  WHERE C.IdUtilisateur = ${uid};`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});

router.get('/budget', (req,res, next) => {
  const idBudget = req.query.idBudget;
  console.log(idBudget);
  connection.query(`SELECT D.IdDepense, D.Titre as DepenseTitre, D.Montant, D.IdBudget, CD.Nom as CategorieDepenseNom, DF.Nom as DepenseFrequenceNom, D.IdDepenseFrequence, CD.IdCategorieDepense
  FROM Depense D
  INNER JOIN CategorieDepense CD on D.IdCategorieDepense = CD.IdCategorieDepense
  INNER JOIN DepenseFrequence DF on D.IdDepenseFrequence = D.IdDepenseFrequence
  WHERE D.IdBudget = ${idBudget}
  ORDER BY CD.Nom;`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});

module.exports = router;
