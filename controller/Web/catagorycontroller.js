const catagorymodel = require('../../models/catagorymodel');

const allCatagories = async (req, res) => {
    const data = await catagorymodel.find()
    return res.send({status:"success", data:data})

}

module.exports = {allCatagories}