const productmodel = require('../../models/productmodel');
const path = require('path');

const allProducts = async (req, res) => {
    const data = await productmodel.find()
    return res.send({ status: "success", data: data, image_upload_path: process.env.media_upload_path })
}

const findProduct = async (req,res) => {
    const slug = req.params;
    // console.log(req.params.slug)
    const data = await productmodel.findOne({product_slug:slug.slug})
    // return false
    return res.send({status:"success", data:data, image_upload_path: process.env.media_upload_path})
}

module.exports = {allProducts, findProduct}