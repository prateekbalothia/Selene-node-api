const catagorymodel = require('../../models/catagorymodel');
const productmodel = require('../../models/productmodel')

const allCatagories = async (req, res) => {
    const data = await catagorymodel.find()
    return res.send({ status: "success", data: data })

}

const catagoryWiseProducts = async (req, res) => {
    try {
        const productImagePath = process.env.media_upload_path;
        //for all catagories
        const catagories = await catagorymodel.find({ cat_status: 1 })

        //for each catagory fatch it's products
        const result = await Promise.all(
            catagories.map(async (catagory) => {
                const products = await productmodel.find({
                    product_cat_id: catagory._id,
                    product_status: 1
                }).limit(5)
                // attach image url if needed
                const updatedProducts = products.map(p => ({
                    ...p._doc,
                    image_url: `${productImagePath}${p.product_image}`
                }));

                return {
                    ...catagory._doc,
                    products: updatedProducts
                };
            })

        )

        return res.send({status:"success", data:result, image_uplaod_path: productImagePath})

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", message: "Server Error" });
    }

}

module.exports = { allCatagories, catagoryWiseProducts}