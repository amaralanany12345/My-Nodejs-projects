const mongoose=require('mongoose')

const watchLaterSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    videos:[{
        video:{
            type:mongoose.Schema.ObjectId,
            ref:'video'
        }
    }]
},{timestamps:true})

module.exports=mongoose.model('watchLater',watchLaterSchema)