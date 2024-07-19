const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Name is required !"]
    },
    email: {
        type: String,
        required: [true, 'Email is Required !']
    },
    phone: {
        type: Number,
        required: [true, 'Phone is Required !']
    },
    password: {
        type: String,
        required: [true, 'Password is Required !!']
    },
    role: {
        type: String,
        default: "admin"
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('admin', userSchema);
