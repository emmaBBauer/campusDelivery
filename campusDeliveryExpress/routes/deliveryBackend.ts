import express ,{Request, Response} from "express";
import {FieldPacket, QueryError, RowDataPacket} from "mysql2";
import {connection} from "../connection";
import {Delivery} from "../../models/Delivery";

let router = express.Router();

connection.connect();

router.get('/getAll', (req:Request, res:Response) => {

    connection.query('use campusdeliverydata');
    connection.query('SELECT * FROM campusdeliverydata.delivery', function (err:QueryError, result:RowDataPacket, fields:FieldPacket){
        let x = JSON.stringify(result);
        console.log(x);
        res.send(x);
    });
});


router.get('/today', (req:Request, res:Response) => {

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

    connection.query(`SELECT * FROM campusdeliverydata.delivery WHERE deliveryDate = "${today}"`,
        function (err:QueryError, result:RowDataPacket){

            let re = JSON.stringify(result);

            if(re.length==2){
                res.send("delivery for today is empty");
                console.log("delivery is empty")
                return;
            }
            else{
                res.send(result);
                console.log(result);
                return;
            }
        });
});


router.post('/new', (req:Request, res:Response) => {

    connection.query('use campusdeliverydata');

});


module.exports = router;