const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    sub_name: String,
    news_status: { type: Number, enum: [0, 1], default: 1 },
    },
    {
        timestamps: {
            createdAt: "created_at", updatedAt: "updated_at"
        }
    }
);

const newsmodel = mongoose.model('newsletter', newsSchema);

module.exports = newsmodel;