const orderModel = require('../models/orderModel')
const productModel = require('../models/productModel')

//create order - /api/v1/order
exports.createOrder = async (req, res, next) => {
    const carItems = req.body;
    const amount = Number(carItems.reduce((acc, item) => (acc + (item.product.price * item.qty)), 0)).toFixed(2)
    const status = 'pending';
    console.log(amount + " amount");

    const order = await orderModel.create({carItems, amount, status});

    //Updating product stock
    carItems.forEach(async (item) => {
        const product = await productModel.findById(item.product._id);
        product.stock = item.qty;
        await product.save();
    });

    res.json({
        success: true,
        order
    })
}