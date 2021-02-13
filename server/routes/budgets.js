var express = require('express');
var router = express.Router();

var mysql = require('mysql')

var connection = mysql.createConnection({
  // Mettre bonnes infos de connexion selon votre bd local
  host: 'localhost',
  user: 'root',
  password: 'Dekzspz1995',
  database: 'ProjetFinEtude',
  insecureAuth: true,
});

connection.connect()

router.get('/', (req,res, next) => {
  const uid = req.query.uid;
  connection.query(`SELECT * FROM Budget WHERE IdUtilisateur = ${uid}`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});

router.post('/create', (req, res, next) => {
  const budget = req.body.params.budget;
  const uid = req.body.params.uid;
  connection.query(
    `INSERT INTO Budget VALUES (0,'${budget.Nom}', ${uid});`
    , (error, results) => {
      if (error) console.log(error);
      if (results) res.json(results);
    });
});

router.delete('/delete', (req, res, next) => {
  const idbudget = req.body.idBudget;
  console.log(idbudget);
  connection.query(
    `DELETE FROM Budget WHERE IdBudget = ${idbudget};`
    , (error, results) => {
      if (error) res.status(501).send(error);
      if (results) res.json(results);
    });
});

router.put('/update', (req, res, next) => {
  const budget = req.body.budget;
  connection.query(
    `UPDATE Budget SET Nom = '${budget.Nom}' WHERE IdBudget = '${budget.IdBudget}'`
    , (error, results) => {
      if (error) res.status(501).send(error);
      if (results) res.json(results);
    });
});

router.get('/sommeParCategories', (req, res, next) => {
  const idBudget = req.query.idBudget;
  connection.query(
    `SELECT d.IdCategorieDepense, sum(
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
                WHERE ds.IdBudget = ${idBudget}
                GROUP BY d.IdCategorieDepense, CD.Nom
                ORDER BY d.IdCategorieDepense)
as rapport ON rapport.IdCategorieDepense = d.IdCategorieDepense
  WHERE B.IdBudget = ${idBudget}
  GROUP BY d.IdCategorieDepense, CD.Nom
  ORDER BY d.IdCategorieDepense;`
    , (error, results) => {
      if (error) res.status(501).send(error);
      if (results) res.json(results);
    });
});

module.exports = router;
