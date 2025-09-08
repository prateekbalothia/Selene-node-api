const footermodel = require('../../models/footermodel')


const getfooter = async (req, res) => {
    let dataa = await footermodel.findOne();
    res.send({"status":"success",data:dataa})
}

module.exports = {getfooter}    