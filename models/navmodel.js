const mongoose = require('mongoose');

const navbarSchema = new mongoose.Schema({
    navbar_name:String,
    navbar_slug:String,
    navbar_status:{ type: Number, enum: [0, 1], default: 1 },
},
{
    timestamps:{
        createdAt:"created_at", updatedAt:"updated_at"
    }
}
);

const navmodel = mongoose.model('navbars',navbarSchema);

module.exports = navmodel;