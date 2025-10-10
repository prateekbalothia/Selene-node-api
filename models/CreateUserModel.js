const mongoose = require('mongoose');

const createUserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: Number,
    user_status: {
        type: Number,
        enum: [0, 1],
        default: 0
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

const createUserModel = mongoose.model('users', createUserSchema);

module.exports = createUserModel