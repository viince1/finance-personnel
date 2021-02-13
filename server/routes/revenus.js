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
  const idBudget = req.query.idBudget;
  connection.query(`SELECT *
  FROM RevenuSuivi
  WHERE IdBudget = ${idBudget};`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
router.get('/revenuSuivi', (req,res, next) => {
  const idBudget = req.query.idBudget;
  const dateDebut = req.query.dateDebut;
  const dateFin = req.query.dateFin;
  console.log(dateDebut);
  console.log(dateFin);
  connection.query(`SELECT rs.IdRevenuSuivi, rs.Montant, DATE_FORMAT(rs.DateEntree, '%Y-%m-%d') as DateEntree, rs.IdRevenu, rs.IdBudget, rs.Description, r.Titre as RevenuNom
  FROM RevenuSuivi rs
  INNER JOIN Revenu r ON r.IdRevenu = rs.IdRevenu
  WHERE rs.IdBudget = ${idBudget} AND DateEntree BETWEEN '${dateDebut}' AND '${dateFin}';`,
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
  connection.query(`INSERT INTO Revenu VALUES (0,'${revenus.nom}')`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
router.post('/addRevenuSuivi', (req,res, next) => {
  const revenuSuivi = req.body;
  connection.query(`INSERT INTO RevenuSuivi VALUES (0, '${revenuSuivi.Montant}','${revenuSuivi.DateEntree}', '${revenuSuivi.IdRevenu}', ${revenuSuivi.IdBudget},'${revenuSuivi.Description}')`,
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
router.put('/updateRevenuSuivi', (req,res, next) => {
  console.log(req.body);
  const revenuSuivi = req.body;
  connection.query(`UPDATE RevenuSuivi SET Montant = '${revenuSuivi.Montant}', DateEntree = '${revenuSuivi.DateEntree}', IdRevenu = '${revenuSuivi.IdRevenu}', Description = '${revenuSuivi.Description}' WHERE IdRevenuSuivi = '${revenuSuivi.IdRevenuSuivi}'`,
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
router.delete('/deleteRevenuSuivi', (req,res, next) => {
  const idRevenuSuivi = req.body.idRevenuSuivi;
  connection.query(`DELETE FROM RevenuSuivi WHERE IdRevenuSuivi = '${idRevenuSuivi}';`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
module.exports = router;
