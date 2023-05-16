const express = require("express")
const app = express();

app.get('', (req, res) => {
    res.send(`
    <h1> Welcome to Home Page</h1><a href="/about">Go to About Page </a>
    `)
});

app.get('/about', (req, res) => {
    res.send(`
    <input type="text" placeholder="User Name" value = "${req.query.name}">
    <button> Click Me</button><a href="/">Go to Home Page </a>
    
    `)
});

app.get('/help', (req, res) => {
    res.send("This is help Page")
});

app.listen(4400);