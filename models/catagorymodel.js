const mongoose = require('mongoose');

const catagorySchema = new mongoose.Schema({
    cat_name:String,
    cat_slug:String,
    cat_status:{
        type:Number,
        enum:[0,1],
        default:1
    }
},
{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at"
    }
})

const catagorymodel = mongoose.model('catagory', catagorySchema)

module.exports = catagorymodel;