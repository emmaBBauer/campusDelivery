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
    connection_1.connection.query(`SELECT * FROM campusdeliverydata.shops`, function (err, result) {
        if (JSON.stringify(result).length == 2) {
            res.sendStatus(406);
            console.log("datenbank leer");
            return;
        }
        else {
            res.send(JSON.stringify(result));
            return;
        }
    });
});
router.get('/getProducts', (req, res) => {
    connection_1.connection.query('use campusdeliverydata');
    connection_1.connection.query(`SELECT product FROM campusdeliverydata.products WHERE shopid = ${req.query.shop}`, function (err, result) {
        if (JSON.stringify(result).length == 2) {
            res.sendStatus(406);
            console.log("datenbank leer");
            return;
        }
        else {
            res.send(JSON.stringify(result));
            return;
        }
    });
});
module.exports = router;
