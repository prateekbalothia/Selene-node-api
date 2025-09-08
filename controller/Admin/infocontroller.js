const infomodel = require('../../models/infomodel')




const themeset = async (req, res) => {
    const { website_name, address, phone, email } = req.body;
    const info = await infomodel.findOne();
    if (!info || info == null || info == '') {

        const theme = new infomodel({
            website_name,
            address,
            phone,
            email,
        })

        const addSetting = await theme.save();
        return res.send({ status: "success", message: 'data inserted successfully' })
    } else {
        const result = await info.updateOne(
            {
                $set: {
                    website_name,
                    address,
                    phone,
                    email,
                }
            }, // apply only the updated fields
        );
        return res.send({ status: "success", message: 'data updated successfully' })

    }


}



module.exports = {themeset }