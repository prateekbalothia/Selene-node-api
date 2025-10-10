const slidermodel = require('../../models/Slidermodel');

const getSlider = async (req, res) => {
    const data = await slidermodel.find();
    return res.send({ status: "success", data: data, image_upload_path: process.env.media_upload_path })
}

module.exports = {getSlider}