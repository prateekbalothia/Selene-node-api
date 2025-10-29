const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    subject:String,
    message:String,
    user_status:{ type: Number, enum: [0, 1], default: 1 }
},
{
    timestamps:{
        createdAt:"created_at", updatedAt:"updated_at"
    }
});

const Contactusermodel = mongoose.model('contact user',userSchema)

module.exports = Contactusermodel;