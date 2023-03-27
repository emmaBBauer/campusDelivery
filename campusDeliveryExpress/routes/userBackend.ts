import express ,{Request, Response} from "express";
import {FieldPacket, QueryError, RowDataPacket} from "mysql2";
import {connection} from "../connection";

let router = express.Router();

connection.connect();

router.get('/', (req:Request, res:Response) => {

    connection.query('use campusdeliverydata');
    connection.query('SELECT * FROM campusdeliverydata.user', function (err:QueryError, result:RowDataPacket, fields:FieldPacket){
        let x = JSON.stringify(result);
        console.log(x);
        res.send(x);
    });
});

module.exports = router;


