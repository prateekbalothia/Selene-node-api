const UserModel = require('../../models/UserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const newUserProcess = async (req, res) => {
    const { username, password, email, phone } = req.body;
    console.log(email);
    const emailexist = await UserModel.find({ email: email })

    if (emailexist.length > 0) {
        return res.send({ status: "error", message: "⚠️ Email Already Exists" })
    }
    if (!username || username.trim() === "" || username == null) {
        return res.send({ status: "error", message: "⚠️ Provide Name" })
    }
    if (!email || email.trim() === "" || email == null) {
        return res.send({ status: "error", message: "⚠️ Provide email" })
    }
    if (!password || password.trim() === "" || password == null) {
        return res.send({ status: "error", message: "⚠️ Provide Password" })
    }
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(email)) {
        return res.send({ status: "error", message: "⚠️ Invalid email" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new UserModel({
        username,
        password: hashedPassword,
        email,
        phone
    })
    const saveUser = await newUser.save()
    return res.send({ status: "success", data: saveUser })

}

const userAuthProcess = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.send({ status: "error", message: "⚠️Invalid Details" })
    }

    const userdata = await UserModel.findOne({ username: username })
    if (!userdata) {
        return res.send({ status: "error", message: "Something Went Wrong" })
    }
    else {
        bcrypt.compare(password, userdata.password, (err, result) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return;
            }
            let secret = process.env.token_secret
            if (result == true) {
                const jwttoken = jwt.sign({email:userdata.email}, secret)
                return res.send({status:"success",token:jwttoken})
            }
            else {
                console.log("Invalid email or password");
            }
        });
    }
}

module.exports = { newUserProcess, userAuthProcess }