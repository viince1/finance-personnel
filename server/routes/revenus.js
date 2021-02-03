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
  const uid = req.query.uid;
  console.log(uid);
  connection.query(`SELECT *
  FROM RevenuSuivi
  INNER JOIN Compte C on RevenuSuivi.IdCompte = C.IdCompte
  WHERE C.IdUtilisateur = ${uid};`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
router.get('/revenusBudget', (req,res, next) => {
  const idBudget = req.query.idBudget;
  console.log(idBudget);
  connection.query(`SELECT r.IdRevenu, r.Titre, r.Montant, r.IdBudget, cr.Nom, cr.IdCategorieRevenu
  FROM Revenu r INNER JOIN CategorieRevenu cr on r.IdCategorieRevenu = cr.IdCategorieRevenu
  WHERE r.IdBudget = ${idBudget} ORDER BY cr.Nom;`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
router.get('/categoriesrevenus', (req,res, next) => {
  const uid = req.query.uid;
  console.log(uid);
  connection.query(`SELECT * FROM CategorieRevenu`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
router.post('/create', (req,res, next) => {
  const revenus = req.body.params.revenus;
  const idBudget = req.query.idBudget;
  console.log(idBudget);
  connection.query(`INSERT INTO Revenu VALUES (0, '${revenus.Titre}','${revenus.Montant}', '${revenus.IdCategorieRevenu}', ${IdBudget})`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
router.post('/update', (req,res, next) => {
  const revenus = req.body;
  connection.query(`UPDATE Revenu SET Titre = '${revenus.Titre}', Montant = '${revenus.Montant}', IdCategorieRevenu = '${revenus.IdCategorieRevenu}' WHERE IdRevenu = '${revenus.IdRevenu}'`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
router.post('/delete', (req,res, next) => {
  const IdRevenu = req.body.params.IdRevenu
  connection.query(`DELETE FROM Revenu WHERE IdRevenu = '${IdRevenu}' `,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
module.exports = router;
