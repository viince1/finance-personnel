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
  connection.query(`SELECT obj.IdObjectif, obj.Titre, obj.Description, obj.DateButoir, objs.Nom, objs.NoStatus FROM Objectif obj JOIN ObjectifStatut objs on obj.IdObjectifStatus = objs.IdObjectifStatus WHERE IdUtilisateur = ${uid}`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
router.post('/create', (req,res, next) => {
  const objectif = req.body.params.objectif;
  const uid = req.body.params.IdUtilisateur;
  connection.query(`INSERT INTO Objectif VALUES (0, '${objectif.Titre}','${objectif.Description}', '${objectif.DateButoir}', '${objectif.IdObjectifStatus}', ${uid}, '${objectif.NoPriorite}')`,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
router.put('/update', (req,res, next) => {
  const objectif = req.body;
  connection.query(`UPDATE Objectif SET Titre = '${objectif.Titre}', Description = '${objectif.Description}', DateButoir = '${objectif.DateButoir}', IdObjectifStatus = '${objectif.IdObjectifStatus}', NoPriorite = '${objectif.NoPriorite}' WHERE IdObjectif = '${objectif.IdObjectif}' `,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
router.delete('/delete', (req,res, next) => {
  const objectif = req.body;
  connection.query(`DELETE FROM Objectif WHERE IdObjectif = '${objectif.IdObjectif}' `,
  (error, results) => {
    if (error) res.status(501).send(error);
    if (results) res.json(results);
  })
});
module.exports = router;
