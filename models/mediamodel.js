const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    media_name: String,
    media_status: {type:Number, enum:[0,1], default:1},
},
{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at"
    }
})

const mediamodel = mongoose.model('media', mediaSchema)

module.exports = mediamodel;