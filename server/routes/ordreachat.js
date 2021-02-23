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


router.get('/ordreAchat', (req, res, next) => {
    const idCompte = req.query.idCompte;
    console.log(idCompte);
    connection.query(`SELECT IdOrdreAchat, DATE_FORMAT(DateAcquisition, '%Y-%m-%d') as DateAcquisition, Titre, Prix, Quantite, IdCompte
    FROM OrdreAchat WHERE IdCompte = ${idCompte};`,
    (error, results) => {
      if (error) res.send(error);
      if (results) res.send(results);
    })
  });
  
router.post('/ordreAchat', (req, res, next) => {
    const ordreAchat = req.body.params.OrdreAchat;
    const idCompte = req.body.params.idCompte;
    connection.query(`INSERT INTO OrdreAchat VALUES (0, '${ordreAchat.DateAcquisition}','${ordreAchat.Titre}', '${ordreAchat.Prix}', '${ordreAchat.Quantite}', ${idCompte})`,
    (error, results) => {
      if(error) res.send(error);
      if(results) res.send(results);
    });
    console.log(ordreAchat.IdOrdreAchat);
});

router.delete('/ordreAchat', (req, res, next) => {
    const IdOrdreAchat = req.body.IdOrdreAchat;
    connection.query(`DELETE FROM OrdreAchat WHERE IdOrdreAchat = ${IdOrdreAchat};`,
    (error, results) => {
      if (error) res.send(error);
      if (results) res.send(results);
    })
  })

  router.put('/ordreAchat', (req, res, next) => {
    const ordreAchat = req.body;
    connection.query(`UPDATE OrdreAchat SET DateAcquisition = '${ordreAchat.DateAcquisition}', Titre = '${ordreAchat.Titre}', Prix = '${ordreAchat.Prix}', Quantite = '${ordreAchat.Quantite}' WHERE IdOrdreAchat = ${ordreAchat.IdOrdreAchat};`, (error, results) => {
      if (error) res.send(error);
      if (results) res.send(results);
    })
  });
module.exports = router;
