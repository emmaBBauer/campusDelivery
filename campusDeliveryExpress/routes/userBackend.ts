import express ,{Request, Response} from "express";
import {FieldPacket, QueryError, RowDataPacket} from "mysql2";
import {connection} from "../connection";
import {User} from "../../models/User";

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

router.post('/register', (req:Request, res:Response) => {
    connection.query('use campusdeliverydata');

    let oldID : number;


    connection.query(`SELECT * FROM campusdeliverydata.user WHERE username =  "${req.body.username}" OR email = "${req.body.email}"`,
        function (err:QueryError, result:RowDataPacket, field:FieldPacket){
        // let x = JSON.stringify(result);

            let x = result as User[];
            // console.log(JSON.stringify(result));

            connection.query('SELECT MAX(id) as "maxID" FROM campusdeliverydata.user', function (err:QueryError, result:RowDataPacket) {
                oldID = result[0].maxID;

                if(x.length==0){
                    connection.query(`INSERT INTO campusdeliverydata.user (id, username, email, userPassword, firstname, lastname, numberOfDeliveries, klasse)
                    VALUES (${oldID+1}, "${req.body.username}", "${req.body.email}", "${req.body.userPassword}", "${req.body.firstname}", "${req.body.lastname}", 0, "${req.body.klasse}")`,
                        function (err:QueryError){
                            console.log(err);
                        });
                    res.sendStatus(201);
                    return;
                }
                else
                {
                    res.sendStatus(406);
                    return;
                }
            });
        });

});


module.exports = router;


