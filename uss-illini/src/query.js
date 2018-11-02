exports.query_ship = function(shipId, callback) {
    var mysql = require('mysql');
    var result;

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "erick"
    });

    con.connect(function(err) {
        if (err) throw err;

        var query = con.query("SELECT * FROM ship WHERE ship_id = '" + shipId.toString() + "'");
        query.on('error', function(err) {
            throw err;
        });

        query.on('fields', function(fields) {
            console.log("hello 2", fields);
        });

        query.on('result', function(result) {
            console.log("hello 3 ", result);
            ret = result;
            callback(result);
        });
        console.log("hello 1");

        con.end();
    });
    
    console.log("ret2", result);
    return result;
}
