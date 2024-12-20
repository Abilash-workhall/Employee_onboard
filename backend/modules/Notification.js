const mongoose = require('mongoose')
const Notification_Scnhema= new mongoose.Schema({
    ByUserId:{
        type:String,
        required: true
    },
    ToUserId:{
        type:String,
        required: true
    },
    Message:{
        type:String,
        required:true,
    },
    sdate:{
        type:Date,
    }
});

const User = mongoose.model("Notification", Notification_Scnhema);

module.exports = User;