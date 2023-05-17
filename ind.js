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
// __________________________________________________________________
// const express = require("express")
// const app = express();

// app.get('', (req, res) => {
//     console.log("Data sent bby browser", req.query.name);
//     res.send("This is Home Page " + req.query.name)
// });

// app.get('/about', (req, res) => {
//     res.send("This is about Page")
// });

// app.get('/help', (req, res) => {
//     res.send("This is help Page")
// });

// app.listen(4400);
// ________________________________________________
// Date:17/03
// const { MongoClient } = require('mongodb');
// const url = 'mongodb://localhost:27017';
// const database = 'node';
// const client = new MongoClient(url);

// async function getData() {
//     let result = await client.connect();
//     let db = result.db(database);
//     let collection = db.collection('users'); 
//     let responce = await collection.find({}).toArray();
//     console.log(responce);
// }
// getData();
// ____________________________________________________
// const {MongoClient} = require('mongodb');
// const url = "mongodb://localhost:27017/mydb";

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     console.log("Database created!");
//     db.close();
// });
// ______________________________________________________
const { MongoClient } = require("mongodb");
const url = 'mongodb://localhost:27017';
const database = 'node';
// const client = new MongoClient(url);
MongoClient.connect(url, function (err, client) {
    if (err) {
        console.error('error occcured whil connecting to MongoDb', err);
        return;
    }
    console.log('Connected successfully to MongoDB server');
    const db = client.db(dbName);
    client.close();
});
const collection = db.collection('mycollection');
const document = { name: 'John', age: 30 };

collection.insertOne(document, function (err, result) {
    if (err) {
        console.error('Error occurred while inserting document', err);
        return;
    }
    console.log('Document inserted successfully');
});
client.close();
