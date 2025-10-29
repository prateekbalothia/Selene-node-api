const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: Number,
    user_status: {
        type: Number,
        enum: [0, 1],
        default: 1
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel