const mongoose=require('mongoose')

const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    post:{
        type:mongoose.Schema.ObjectId,
        ref:'post'
    },

})

module.exports=mongoose.model('like',likeSchema)