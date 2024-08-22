const mongoose=require('mongoose')
const postSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        required:[true,'user is required'],
        ref:'user',
    },
    post:{
        type:String
    },
    comments:[{
        comment:{
            type:mongoose.Schema.ObjectId,
            ref:'comment',
            },
        content:{
            type:String
            },
            commentLikes:[{
                user:{
                    type:mongoose.Schema.ObjectId,
                    ref:'user'
                }
            }]
        }
    ],
    likes:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'user',
        }
    },]
   
    
},{timestamps:true})

module.exports=mongoose.model('post',postSchema)