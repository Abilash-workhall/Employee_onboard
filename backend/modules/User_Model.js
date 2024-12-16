
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    umail: {
        type: String,
        required: true
    },
    uname: {
        type: String,
        required: true
    },
    upassword: {
        type: String,
        required: true
    },
    role:{
        type:Number,
        default:0
    },
    resetpwtoken: String,
    resetpwtokexp: Date
});

const User = mongoose.model("User", userSchema);

module.exports = User;
