const Product = require("../model/productmodel");

const AddProduct = async (req, res) => {
    try {
        const data = new Product({
            name: req.body.name,
            image: req.body.image,
            qty: req.body.qty,
            price: req.body.price,
            user: req.body.user,
        })
        // console.log(req.body.name);
        // console.log(User);
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
//__________________________________
const Products = async (req, res) => {
    try {
        const data = await Product.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
//_____________________________
const getAllProduct = async (req, res) => {
    try {
        const data = await Product.find().populate("user", {_id: 2, first_name:1, last_name: 1}); //{ 'first_name': first_name, 'last_name': last_name }
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//____________________________

const ProductsFind = async (req, res) => {
    try {
        const data = await Product.findById(req.params.id).populate("user");
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
//____________________________
const ProductDetail = async (req, res) => {
    try {
        const data = await Product.find().populate("user")
        // Product.aggregate([({ $group: { _id: "$name", price: { $push: "$price" } } })]).then((data) => {
        //     res.json(data)
        // })
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
    console.log(ProductDetail);
}
//____________________________
const Paginate = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 2;
    const search = req.query.search || "";
    const firstindex = (page - 1) * limit
    try {
        const user = await Product.find().populate("user").skip(firstindex).limit(limit);
        const data = await Product.find({ name: { $regex: search, $options: "i" } }).populate("user").skip(firstindex).limit(limit);
        // console.log(data);
        res.json({
            user: data,
            page: req.query.page,
            search: req.query.search,
        });

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = {
    AddProduct,
    Products,
    getAllProduct,
    ProductsFind,
    ProductDetail,
    Paginate,
}
