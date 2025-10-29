const Contactusermodel = require('../../models/Contactusermodel')

const contactUser =async (req, res)=>{
    const {name,email,subject,message} = req.body;

    const newUser = new Contactusermodel({
        name,
        email,
        subject,
        message
    })

    const adduser = await newUser.save()
    return res.send({"status":"success",message:"Your message has been sent. Thank you!"})
}


module.exports = {contactUser}