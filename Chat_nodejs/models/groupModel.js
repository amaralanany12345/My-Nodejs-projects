const mongoose=require('mongoose')

const groupSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name of group is required']
    },
    users:[{
        user:{
            type:mongoose.Schema.ObjectId
        }
    }],
    admins:[{
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
    }],
    image:Object
},{timestamps:true})

module.exports=mongoose.model('group',groupSchema)