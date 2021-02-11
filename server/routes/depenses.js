var express = require('express');
var router = express.Router();
var mysql = require('mysql')

var connection = mysql.createConnection({
  // Mettre bonnes infos de connexion selon votre bd local
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ProjetFinEtude',
  insecureAuth: true,
});

connection.connect()

router.get('/', (req,res, next) => {
  const idBudget = req.query.idBudget;
  connection.query(`SELECT *
  FROM DepenseSuivi
  WHERE IdBudget = ${idBudget};`,
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
router.get('/depenseSuivi', (req,res, next) => {
  const idBudget = req.query.idBudget;
  const dateDebut = req.query.dateDebut;
  const dateFin = req.query.dateFin;
  console.log(dateDebut);
  console.log(dateFin);
  connection.query(`SELECT IdDepenseSuivi, Montant, DATE_FORMAT(DateEntree, '%Y-%m-%d') as DateEntree, IdDepense, IdBudget, Nom, Description
  FROM DepenseSuivi
  WHERE IdBudget = ${idBudget} AND DateEntree BETWEEN '${dateDebut}' AND '${dateFin}';`,
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
router.put('/updateDepenseSuivi', (req,res, next) => {
  console.log(req.body);
  const depenseSuivi = req.body;
  connection.query(`UPDATE DepenseSuivi SET Montant = '${depenseSuivi.Montant}', DateEntree = '${depenseSuivi.DateEntree}', IdDepense = '${depenseSuivi.IdDepense}', Nom = '${depenseSuivi.Nom}', Description = '${depenseSuivi.Description}' WHERE IdDepenseSuivi = '${depenseSuivi.IdDepenseSuivi}'`,
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
router.post('/addDepenseSuivi', (req,res, next) => {
  const depenseSuivi = req.body;
  connection.query(`INSERT INTO DepenseSuivi VALUES (0, '${depenseSuivi.Montant}','${depenseSuivi.DateEntree}', '${depenseSuivi.IdDepense}', ${depenseSuivi.IdBudget},'${depenseSuivi.Nom}','${depenseSuivi.Description}')`,
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
router.delete('/deleteDepenseSuivi', (req,res, next) => {
  const idDepenseSuivi = req.body.idDepenseSuivi;
  connection.query(`DELETE FROM DepenseSuivi WHERE IdDepenseSuivi = '${idDepenseSuivi}';`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
module.exports = router;
