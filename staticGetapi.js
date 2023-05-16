const express = require("express")
const app = express();

app.get('', (req, res) => {
    res.send("This is Home Page")
});

app.get('/about', (req, res) => {
    res.send("This is about Page")
});

app.get('/help', (req, res) => {
    res.send("This is help Page")
});

app.listen(4400);