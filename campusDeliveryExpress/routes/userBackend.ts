import express ,{Request, Response} from "express";
import {FieldPacket, QueryError, RowDataPacket} from "mysql2";
import {connection} from "../connection";
import {User} from "../../models/User";
import {Login} from "../../models/Login";

let router = express.Router();

connection.connect();

router.get('/getAll', (req:Request, res:Response) => {

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
            let x = result as User[];

            connection.query('SELECT MAX(id) as "maxID" FROM campusdeliverydata.user', function (err:QueryError, result:RowDataPacket) {
                oldID = result[0].maxID;

                if(err==null) {

                    if (x.length == 0) {
                        connection.query(`INSERT INTO campusdeliverydata.user (id, username, email, userPassword,
                                                                               firstname, lastname, numberOfDeliveries,
                                                                               klasse)
                                          VALUES (${oldID + 1}, "${req.body.username}", "${req.body.email}",
                                                  "${req.body.userPassword}", "${req.body.firstname}",
                                                  "${req.body.lastname}", 0, "${req.body.klasse}")`,
                            function (err: QueryError) {
                                console.log(err);
                            });
                        res.sendStatus(201);
                        return;
                    } else {
                        res.sendStatus(406);
                        return;
                    }
                }
                else{
                    res.sendStatus(406);
                    return;
                }
            });
        });
});


router.post('/login', (req:Request, res:Response) => {
    connection.query('use campusdeliverydata');

    let loginUser :Login = req.body as Login;

    connection.query(`SELECT userPassword AS "PW" FROM campusdeliverydata.user WHERE username = "${loginUser.username}"`,
        function (err:QueryError, result:RowDataPacket){

            if(result[0] == undefined){
                res.sendStatus(406);
                console.log("user does not exist");
                return;
            }

            console.log(result[0]);

            if(result[0].PW == loginUser.userPassword){
                connection.query(`SELECT * FROM campusdeliverydata.user WHERE username = "${loginUser.username}"`,
                    function (err:QueryError, result:RowDataPacket){
                        let response = JSON.stringify(result[0]);

                        if(err==null){
                            console.log(response);
                            res.send(response);
                            return;
                        }
                        else{
                            res.sendStatus(406);
                            return;
                        }

                    })
            }
            else
            {
                res.send("password incorrect");
                console.log("password incorrect");
                return;
            }
        });
});



router.get('/getUser', (req:Request, res:Response) => {

    connection.query('use campusdeliverydata');
    connection.query(`SELECT username, firstname, lastname FROM campusdeliverydata.user WHERE id = ${req.query.user}`,
        function (err:QueryError, result:RowDataPacket, fields:FieldPacket){

        let x = JSON.stringify(result[0]);

        if(x == undefined){
            res.sendStatus(406);
            return;
        }
        else{
            res.send(x);
            return;
        }
    });
});


module.exports = router;


