const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Name is required"],
        unique: true
    },
    firstName: {
        type: String,
        required: [true, "Name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    gender: {
        type: Boolean,
        required: true
    },
    pic: {
        type: String,
        required: true,
        default:
            "https://www.w3schools.com/howto/img_avatar.png"
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model("User", albumSchema);