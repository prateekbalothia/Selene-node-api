const slidermodel = require('../../models/Slidermodel');

const getSlider = async (req, res) => {
    const data = await slidermodel.find();
    return res.send({status:"success", data:data, image_upload_path:process.env.media_upload_path})    
}

const addSliderProceess = async (req, res) => {
    const {filename} = req.file
    const {_id,slider_name, slider_description} = req.body;
    let saveSlider;
    const sliderExist = await slidermodel.findOne()
    if (!sliderExist || sliderExist == null || sliderExist == '') {
        const newSlider = new slidermodel({
            slider_name,
            slider_description,
            slider_image: filename !== undefined ? filename : "",
        })
        saveSlider = await newSlider.save();
        return res.send({status:"success", message:"✅ Slider and Banner Added Successfully"})
        
    } else {
        let image;
        if (filename && filename !== "" && filename !== undefined) {
            image = filename
        }

        saveSlider = await slidermodel.updateOne(
            {
                $set:
                {
                    slider_name,
                    slider_description,
                    slider_image:image
                }
            }
        )
        return res.send({status:"success", message:"✅ Slider and Banner Updated Successfully"})
    }
}

const sliderStatusUpdate = async (req,res) => {
    const { id } = req.params; 
    const status = await slidermodel.findById(id);
    
    if (!status) {
        return res.send({ status: "error", message: "Not found" });
    }
    const newStatus = status.slider_status === 1 ? 0 : 1;
    
    await slidermodel.updateOne(
        { _id:id },
        { $set: { slider_status: newStatus } }
    )
    return res.send({ status: "success", message: 'status updated successfully' })
    
}

module.exports = {getSlider, addSliderProceess, sliderStatusUpdate}