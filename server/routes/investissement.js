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
  const stock = req.body.stock;
  const idCompte = req.body.idCompte;
  connection.query(`INSERT INTO TitreBoursier VALUES(0,'${stock.TitreCours}','${stock.TitreLong}', ${stock.Poids}, '${stock.Region}', '${stock.Devise}', ${idCompte});`,
  (error, results) => {
    if(error) res.send(error);
    if(results) res.send(results);
  });
});

router.delete('/stocks', (req, res, next) => {
  const IdTitreBoursier = req.body.IdTitreBoursier;
  connection.query(`DELETE FROM TitreBoursier WHERE IdTitreBoursier = ${IdTitreBoursier};`,
  (error, results) => {
    if (error) res.send(error);
    if (results) res.send(results);
  })
})

router.put('/stocks', (req, res, next) => {
  const stock = req.body;
  connection.query(`UPDATE TitreBoursier SET TitreCours = '${stock.TitreCours}', TitreLong = '${stock.TitreLong}',Poids = ${stock.Poids}, Region = '${stock.Region}', Devise = '${stock.Devise}' WHERE IdTitreBoursier = ${stock.IdTitreBoursier};`, (error, results) => {
    if (error) res.send(error);
    if (results) res.send(results);
  })
});

module.exports = router;
