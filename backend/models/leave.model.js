const mongoose = require("mongoose");
const constant = require("./../constant");
const {CASUAL,SICK} = constant.leaveOption;
const leaveSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    leaveType:{
        type:Number,
        enum:[CASUAL,SICK]
    },
    fromDate:{
        type:Date
    },
    toDate:{
        type:Date
    }
},{timestamps:true});

module.exports = mongoose.model("leave",leaveSchema);