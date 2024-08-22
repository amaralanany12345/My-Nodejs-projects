const mongoose=require('mongoose')

const copounSchema=new mongoose.Schema({
    expire:{
        type:Date,
        required:[true,'expired is required']
    },
    name:{
        type:String,
        required:[true,'name is required'],
        unique:true
    },
    discount:{
        type:Number,
        required:[true,'discount is required']
    },
    course:{
        type:mongoose.Schema.ObjectId,
        ref:'course'
    }

},{timestamps:true})

module.exports=mongoose.model('copoun',copounSchema)