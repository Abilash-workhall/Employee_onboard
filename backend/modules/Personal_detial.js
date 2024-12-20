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
    status: {
        type: String,
        default: "Account created"
    },
    status_id:{
        type:Number,
        default:0
    },
    Joiningdate: {
        type: Date,
    },
    SigininId: {
        type: String
    },
    docs: {
        resume: { type: String },
        marksheet_10th: { type: String },
        marksheet_12th: { type: String },
        marksheet_clg: { type: String },
    }
});

const User = mongoose.model("Onboard_Schema", userSchema);

module.exports = User;