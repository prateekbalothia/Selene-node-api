const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
    footer_desc1:String,
    footer_desc2:String,
    footer_desc3:String,
    footer_desc4:String,
    footer_status:{ type: Number, enum: [0, 1], default: 1 },
}
);

const footermodel = mongoose.model('footer',footerSchema);

module.exports = footermodel;