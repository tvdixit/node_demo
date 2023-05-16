// var http = require('http');

// http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     // res.write(req.url);
//     res.end();
// }).listen(8181);

// var http = require('http');
// var url = require('url');

// http.createServer(function(req,res){
//     res.writeHead(200, {'content-Type': 'text/html'});
//     var a =url.parse(req.url, true).query;
//     var text = a.year + " " + a.month;
//     res.end(text);
// }).listen(8080);

const express = require("express")
const app = express();

app.get('', (req, res) => {
    console.log("Data sent bby browser", req.query.name);
    res.send("This is Home Page " + req.query.name)
});

app.get('/about', (req, res) => {
    res.send("This is about Page")
});

app.get('/help', (req, res) => {
    res.send("This is help Page")
});

app.listen(4400);