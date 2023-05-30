const mongoose = require('mongoose');
// Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    qty: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role"
    },
    created_at: {
        type: Date,
        default: Date(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model('product', ProductSchema)
