var express = require('express');
var router = express.Router();

var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'localhost',
  database: 'ProjetFinEtude',
  insecureAuth: true,
});

connection.connect()

router.post('/signup', (req, res, next) => {
  const user = req.body;
  connection.query(
    `INSERT INTO Utilisateur VALUES (0,'${user.name}', '${user.fname}', '${user.telephone}', '${user.email}')`
    , (error, results) => {
      if (error) console.log(error);
      if (results) console.log(results);
    });
});

router.post('/identifier', (req, res, next) => {
  const user = req.body;
  connection.query(
    `SELECT IdUtilisateur FROM Utilisateur WHERE Email = '${user.email}'`
    , (error, results) => {
      if (error) console.log(error);
      if (results) res.json(results);
    });
});

module.exports = router;
