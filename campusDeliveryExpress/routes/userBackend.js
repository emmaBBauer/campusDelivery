"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("../connection");
let router = express_1.default.Router();
connection_1.connection.connect();
router.get('/', (req, res) => {
    connection_1.connection.query('use campusdeliverydata');
    connection_1.connection.query('SELECT * FROM campusdeliverydata.user', function (err, result, fields) {
        let x = JSON.stringify(result);
        console.log(x);
        res.send(x);
    });
});
router.post('/register', (req, res) => {
    connection_1.connection.query('use campusdeliverydata');
    let oldID;
    connection_1.connection.query(`SELECT * FROM campusdeliverydata.user WHERE username =  "${req.body.username}" OR email = "${req.body.email}"`, function (err, result, field) {
        // let x = JSON.stringify(result);
        let x = result;
        // console.log(JSON.stringify(result));
        connection_1.connection.query('SELECT MAX(id) as "maxID" FROM campusdeliverydata.user', function (err, result) {
            oldID = result[0].maxID;
            if (x.length == 0) {
                connection_1.connection.query(`INSERT INTO campusdeliverydata.user (id, username, email, userPassword, firstname, lastname, numberOfDeliveries, klasse)
                    VALUES (${oldID + 1}, "${req.body.username}", "${req.body.email}", "${req.body.userPassword}", "${req.body.firstname}", "${req.body.lastname}", 0, "${req.body.klasse}")`, function (err) {
                    console.log(err);
                });
                res.sendStatus(201);
                return;
            }
            else {
                res.sendStatus(406);
                return;
            }
        });
    });
});
module.exports = router;
