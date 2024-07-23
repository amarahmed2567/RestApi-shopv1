const mongoose = require('mongoose');

const product_Schema = new mongoose.Schema({
    product_name:{type:String,required:[true,'please einter product name']},
    product_image:{type:String,required:[true,'please einter product image']},
    product_price:{type:Number,required:[true,'please einter product price']}
})

exports.Product = mongoose.model('product',product_Schema)

