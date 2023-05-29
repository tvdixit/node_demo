const Product = require("../model/productmodel");

const Register = async (req, res) => {
    try {
        const data = new Product({
            name: req.body.name,
            image: req.body.image,
            qty: req.body.qty,
            price: req.body.price,
            user:req.body.user,
        })
        // console.log(req.body.name);
        // console.log(User);
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const Name = async (req, res) => {
    try {
        const data = await Product.findOne(req.params.name);
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
    try {
        const user = await Product.find().skip(firstindex).limit(limit);
        const data = await Product.find({ name: { $regex: search, $options: "i" } }).skip(firstindex).limit(limit);
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
    Register,
    Name,
    Paginate
}