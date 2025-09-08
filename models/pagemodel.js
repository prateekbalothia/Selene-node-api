const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    page_name:String,
    page_slug:String,
    page_usefull_links_status:{type:Number, enum:[0,1], default:0},
    page_our_services_status:{type:Number, enum:[0,1], default:0}

},
{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at"
    }
});

const pagemodel = mongoose.model('page', pageSchema);

module.exports = pagemodel;