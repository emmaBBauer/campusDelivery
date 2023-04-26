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
    connection_1.connection.query('SELECT * FROM campusdeliverydata.delivery', function (err, result, fields) {
        let x = JSON.stringify(result);
        console.log(x);
        res.send(x);
    });
});
router.get('/today', (req, res) => {
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
    connection_1.connection.query('use campusdeliverydata');
    connection_1.connection.query(`SELECT * FROM campusdeliverydata.delivery WHERE deliveryDate = "${today}"`, function (err, result) {
        let re = JSON.stringify(result);
        if (err == null) {
            if (re.length == 2) {
                res.sendStatus(406);
                console.log("delivery is empty");
                return;
            }
            else {
                res.send(result);
                console.log(result);
                return;
            }
        }
        else {
            res.sendStatus(406);
            return;
        }
    });
});
router.post('/new', (req, res) => {
    connection_1.connection.query('use campusdeliverydata');
    connection_1.connection.query('SELECT MAX(id) AS "max" FROM campusdeliverydata.delivery', function (err, result) {
        let x = new Date();
        let today = x.getFullYear() + ".";
        if (x.getMonth() < 10) {
            let y = x.getMonth() + 1;
            today += "0" + y;
        }
        else {
            let y = x.getMonth() + 1;
            today += y;
        }
        if (x.getDate() < 10) {
            today += ".0" + x.getDate();
        }
        else {
            today += "." + x.getDate();
        }
        const newDelivery = {
            id: result[0].max + 1,
            userID: req.body.user,
            shop: req.body.shop,
            deliveryDate: today,
            deliveryTime: req.body.deliveryTime
        };
        connection_1.connection.query(`INSERT INTO campusdeliverydata.delivery (id, userID, shop, deliveryDate, deliveryTime)
            VALUES (${newDelivery.id}, ${newDelivery.userID}, "${newDelivery.shop}", DATE('${newDelivery.deliveryDate}'), TIME('${newDelivery.deliveryTime}'))`, function (err, result) {
            console.log(err);
            if (err == null) {
                connection_1.connection.query(`SELECT * FROM campusdeliverydata.delivery WHERE id = ${newDelivery.id}`, function (err, result) {
                    res.send(JSON.stringify(result[0]));
                    return;
                });
            }
            else {
                res.sendStatus(406);
            }
        });
    });
});
module.exports = router;
