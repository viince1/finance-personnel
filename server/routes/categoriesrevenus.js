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
  connection.query(`SELECT * FROM categorierevenu WHERE categorierevenu.IdUtilisateur = ${uid};`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
router.post('/add', (req,res, next) => {
  const data = req.body;
  connection.query(`INSERT INTO categorierevenu VALUES (0,'${data.data.Nom}', '${data.data.uid}')`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
router.put('/update', (req,res, next) => {
  const categorierevenu = req.body;
  console.log(categorierevenu)
  connection.query(`UPDATE categorierevenu SET Nom = '${categorierevenu.data.Nom}' WHERE IdCategorieRevenu= ${categorierevenu.data.IdCategorieRevenu}`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
router.delete('/delete', (req,res, next) => {
  const idCategorieRevenu = req.body.idCategorieRevenu;
  connection.query(`UPDATE Revenu SET IdCategorieRevenu = NULL WHERE IdCategorieRevenu = ${idCategorieRevenu}`)
  connection.query(`DELETE FROM categorierevenu WHERE IdCategorieRevenu = ${idCategorieRevenu};`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
module.exports = router;
