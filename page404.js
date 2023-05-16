const express = require("express");
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, 'public');

// app.use(express.static(publicPath));

app.get('', (_, res) => {
    // console.log("Data sent by browser", req.query.name);
    res.sendFile(`${publicPath}/home.html`)
});
app.get('/about', (_, res) => {
    // console.log("Data sent by browser", req.query.name);
    res.sendFile(`${publicPath}/calculator.html`)
});

// app.get('/help', (_, res) => {
//     res.sendfile()
// });
app.get('*', (_, res) => {
    res.sendFile(`${publicPath}/404page.html`)
});

app.listen(4400);