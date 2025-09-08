const { default: mongoose } = require("mongoose");

const infoSchema = new mongoose.Schema({
    website_name:String,
    address:String,
    phone:String,
    email:String,
    info_status:{
        type:Number,enum:[0,1],default:1,
    }
},{
    timestamps:{
        createdAt:'createed_at', updatedAt:'updated_at'
    }
})

const infomodel = mongoose.model('themesetting',infoSchema);

module.exports = infomodel;