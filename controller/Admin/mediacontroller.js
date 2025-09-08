const mediamodel = require('../../models/mediamodel')

const uploadFile = async (req, res) => {
    
    const media_name  = req.file.filename;
    // console.log(filename);

    const newMedia = new mediamodel({
        media_name
    })

    await newMedia.save()

    return res.send({status:"success",message:"Uploaded Successfully"})
}

module.exports = {uploadFile}