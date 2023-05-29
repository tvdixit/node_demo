const mongoose = require('mongoose');
Schema = mongoose.Schema;
const productSchema = new mongoose.Schema({
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
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model('product', productSchema)