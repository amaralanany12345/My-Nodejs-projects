const mongoose=require('mongoose')

const commentLikeSchema=new mongoose.Schema({

        comment:{
            type:mongoose.Schema.ObjectId,
            ref:'comment'
        },
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'user'
        }

},{timestamps:true})

module.exports=mongoose.model('commentLike',commentLikeSchema)
