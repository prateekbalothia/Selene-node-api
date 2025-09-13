const productmodel = require('../../models/productmodel');
const path = require('path');

const allProducts = async (req, res) => {
    const data = await productmodel.find()
    return res.send({ status: "success", data: data, image_upload_path: process.env.media_upload_path })
}

module.exports = {allProducts}