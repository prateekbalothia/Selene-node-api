const usermodel = require('../../models/usermodel')

const contactUser =async (req, res)=>{
    const {name,email,subject,message} = req.body;

    const newUser = new usermodel({
        name,
        email,
        subject,
        message
    })

    const adduser = await newUser.save()
    return res.send({"status":"success",message:"Your message has been sent. Thank you!"})
}


module.exports = {contactUser}