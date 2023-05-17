const express = require('express');
var connectToMongo = require('./db');
const app = express();
var { MongoClient } = require('mongodb');

app.use(express.json());
connectToMongo()

app.get('/', async (req, res) => {
    let data = await connectToMongo();
    data = await data.find({qun:'12'}).toArray();
    console.log(data)
    res.send(data);
});