const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    },
    // Image: {
    //     type: Image,
    //     required:true,
    // },
});

module.exports = mongoose.model('role', roleSchema)


// const data = await User.find({ first_name: { $regex: search, $options: "i" } })
// const search = req.query.search || "";