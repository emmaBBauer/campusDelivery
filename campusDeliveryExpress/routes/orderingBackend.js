"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("../connection");
let router = express_1.default.Router();
connection_1.connection.connect();
router.post('/new', (req, res) => {
    connection_1.connection.query('use campusdeliverydata');
    connection_1.connection.query('SELECT MAX(id) AS "max" FROM campusdeliverydata.ordering', function (err, result) {
        let newIp = result[0].max + 1;
        connection_1.connection.query(`INSERT INTO campusdeliverydata.ordering (id, delivery, userID, product, quantity, price, currentStatus, notes) 
                        VALUES (${newIp}, ${req.body.delivery}, ${req.body.user}, '${req.body.product}', ${req.body.quantity}, ${req.body.price}, 'waiting', '${req.body.notes}')`, function (err, result) {
            if (err == null) {
                res.sendStatus(201);
            }
            else {
                res.sendStatus(406);
                console.log(err);
                return;
            }
        });
    });
});
router.post('/setStatus', (req, res) => {
    connection_1.connection.query('use campusdeliverydata');
    connection_1.connection.query(`UPDATE campusdeliverydata.ordering SET currentStatus='${req.query.status}' WHERE id=${req.body.orderId}`, function (err, result) {
        if (err == null) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(406);
            console.log(err);
            return;
        }
    });
});
router.get('/all', (req, res) => {
    let x = new Date();
    let today = x.getFullYear() + "-";
    if (x.getMonth() < 10) {
        let y = x.getMonth() + 1;
        today += "0" + y;
    }
    else {
        let y = x.getMonth() + 1;
        today += y;
    }
    if (x.getDate() < 10) {
        today += "-0" + x.getDate();
    }
    else {
        today += "-" + x.getDate();
    }
    console.log(today);
    connection_1.connection.query('use campusdeliverydata');
    connection_1.connection.query(`SELECT o.* FROM campusdeliverydata.ordering o INNER JOIN campusdeliverydata.delivery d 
                            ON o.delivery = d.id WHERE d.userID = ${req.query.user} AND d.deliveryDate = "${today}"`, function (err, result) {
        let newJson = JSON.stringify(result);
        if (err == null) {
            if (newJson.length == 2) {
                res.send("leider leer");
                return;
            }
            else {
                res.send(newJson);
                return;
            }
        }
        else {
            console.log(err);
            res.sendStatus(406);
            return;
        }
    });
});
router.get('/getOrder', (req, res) => {
    connection_1.connection.query('use campusdeliverydata');
    connection_1.connection.query(`SELECT * FROM campusdeliverydata.ordering WHERE id = ${req.query.id}`, function (err, result) {
        let x = JSON.stringify(result[0]);
        if (x == undefined) {
            res.sendStatus(406);
            return;
        }
        else {
            res.send(x);
            return;
        }
    });
});
module.exports = router;
