const productModel = require('../models/productModel')

//get products api - /api/v1/products
exports.getProducts = async (req, res, next) => {
    //search for 'keyword' in query
    const query = req.query.keyword?{name: {
        $regex: req.query.keyword,
        $options: 'i' //case insensitive
    }} : {}
    const products = await productModel.find(query) //to get all products use {}
    res.json({
        success: true,
        products
    })
}

//get single product api - /api/v1/products/:id
exports.getSingleProduct = async(req, res, next) => {
    console.log(req.params.id)
    try {
        const product = await productModel.findById(req.params.id)
        res.json({
        success: true,
        product
        })
    } catch(error) {
        res.status(404).json({ //error handling
            success: false,
            message: error.message
        })
    }
    
}