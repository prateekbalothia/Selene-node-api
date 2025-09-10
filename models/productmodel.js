const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: String,
    product_slug: String,
    product_quantity: Number,
    product_selling_price: Number,
    product_discount_price: Number,
    product_mrp: Number,
    product_image: String,
    meta_description: String,
    meta_title: String,
    meta_keyword: String,
    product_status:{
        type:Number,
        enum:[0,1],
        default:1
    }
},
{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at"
    }
})

const productmodel = mongoose.model('products', productSchema)

module.exports = productmodel;