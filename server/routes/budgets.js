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

module.exports = router;
