const express = require('express');
const router = express.Router()

const { AddProduct, Products, getAllProduct, ProductsFind, ProductDetail, Paginate } = require("../controller/productcontroller")

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const Upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'upload/image')
        },
        filename: (req, file, cb) => {
            const fileExtName = file.originalname.substring(file.originalname.lastIndexOf('.'));
            const fileName = `${uuidv4()}${fileExtName}`;
            cb(null, fileName);
        }
    })

}).array('image')
router.post("/upload/image", Upload, async (req, res) => {
    res.send("file upload")
})

//________________________________________________________
router.post(
    "/addproduct",
    AddProduct
)

router.get(
    "/",
    Products
)
router.get(
    "/allProduct",
    getAllProduct
)

router.get(
    "/product/:id",
    ProductsFind
)

router.get(
    "/detail",
    ProductDetail
)

router.get(
    "/paginate",
    Paginate
)

module.exports = router;