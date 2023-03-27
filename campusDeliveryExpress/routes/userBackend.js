"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'campus',
    password: 'campusDelivery'
});
connection.connect();
router.get('/', (req, res) => {
    connection.query('SELECT * FROM user', function (err, result, fields) {
        console.log(result);
        res.send(result);
    });
});
module.exports = router;
connection.end();
