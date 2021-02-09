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
  const idBudget = req.query.idBudget;
  connection.query(`SELECT *
  FROM RevenuSuivi
  WHERE IdBudget = ${idBudget};`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
router.get('/revenusBudget', (req,res, next) => {
  const idBudget = req.query.idBudget;
  console.log(idBudget);
  connection.query(`SELECT r.IdRevenu as idRevenu , r.Titre as titre, r.Montant as montant, r.IdBudget as idBudget, cr.Nom, cr.IdCategorieRevenu as idCategorieRevenu
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
router.post('/add', (req,res, next) => {
  const revenus = req.body;
  connection.query(`INSERT INTO Revenu VALUES (0, '${revenus.titre}','${revenus.montant}', '${revenus.idCategorieRevenu}', ${revenus.idBudget})`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
router.put('/update', (req,res, next) => {
  console.log(req.body);
  const revenu = req.body;
  connection.query(`UPDATE Revenu SET Titre = '${revenu.titre}', Montant = ${revenu.montant}, IdCategorieRevenu = ${revenu.idCategorieRevenu} WHERE IdRevenu = ${revenu.idRevenu}`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
router.delete('/delete', (req,res, next) => {
  const idRevenu = req.body.idRevenu;
  connection.query(`DELETE FROM Revenu WHERE IdRevenu = ${idRevenu};`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
module.exports = router;
