const mongoose=require('mongoose')
const classWorkModel=new mongoose.Schema({
    student:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    subject:{
        type:mongoose.Schema.ObjectId,
        ref:'subject'
    },
    classWork:{
        type:Number,
    },
    state:{
        type:String,
        enum:["A",'B','C','D','fail']
    }
},{timestamps:true})

module.exports=mongoose.model('classWork',classWorkModel)