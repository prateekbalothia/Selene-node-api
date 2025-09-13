const path = require('path');
const fs = require('fs');
const productmodel = require('../../models/productmodel');
const { log } = require('console');

const allProducts = async (req, res) => {
    const data = await productmodel.find()
    return res.send({ status: "success", data: data, image_upload_path: process.env.media_upload_path })
}

const productById = async (req, res) => {
    const { id } = req.params
    const product = await productmodel.findById(id)

    return res.send({ status: "success", data: product ,image_upload_path: process.env.media_upload_path })
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
    const filenamee = req?.file?.filename;
    const {
        _id,
        product_name,
        product_slug,
        product_description,
        product_quantity,
        product_quantity_gms,
        product_selling_price,
        product_discount_price,
        product_mrp,
        meta_description,
        meta_title,
        meta_keyword, } = req.body;

    if (!product_slug) {
        const product_slug = createSlug(product_name)
    }

    if (Number(product_discount_price) > Number(product_mrp) || Number(product_discount_price) == Number(product_mrp)) {
        if (product_discount_price > product_mrp) {

            return res.send({ status: "error", message: "⚠️ Discount price cannot be greater than MRP!" })

        } else if (product_discount_price == product_mrp) {
            return res.send({ status: "error", message: "⚠️ Discount price and MRP cannot be same!" })
        }
    }

    let saveProduct;
       
    if (_id && _id !== "" && Number(_id) !== 0) {
        let image;
        if (filenamee && filenamee !== "" && filenamee !== undefined) {
            image = filenamee
        }
        
        const saveProduct = await productmodel.findByIdAndUpdate(
            _id,
            {
                product_name,
                product_slug,
                product_description,
                product_quantity,
                product_quantity_gms,
                product_selling_price,
                product_discount_price,
                product_mrp,
                product_image:image,
                meta_description,
                meta_title,
                meta_keyword
            }
        )
    } else {

        const newProduct = new productmodel({
            product_name,
            product_slug,
            product_description,
            product_quantity,
            product_quantity_gms,
            product_selling_price,
            product_discount_price,
            product_mrp,
            product_image: filenamee!==undefined?filenamee:"",
            meta_description,
            meta_title,
            meta_keyword
        })
        const saveProduct = await newProduct.save();

    }
    return res.send({ status: "success", data: saveProduct })
}

const productDeleteProcess = async (req, res) => {

    const { _id } = req.params;
    const product = await productmodel.findById(_id);
    if (!product) {
        return res.send({ status: "error", message: "Not found" });
    }
    if (product?.product_image) {
        const filepath = path.join(process.cwd(), "public/uploads", product.product_image)
        fs.unlink(filepath, (err) => {
            if (err) {
                console.warn("error deleting file: ", err.message)
            } else {
                console.log("file delete: ", filepath)
            }
        })
    }
    await productmodel.findByIdAndDelete(_id)
    return res.send({ status: "success", message: "Deleted successfully" })
}

const productUpdateProcess = async (req, res) => {
    const { _id } = req.params;
    // console.log(_id);
    // return false
    const product = await productmodel.findById(_id);
    if (!product) {
        return res.send({ status: "error", message: "Not found" });
    }
    const newStatus = product.product_status === 1 ? 0 : 1;

    await productmodel.updateOne(
        { _id },
        { $set: { product_status: newStatus } }
    )
    return res.send({ status: "success", message: 'status updated successfully' })
}

module.exports = { allProducts, addProductProcess, productDeleteProcess, productUpdateProcess, productById }