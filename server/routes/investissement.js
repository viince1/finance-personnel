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

router.get('/stocks', (req, res, next) => {
  const idCompte = req.query.idCompte;
  console.log(idCompte);
  connection.query(`SELECT * FROM TitreBoursier WHERE IdCompte = ${idCompte};`,
  (error, results) => {
    if (error) res.send(error);
    if (results) res.send(results);
  })
});

router.post('/stocks', (req, res, next) => {
  const compte = req.body.stock;
  const idCompte = req.body.idCompte;
  connection.query(`INSERT INTO TitreBoursier VALUES(0,'${compte.titreCours}','${compte.titreLong}', ${compte.poids}, '${compte.region}', '${compte.devise}', ${idCompte});`,
  (error, results) => {
    if(error) res.send(error);
    if(results) res.send(results);
  });

});

module.exports = router;
