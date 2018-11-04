var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit :100,
    host: "localhost",
    user: "ussillini_erikaze",
    password: "219749ajfcg",
    database: "ussillini_ussillini"
});

module.exports = pool;
