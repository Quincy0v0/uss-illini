var http = require('http');
var db = require('./query');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("y: " + db.query_ship(5784, function(returnValue) {console.log("take", returnValue)}));
    res.end();
}).listen(8080);
