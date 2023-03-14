const express = require('express');
let app = express();
let ejs = require('ejs');
let con = require('./database');
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));
app.get('/', (req, res) => {
	res.render('inscription');
});

app.get('/conect', (req, res) => {
	res.render('conect');
});

//code recuperation de l'id
// app.get('/edite', function (req, res) {
//     var id = req.query.id;
//     var sql = "SELECT * FROM hari WHERE id =?";
//     con.query(sql,[id], function (error, result) {
//     if (error) console.log(error);
//     res.render('edite', { nenin: result });
//   });
// });
app.post('/edite', (req, res) => {
    var id = req.query.id;
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var sql = "UPDATE hari SET nom = ?, prenom = ? WHERE id = ?";
    con.query(sql,[nom, prenom, id], function(err, result) {
        if (err) throw err;
        res.redirect('/connexion');
      });
});
//supprimer les inscriptions
app.get('/edit', function (req, res) {
  var id = req.query.id;
  var sql = "DELETE FROM hari WHERE id =?";
  con.query(sql,[id], function (error, result) {
  if (error) console.log(error);
  res.redirect('/connexion');
});
});


//Inserer mes données dans la bd
app.post('/connexion', (req, res) => {
	var nom = req.body.nom;
	var prenom = req.body.prenom;
	var genre= req.body.genre;
	
	var sql =
		"INSERT INTO hari (nom, prenom, genre) VALUES ('" 
        +nom +"', '" +prenom +"','"+genre + "')";

	con.query(sql, function (err, result) {
		if (err) throw err;
        res.redirect('/connexion');
		
	});
});

//Afficher les éléments de ma liste
app.get('/connexion', function (req, res) {
	var sql = 'SELECT * FROM hari';
	con.query(sql, function (error, result) {
		if (error) console.log(error);
		// console.log(result);
		res.render('connexion', { nenin: result });
	});
});

app.listen(4000);
