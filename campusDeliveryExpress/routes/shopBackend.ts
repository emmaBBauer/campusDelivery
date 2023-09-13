import express ,{Request, Response} from "express";
import {FieldPacket, QueryError, RowDataPacket} from "mysql2";
import {connection} from "../connection";

let router = express.Router();

connection.connect();


router.get('/getAll', (req:Request, res:Response) => {

    connection.query('use campusdeliverydata');

    connection.query(`SELECT * FROM campusdeliverydata.shops`,
        function (err:QueryError, result:RowDataPacket){

            if(JSON.stringify(result).length==2){
                res.sendStatus(406);
                console.log("datenbank leer");
                return;
            }
            else{
                res.send(JSON.stringify(result));
                return;
            }
        })
});


router.get('/getProducts', (req:Request, res:Response) => {

    connection.query('use campusdeliverydata');

    connection.query(`SELECT product FROM campusdeliverydata.products WHERE shopid = ${req.query.shop}`,
        function (err:QueryError, result:RowDataPacket){

            if(JSON.stringify(result).length==2){
                res.sendStatus(406);
                console.log("datenbank leer");
                return;
            }
            else{
                res.send(JSON.stringify(result));
                return;
            }
        })
});



module.exports = router;
