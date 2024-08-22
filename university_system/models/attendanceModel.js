const mongoose=require('mongoose')

const attendanceSchema=new mongoose.Schema({

    doctor:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    student:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    numOfAttendance:{
        type:Number,
        default:0
    },
    subject:{
        type:mongoose.Schema.ObjectId,
        ref:'subject'
    },
},{timestamps:true})

module.exports=mongoose.model('attendance',attendanceSchema)