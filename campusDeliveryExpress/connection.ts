const mysql      = require('mysql2');
export const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'campus',
    password : 'campusDelivery'
});