import express ,{Request, Response} from "express";
import {FieldPacket, QueryError, RowDataPacket} from "mysql2";
import {connection} from "../connection";

let router = express.Router();

connection.connect();


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



router.get('/all', (req:Request, res:Response) => {

    let x :Date= new Date();
    let today:string = x.getFullYear()+"-";
    if(x.getMonth()<10){
        let y = x.getMonth()+1;
        today += "0"+y;
    }
    else{
        let y = x.getMonth()+1;
        today += y;
    }

    if(x.getDate()<10){
        today += "-0"+x.getDate();
    }
    else{
        today += "-"+x.getDate();
    }

    connection.query('use campusdeliverydata');
    connection.query(`SELECT * FROM campusdeliverydata.ordering o INNER JOIN campusdeliverydata.delivery d 
                            ON o.delivery = d.id WHERE d.userID = ${req.query.user} AND d.deliveryDate = "${today}"`,
        function (err:QueryError, result:RowDataPacket){

            let newJson = JSON.stringify(result);

            if(err==null){
                if(newJson.length==2){
                    res.send("leider leer");
                    return;
                }
                else{
                    res.send(newJson);
                    return;
                }
            }
            else{
                console.log(err);
                res.sendStatus(406);
                return;
            }
        })
});



router.get('/getOrder', (req:Request, res:Response) => {

    connection.query('use campusdeliverydata');
    connection.query(`SELECT * FROM campusdeliverydata.ordering WHERE id = ${req.query.id}`,
        function (err:QueryError, result:RowDataPacket){

            let x = JSON.stringify(result[0]);
            if(x==undefined){
                res.sendStatus(406);
                return;
            }
            else{
                res.send(x);
                return;
            }

        })
});


module.exports = router;
