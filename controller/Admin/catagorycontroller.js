const catagorymodel = require('../../models/catagorymodel');

const allCatagories = async (req,res) => {
    const data = await catagorymodel.find();
    res.send({status:"success",data:data}) 
}

const addCatagoryProcess = async (req,res) => {
    const data = req.body;
    let reqName = data.cat_name
    let savedCatagory;
    if (data._id && data._id !== "" && Number(data._id) !== 0) {
        const idData = await catagorymodel.findById({ _id: data._id })
        const existingName = idData.cat_name
        const lowExisting = existingName.toLowerCase()
        const lowReqName = reqName.toLowerCase()
        

        if (existingName !== reqName) {
            const alreadyExistName = await catagorymodel.findOne({ cat_name: reqName })
            
            if (alreadyExistName !== null) {
                // console.log(alreadyExistName)
                return res.send({ status: "error", message: "⚠️Field already exists!" })
            }
        }
        savedCatagory = await catagorymodel.findByIdAndUpdate(
            data._id,
            { cat_name: reqName, cat_slug: req.body.cat_slug }
        )
        
    } else {

        const alreadyExistName = await catagorymodel.findOne({ cat_name: reqName})
        if (alreadyExistName !== null) {
            return res.send({ status: "error", message: "⚠️Field already exists!" })
        }
        const newCatagory = new catagorymodel({
            cat_name: reqName,
            cat_slug: req.body.cat_slug
        });
        savedCatagory = await newCatagory.save();
    }


    return res.send({ status: "success", data: savedCatagory })
}

const catStatusUpdate = async (req,res) => {
    const { id } = req.params; 
    const status = await catagorymodel.findById(id);
    
    if (!status) {
        return res.send({ status: "error", message: "Not found" });
    }
    const newStatus = status.cat_status === 1 ? 0 : 1;
    
    await catagorymodel.updateOne(
        { _id:id },
        { $set: { cat_status: newStatus } }
    )
    return res.send({ status: "success", message: 'status updated successfully' })
    
}

const catagoryById = async (req, res) => {
    const data = req.params;
    const catagoryId = await catagorymodel.findById(data.id)
    return res.send({status:"success", data:catagoryId})
}

module.exports = {allCatagories ,addCatagoryProcess, catStatusUpdate, catagoryById}