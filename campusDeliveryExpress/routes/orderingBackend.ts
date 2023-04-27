import express ,{Request, Response} from "express";
import {FieldPacket, QueryError, RowDataPacket} from "mysql2";
import {connection} from "../connection";

let router = express.Router();

connection.connect();

router.get('/getAll', (req:Request, res:Response) => {

    connection.query('use campusdeliverydata');
    connection.query('SELECT * FROM campusdeliverydata.ordering', function (err:QueryError, result:RowDataPacket, fields:FieldPacket){
        let x = JSON.stringify(result);
        console.log(x);
        res.send(x);
    });
});


router.post('/new', (req:Request, res:Response) => {

    connection.query('use campusdeliverydata');
    connection.query('SELECT MAX(id) AS "max" FROM campusdeliverydata.ordering',
        function (err:QueryError, result:RowDataPacket){
            let newIp = result[0].max+1;

            connection.query(`INSERT INTO campusdeliverydata.ordering (id, delivery, userID, product, quantity, price, currentStatus) 
                        VALUES (${newIp}, ${req.body.delivery}, ${req.body.user}, '${req.body.product}', ${req.body.quantity}, ${req.body.price}, 'waiting')`,
                function (err:QueryError, result:RowDataPacket){

                    if(err==null){
                        res.sendStatus(201);
                    }
                    else{
                        res.sendStatus(406);
                        console.log(err);
                        return;
                    }
                });
        });
});



router.post('/setStatus', (req:Request, res:Response) => {

    connection.query('use campusdeliverydata');
    let i = req.query.status;

    connection.query(`UPDATE campusdeliverydata.ordering SET currentStatus='${req.query.status}' WHERE id=${req.body.orderId}`,
        function (err:QueryError, result:RowDataPacket){

            if(err == null){
                res.sendStatus(200);
            }
            else{
                res.sendStatus(406);
                console.log(err);
                return;
            }
        })
});


module.exports = router;
