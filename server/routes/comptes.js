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
  connection.query(`SELECT co.IdCompte, co.Nom as NomCompte, tc.Nom as TypeCompte FROM Compte co INNER JOIN TypeCompte tc
  ON co.IdType = tc.IdTypeCompte WHERE IdUtilisateur = ${uid};`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});

router.get('/transactions', (req,res, next) => {
  const idcompte = req.query.IdCompte;
  connection.query(`SELECT ds.Montant as MontantDepense, ds.DateEntree as DateDepense, cs.Nom as CategorieDepense, ds.Nom as NomDepense, ds.Description as DescriptionDepense, ds.IdDepenseSuivi FROM Compte co INNER JOIN DepenseSuivi ds
      ON co.IdCompte = ds.IdCompte
      INNER JOIN Depense dp
      ON ds.IdDepense = dp.IdDepense
      INNER JOIN CategorieDepense cs
      ON cs.IdCategorieDepense = dp.IdCategorieDepense
  WHERE co.IdCompte = ${idcompte};`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});

module.exports = router;
