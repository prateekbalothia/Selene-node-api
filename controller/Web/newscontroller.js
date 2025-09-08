const newsmodel = require('../../models/newsmodel')

const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const newsletter = async (req, res) => {
    const { sub_name } = req.body;


    if (!sub_name || sub_name == null) {
        return res.send({ "status": "error", message: "newsletter subscribe failed" });
    }

    const existing = await newsmodel.findOne({ sub_name });
    if (existing) {
        return res.send({ status: "error", message: "email already exists" })
    }

    const newsub = new newsmodel({
        sub_name
    })


    const saveNewsletter = await newsub.save();
    return res.send({ "status": "success", message: "newsletter subscribe successfully" });
}
module.exports = { newsletter }