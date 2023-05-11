const mongoose = require("mongoose");

const attendanceSchema=mongoose.Schema({
    email:{
        type:String
    },
    subjectName:{
        type:String
    },
    attended:{
        type:Number,
        default:0
    },
    classes:{
        type:Number,
        default:0
    }
});

module.exports = mongoose.model('Attendance Manager App', attendanceSchema);