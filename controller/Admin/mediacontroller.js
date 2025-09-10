const mediamodel = require('../../models/mediamodel')

const getMedia = async (req,res) => {
    const media = await mediamodel.find();
    return res.send({status:"success",data:media,image_upload_path:process.env.media_upload_path})
}

const uploadFile = async (req, res) => {
    
    const {filename,originalname}  = req.file;
    // console.log(filename);

    const newMedia = new mediamodel({
        filename,
        originalname
    })

    await newMedia.save()

    return res.send({status:"success",message:"Uploaded Successfully"})
}

const deleteMedia = async (req,res) => {
    
    const {_id} = req.params;
    await mediamodel.deleteOne({ _id: _id })
    return res.send({status:"success", message:"Deleted successfully"})
}

const updateMedia = async (req,res) => {
    // console.log(req.params);
    const {_id} = req.params;
    const mediaFile = await mediamodel.findById(_id);
    if (!mediaFile) {
        return res.send({ status: "error", message: "Not found" });
    }
    const newStatus = mediaFile.media_status === 1 ? 0 : 1;

    await mediamodel.updateOne(
        {_id},
        { $set: { media_status: newStatus } }
    )
    return res.send({ status: "success", message:'status updated successfully' })
}

module.exports = {getMedia, uploadFile, deleteMedia, updateMedia}