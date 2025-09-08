const infomodel = require('../../models/infomodel')

const themesetting = async (req,res) => {
    const{website_name,address,phone,email} = req.body;

    const theme = new infomodel({
        website_name,
        address,
        phone,
        email,
    })

    const addSetting = await theme.save();
    return res.send({"status":"success",data:theme})
}

const getInfo = async (req,res) => {
    const info = await infomodel.findOne()
    return res.send({status:"success", data:info})
}

module.exports = {themesetting, getInfo}