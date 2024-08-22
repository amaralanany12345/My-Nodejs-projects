const mongoose=require('mongoose')
const chatSchema=new mongoose.Schema({
    users:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'user'
        }
    }],
    messages:[{
        message:{
            type:mongoose.Schema.ObjectId,
            ref:'message'
        }
    }]
},

{timestamps:true})

module.exports=mongoose.model('chat',chatSchema)