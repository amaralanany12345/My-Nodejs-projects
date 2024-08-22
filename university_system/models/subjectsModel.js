const mongoose=require('mongoose')

const subjectSchema=new mongoose.Schema({
    hieraricalSubject:{
        type:mongoose.Schema.ObjectId,
        ref:'subject'
    },
    name:{
        type:String,
        required:[true,'name is required']
    },
    doctor:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    students:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'user' 
        },
    }],
    attendances:[{
        attendance:{
            type:mongoose.Schema.ObjectId,
            ref:'attendance' 
        },
    }],
    classWorks:[{
        classWork:{
            type:mongoose.Schema.ObjectId,
            ref:'classWork' 
        },
    }],
    studentsBlockedFromExam:[{
        student:{
            type:mongoose.Schema.ObjectId,
            ref:'user' 
        }
    }],
    score:{
        type:Number,
    },
},{timestamps:true})

module.exports=mongoose.model('subject',subjectSchema)
