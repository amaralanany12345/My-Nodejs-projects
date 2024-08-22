const mongoose=require('mongoose')
const messageSchema=new mongoose.Schema({
    message:{
        type:String,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    }
},{timestamps:true})

module.exports=mongoose.model('message',messageSchema)