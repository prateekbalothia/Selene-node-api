const createUserModel = require('../../models/CreateUserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const newUserProcess = async (req, res) => {
    const { username, password, email, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new createUserModel({
        username,
        password: hashedPassword,
        email,
        phone
    })
    const saveUser = await newUser.save()
    return res.send({ status: "success", data: saveUser })

}

module.exports = { newUserProcess }