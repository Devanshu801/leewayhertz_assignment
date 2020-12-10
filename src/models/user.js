const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    phone: {
        type: Number
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.avatar

    return userObject;
}

const User = mongoose.model('User', userSchema)

module.exports = User;