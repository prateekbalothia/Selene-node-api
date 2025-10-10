const { log } = require('console');
const productmodel = require('../../models/productmodel');
const catagorymodel = require('../../models/catagorymodel')
const path = require('path');

const allProducts = async (req, res) => {
    const data = await productmodel.find()
    return res.send({ status: "success", data: data, image_upload_path: process.env.media_upload_path })
}

const findProduct = async (req, res) => {
    const slug = req.params;
    // console.log(req.params.slug)
    const data = await productmodel.findOne({ product_slug: slug.slug })
    const related = data.product_cat_id
    const prods = await productmodel.find({
        product_cat_id: { $in: related },
        _id: { $ne: data._id } 
    })
    // console.log(prods.length);

    // return false
    return res.send({ status: "success", data: data, relatedProducts: prods, image_upload_path: process.env.media_upload_path })
}

const productByCatagory = async (req, res) => {
    const { slug } = req.params
    
    let data;
    if (slug) {
        const cat = await catagorymodel.find({ cat_slug: slug, cat_status: 1 })
        data = await productmodel.find({product_cat_id: cat[0]._id})
        
        
    } else {
        data = await productmodel.find()
    }
    return res.send({ status: "success", data: data, image_upload_path: process.env.media_upload_path })
}

module.exports = { allProducts, findProduct, productByCatagory }