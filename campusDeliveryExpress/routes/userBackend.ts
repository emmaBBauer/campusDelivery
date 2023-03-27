import express ,{Request, Response} from "express";

let router = express.Router();


const mysql      = require('mysql2');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'campus',
    password : 'campusDelivery'
});

connection.connect();



router.get('/', (req:Request, res:Response) => {
    connection.query('SELECT * FROM user', function (err, result, fields){
        console.log(result);
        res.send(result);
    });
});

module.exports = router;

connection.end();
