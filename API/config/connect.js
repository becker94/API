const mysql = require("mysql");

const pool = mysql.createPool({
    host: 'db',
    user: 'root',
    password: '12345',
    database: 'API',
    connectionLimit: 10,


});



module.exports = pool;
