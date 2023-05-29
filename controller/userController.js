const bcrypt = require("bcrypt")
const User = require("../model/regmodel");

const Signup = async (req, res, next) => {
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
                    age: req.body.age,
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
}

const Login = async (req, res) => {
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
        })
    } catch (err) {
        res.status(400).json("Error")
        console.log(err);
    }
}

const Getdata = async (req, res) => {
    try {
        const data = await User.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const Paginate = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 2;
    const search = req.query.search || "";
    const firstindex = (page - 1) * limit
    // new:
    try {
        const user = await User.find().skip(firstindex).limit(limit);
        const data = await User.find({ first_name: { $regex: search, $options: "i" } }).skip(firstindex).limit(limit);
        // console.log(data);
        res.json({
            user: data,
            page: req.query.page,
            search: req.query.search,
        });
        console.log(size);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const GetdataByid = async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const Update = async (req, res) => {
    try {
        const { email } = req.body
        const data = await User.findOne({ email });
        console.log(User);
        res.send()

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const UpdatedData = async (req, res) => {
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
}

const Delete = async (req, res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id);
        res.json(data)
        console.log(User.findByIdAndDelete(req.params.id))
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// aggregation :

const Match = async (req, res) => {
    try {
        User.aggregate([{ $match: { gender: req.query.gender } }]).then((data) => {
            res.json(data)
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const Group = async (req, res) => {
    try {
        User.aggregate([{ $group: { _id: "$age", names: { $push: "$first_name" } } }]).then((data) => {
            res.json(data)
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const Alldata = async (req, res) => {
    try {
        User.aggregate([{ $group: { _id: "$age", names: { $push: "$$ROOT" } } }]).then((data) => {
            res.json(data)
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const MatchGroup = async (req, res) => {
    try {
        User.aggregate([
            { $match: { gender: "male" } },
            { $group: { _id: "$age", names: { $push: "$first_name" }, personsAge: { $sum: 1 } } }
        ]).then((data) => {
            res.json(data)
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const MatchGroupSort = async (req, res) => {
    try {
        User.aggregate([
            { $match: { gender: "male" } },
            { $group: { _id: "$age", personsAge: { $sum: 1 } } },
            { $sort: { personsdecreseAge: -1 } }
        ]).then((data) => {
            res.json(data)
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const MatchGroupSortGroup = async (req, res) => {
    try {
        User.aggregate([
            { $match: { gender: "male" } },
            { $group: { _id: "$age", personsAge: { $sum: 1 } } },
            { $sort: { personsdecreseAge: -1 } },
            { $group: { _id: null, maxnumber: { $max: "$number" } } }
        ]).then((data) => {
            res.json(data)
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const Unwind = async (req, res) => {
    try {
        User.aggregate([{ $unwind: "$email" }, { $group: { _id: "$age", email: { $push: "$email" } } }
        ]).then((data) => {
            res.json(data)
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const GroupAvg = async (req, res) => {
    try {
        User.aggregate([{ $group: { _id: null, avgofage: { $avg: "$age" } } }]).then((data) => {
            res.json(data)
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    Signup,
    Login,
    Getdata,
    Paginate,
    GetdataByid,
    Update,
    UpdatedData,
    Delete,
    Match,
    Group,
    Alldata,
    MatchGroup,
    MatchGroupSort,
    MatchGroupSortGroup,
    Unwind,
    GroupAvg,
};