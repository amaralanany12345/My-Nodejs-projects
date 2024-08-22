const mongoose=require('mongoose')
const commentSchema=new mongoose.Schema({
    comment:{
        type:String
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    post:{
        type:mongoose.Schema.ObjectId,
        ref:'post'
    },
    likes:[{
        // commentLike:{
        //     type:mongoose.Schema.ObjectId,
        //     ref:'commentLike'
        // },
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'user'
        }
    }]
})

module.exports=mongoose.model('comment',commentSchema)