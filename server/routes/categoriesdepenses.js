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
  connection.query(`SELECT *
  FROM CategorieDepense WHERE CategorieDepense.IdUtilisateur = ${uid};`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});


router.put('/update', (req,res, next) => {
  const categoriedepense = req.body.categoriedepense;
  connection.query(`UPDATE CategorieDepense SET Nom = '${categoriedepense.Nom}' WHERE IdCategorieDepense = ${categoriedepense.IdCategorieDepense}`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});

router.post('/add', (req,res, next) => {
  const categoriedepense = req.body.data.categoriedepense;
  const uid = req.body.data.uid;
  console.log(categoriedepense)
  console.log(uid)
  connection.query(`INSERT INTO CategorieDepense VALUES (0, '${categoriedepense.Nom}', '${uid}')`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});

router.delete('/delete', (req,res, next) => {
  const IdCategorieDepense = req.body.idCategorieDepense;
  connection.query(`UPDATE Depense SET IdCategorieDepense = NULL WHERE IdCategorieDepense = ${IdCategorieDepense}`)
  connection.query(`DELETE FROM CategorieDepense WHERE IdCategorieDepense = ${IdCategorieDepense}`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});

module.exports = router;
