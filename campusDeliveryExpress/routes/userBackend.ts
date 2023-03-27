import {Request, Response, response} from "express";

var express = require('express');
var router = express.Router();


var mysql      = require('mysql2');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'campus',
    password : 'campusDelivery'
});

connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//     if (err) throw err;
//     console.log('The solution is: ', rows[0].solution);
// });



router.get('/', (req:Request, res:Response) => {
    connection.query('SELECT * FROM user', function (err, result, fields){
        res.send(result);
    });
});

module.exports = router;

connection.end();
