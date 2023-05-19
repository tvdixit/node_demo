const express = require("express");
// var bodyParser = require('body-parser');
const dbconnect = require('./db.js')
dbconnect();

const app = express();
app.use(express.json());

// const User = require("./model/user");
const User = require("./model/regmodel");
const { model } = require("mongoose");
const bcrypt = require("bcrypt")
// const { hash } = require("bcrypt");

//post:
app.post('/register', async (req, res) => {

try {
    const {password} = req.body;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {   
            
            const data = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hash,
                phone: req.body.phone,
                avatar: req.body.avatar,
                gender: req.body.gender,
                dob: req.body.dob,
                active: req.body.active,
                address: req.body.address,
                city: req.body.city
            });
            const dataToSave = await data.save();
            res.status(200).json(dataToSave)
        });
    });
    //
       
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});
// //email exists:
app.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email, password })
        if (!user) {
            res.status(401).json("Email or password invalid");
        }
        else {
            res.status(200).json("Login successful")
        }
    } catch (err) {
        res.status(400).json("Error")
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
//Get by id :
app.get('/getdata/:id', async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// get data by id in body :
app.post('/data/posts', async (req, res) => {
    try {
        const data = await User.findById(req.body._id);
        console.log(User, "Data From");
        res.send(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

app.listen(3000, () => {
    console.log(`Server started at ${3000}`)
})

