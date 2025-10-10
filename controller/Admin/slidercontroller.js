const slidermodel = require('../../models/Slidermodel');

const getSlider = async (req, res) => {
    const data = await slidermodel.find();
    return res.send({ status: "success", data: data, image_upload_path: process.env.media_upload_path })
}
const addSliderProceess = async (req, res) => {
    const  file  = req?.file?.filename
    const { _id, slider_name, slider_description } = req.body;
    
    let saveSlider;
    if (_id && _id !== "" && Number(_id) !== 0) {
        let image;
        if (file && file !== "" && file !== undefined) {
            image = file
        }

        const saveSlider = await slidermodel.findByIdAndUpdate(
            _id,
            {
                slider_name,
                slider_description,
                slider_image: image
            }

        )
    } else {

        const newSlider = new slidermodel({
            slider_name,
            slider_description,
            slider_image: file !== undefined ? file : "",
        })
        saveSlider = await newSlider.save();

    }
    return res.send({ status: "success", data: saveSlider })
}

const sliderStatusUpdate = async (req, res) => {
    const { id } = req.params;
    const status = await slidermodel.findById(id);

    if (!status) {
        return res.send({ status: "error", message: "Not found" });
    }
    const newStatus = status.slider_status === 1 ? 0 : 1;

    await slidermodel.updateOne(
        { _id: id },
        { $set: { slider_status: newStatus } }
    )
    return res.send({ status: "success", message: 'status updated successfully' })

}

const sliderbyidEdit = async (req, res) => {
    const { id } = req.params;
    const slider = await slidermodel.findById({_id:id})
    console.log(slider);
    return res.send({status:"success", data:slider, image_upload_path: process.env.media_upload_path})
    
}

const sliderDeleteProcess = async (req, res) => {
    const { id } = req.params;
    const del = await slidermodel.findByIdAndDelete({_id:id})
    return res.send({status:"success", message:"✅ Deleted Successfully!!"})
}

module.exports = { getSlider, addSliderProceess, sliderStatusUpdate, sliderbyidEdit, sliderDeleteProcess}