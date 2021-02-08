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

router.get('/categories', (req,res, next) => {
  const uid = req.query.uid;
  console.log(uid);
  connection.query(`SELECT *
  FROM CategorieDepense`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});

router.get('/frequences', (req,res, next) => {
  const uid = req.query.uid;
  console.log(uid);
  connection.query(`SELECT *
  FROM DepenseFrequence`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});

router.get('/budget', (req,res, next) => {
  const idBudget = req.query.idBudget;
  console.log(idBudget);
  connection.query(`SELECT D.IdDepense, D.Titre as nom, D.Montant as montant, D.idBudget, D.IdDepenseFrequence as idDepenseFrequence, CD.IdCategorieDepense as idCategorieDepense
  FROM Depense D
  INNER JOIN CategorieDepense CD on D.IdCategorieDepense = CD.IdCategorieDepense
  INNER JOIN DepenseFrequence DF on D.IdDepenseFrequence = DF.IdDepenseFrequence
  WHERE D.IdBudget = ${idBudget}
  ORDER BY CD.Nom;`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});

router.put('/update', (req,res, next) => {
  const depense = req.body;
  connection.query(`UPDATE Depense SET Titre = '${depense.nom}', Montant = ${depense.montant}, IdCategorieDepense = ${depense.idCategorieDepense}, IdDepenseFrequence = ${depense.idDepenseFrequence} WHERE IdDepense = ${depense.IdDepense}`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});

router.post('/add', (req,res, next) => {
  const depense = req.body;
  connection.query(`INSERT INTO Depense VALUES (0, '${depense.nom}', ${depense.montant}, ${depense.idCategorieDepense}, ${depense.idBudget}, ${depense.idDepenseFrequence})`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});

router.delete('/delete', (req,res, next) => {
  const idDepense = req.body.idDepense;
  connection.query(`DELETE FROM Depense WHERE IdDepense = ${idDepense} `,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});

module.exports = router;
