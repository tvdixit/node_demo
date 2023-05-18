const express = require("express");
var bodyParser = require('body-parser');
// const routes = require('./routes/routes');
// const router = express.Router();
const dbconnect = require('./db.js')
dbconnect();

const app = express();
app.use(express.json());

const User = require("./model/user");
const { model } = require("mongoose");
const user = require("./model/user");
//post:
app.post('/ddddataSchema/post', async (req, res) => {
    try {
        const data = new User({
            first_name: req.body.first_name,
            email: req.body.email
        });
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});
// //email exists:
app.post("/dataschema", async (req, res) => {

    try {
        const {email, first_name} = req.body;
        if (first_name === "" || !email) {
            return res.status(422).json("Please fill your details");
        }
        const userExist = await User.findOne({ first_name: first_name }, { email: email });
        if (userExist) {
            return res.status(422).json("Email already exists");
        }
        //
        const user = new User({ first_name, email});

        const userRegister = await user.save();
        if (userRegister) {
            return res.status(201).json("User registered successfully");
        }
    } catch (err) {
        console.log(err);
    }
});
//get :
app.get('/getdata', async (req, res) => {
    try {
        const data = await User.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// module.exports = mongoose.model('user', empSchema);
app.listen(3000, ()=>{
    console.log(`Server started at ${3000}`)
})
// app.use('/api', routes)
