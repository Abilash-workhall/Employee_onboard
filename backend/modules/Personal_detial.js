
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Fullname: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phonenumber: {
        type: Number,
        required: true
    },
    Department: {
        type: String,
        required: true
    },
    Designation: {
        type: String,
        required: true
    },
    status:{
        type:Number,
        default:0
    },
    Joiningdate:{
        type:Date,
    }
});

const User = mongoose.model("Onboard_Schema", userSchema);

module.exports = User;
