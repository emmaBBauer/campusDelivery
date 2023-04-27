"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("../connection");
let router = express_1.default.Router();
connection_1.connection.connect();
router.get('/getAll', (req, res) => {
    connection_1.connection.query('use campusdeliverydata');
    connection_1.connection.query('SELECT * FROM campusdeliverydata.ordering', function (err, result, fields) {
        let x = JSON.stringify(result);
        console.log(x);
        res.send(x);
    });
});
router.post('/new', (req, res) => {
    connection_1.connection.query('use campusdeliverydata');
    connection_1.connection.query('SELECT MAX(id) AS "max" FROM campusdeliverydata.ordering', function (err, result) {
        let newIp = result[0].max + 1;
        connection_1.connection.query(`INSERT INTO campusdeliverydata.ordering (id, delivery, userID, product, quantity, price, currentStatus) 
                        VALUES (${newIp}, ${req.body.delivery}, ${req.body.user}, '${req.body.product}', ${req.body.quantity}, ${req.body.price}, 'waiting')`, function (err, result) {
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
    let i = req.query.status;
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
module.exports = router;
