const express = require("express");
var connectToMongo = require('./db');
// var getData = require('./get')

const app = express();
const port = 4000;
app.use(express.json());
connectToMongo()

app.get('/', async (req, res) => {
    let data = await dbConnect();
    data = await data.find({ email: 'johhn' }).toArray();
    // console.log(data)
    res.send(data);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
