"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mysql = require('mysql2');
exports.connection = mysql.createConnection({
    host: 'localhost',
    user: 'campus',
    password: 'campusDelivery'
});
