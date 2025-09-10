const productmodel = require('../../models/productmodel');

const allProducts = (req, res) => {

}

function createSlug(str) {
    return str
        .toLowerCase() // Convert string to lowercase
        .replace(/[^\w\s-]/g, '') // Remove non-word characters
        .trim() // Trim leading/trailing whitespace
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/--+/g, '-'); // Replace multiple - with single -
}

const addProductProcess = async (req, res) => {
    const { product_name,
        product_slug,
        product_quantity,
        product_selling_price,
        product_discount_price,
        product_mrp,
        product_image,
        meta_description,
        meta_title,
        meta_keyword, } = req.body;

        if(!product_slug){
            const product_slug = createSlug(product_name)
        }

    const newProduct = new productmodel({
        product_name,
        product_slug,
        product_quantity,
        product_selling_price,
        product_discount_price,
        product_mrp,
        product_image,
        meta_description,
        meta_title,
        meta_keyword
    })
    const savedProduct = await newProduct.save();

    return res.send({status:"success",data: savedProduct})
}

module.exports = {addProductProcess}