const mongoose=require('mongoose')

const semesterSchema=new mongoose.Schema({
    academicYear:{
        type:Number,
        enum:[1,2,3,4],
    },
    semesterNumber:{
        type:Number,
        enum:[1,2]
    },
    student:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    subjects:[{
        subject:{
            type:mongoose.Schema.ObjectId,
            ref:'subject'
        }
    }]

},{timestamps:true})

module.exports=mongoose.model('semester',semesterSchema)