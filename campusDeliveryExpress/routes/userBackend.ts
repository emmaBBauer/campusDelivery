import express ,{Request, Response} from "express";
import {FieldPacket, QueryError, RowDataPacket} from "mysql2";

let router = express.Router();


const mysql      = require('mysql2');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'campus',
    password : 'campusDelivery'
});

connection.connect();



router.get('/', (req:Request, res:Response) => {
    connection.query('SELECT * FROM user', function (err:QueryError, result:RowDataPacket, fields:FieldPacket){
        console.log(result);
        res.send(result);
    });
});

module.exports = router;

connection.end();
