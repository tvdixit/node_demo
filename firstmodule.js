var http = require('http');
// var dt = require("./app");
var fs = require("fs")

http.createServer(function (req, res) {
    fs.readFile('calculator.html', function(err, data){
    res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.write("The date and time are currently: " + dt.myDateTime());
    // res.write("Total is :" + dt.dixit());
    res.write(data);
    return res.end();
    });
}).listen(8182);