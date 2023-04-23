const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide username"]
    },
    department:{
        type:String,
        required:[true,"Please provide department name"]
    },
    casualLeaves: { type: Number, default: 2 },
    sickLeaves: { type: Number, default: 2 }
},{
    timestamps:true
});

module.exports = mongoose.model("users",userSchema);