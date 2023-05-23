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
        const { password } = req.body;
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
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});
// compare password :
// const password = "12345";
// const hash = "$2b$10$ByQ1/Tntm7s80HjXVnWfK.Kx6aNoYjgfBXleSX0zGr4/j19HLbFNe";

// //email exists:
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const users = await User.findOne({ email })
        console.log(users, "111")

        bcrypt.compare(password, users.password, function (error, ismatch) {
            console.log(error, "errrr");
            console.log(ismatch, "aaaaaa");

            if (!ismatch) {
                console.log("password not match");
                res.status(400).json({ message: 'password not match' })
            } else {
                res.status(200).json({ message: 'Login successfully' })
            }
            // if (!users) {
            //     res.status(401).json("Email or password invalid");
            // }
            // else {
            //     res.status(200).json("Login successful");
            // }
        })
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

// pagination :
app.get('/paginate', async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 2;
    const search = req.query.search || "";
    const firstindex = (page - 1) * limit
    // new:
    try {
        const user = await User.find().skip(firstindex).limit(limit);
        const data = await User.find({ first_name: { $regex: search, $options: "i" } }).skip(firstindex).limit(limit);
        console.log(data);
        
        res.json({
            user: data,
            page: req.query.page,
            search:req.query.search,

        });
    }
    catch (error) {
        res.status(500).json({ message: error.message})
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
// update api = find by email:
app.post('/update', async (req, res) => {
    try {
        const { email } = req.body
        const data = await User.findOne({ email });
        console.log(User);
        res.send()

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});
// update api:
app.patch('/update/data', async (req, res) => {
    try {
        const updatedData = req.body
        await User.findOneAndUpdate({ email: req.body.email },
            updatedData).then(async (data) => {
                console.log(data);
                var item = await User.findById(data._id);
                res.send(item)
            })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});
//___________________________
//Upload image:
app.post('/upload/image', async(req, res, err)=>{
    // handlemultipartdata(req, res, async(err)=>{
    if (err) {
        res.json({ msgs: err.message });
    }
    // const path = require("path");
    const filePath = req.query.path
    if (!filePath) {
        return
    }
    User.upload(filePath, (error, result) => {
        const imageUpload = (req, res) => {
            res.send("file upload")
        }
        if (error) {
            res.send(error.message)
        } else {
            res.json({
                body: req.body,
                file: result,
            });
        }
    })
    const file = req.files.upload
    const filePath = path.join(__dirname, 'public', 'images', `${file.name}`)

    file.mv(filePath, err => {
        if (err) return res.status(500).send(err)
});

// });
//___________________________
app.listen(3000, () => {
    console.log(`Server started at ${3000}`)
})

