var express = require('express');
var router = express.Router();

var mysql      = require('mysql2');
var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'campus',
      password : 'campusDelivery'
});

connection.connect();
router.get('/', function(req, res, next) {
      connection.query('use campusdeliverydata');
      connection.query('SELECT * from testtable', function (err, result, fields){
            console.log(result);
            res.send(result);
      })
});


module.exports = router;
