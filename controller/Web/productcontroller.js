const productmodel = require('../../models/productmodel');
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
    const { id } = req.params
    let data;
    if (id) {
        data = await productmodel.find({ product_cat_id: id })
    } else {
        data = await productmodel.find()
    }
    return res.send({ status: "success", data: data, image_upload_path: process.env.media_upload_path })
}

module.exports = { allProducts, findProduct, productByCatagory }