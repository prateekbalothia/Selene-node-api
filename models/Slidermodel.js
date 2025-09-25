const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    slider_name: String,
    slider_description: String,
    slider_image: {
        type: String,
        default: ""
    },
    slider_status: {
        type: Number,
        enum: [0, 1],
        default: 1,
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

const slidermodel = mongoose.model('slider_and_banner', sliderSchema);

module.exports = slidermodel