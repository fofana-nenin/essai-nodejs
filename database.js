var mysql = require('mysql');
var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'kindo',
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connection reuissi!");
});
module.exports = con;
