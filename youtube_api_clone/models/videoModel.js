const mongoose=require('mongoose')

const videoSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name of hte video is required']
    },
    description:{
        type:String,
        required:[true,'description of hte video is required']
    },
    video:{
        type:Object
    },
    imageOfVideo:{
        type:Object
    },
    likes:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'user'
        }
    }],
    disLikes:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'user'
        }
    }],
    comments:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'user'
        },
        comment:{
            type:String,
        }
    }],
    sources:[{
        source:{
            type:String
        }
    }],
},{timestamps:true})

videoSchema.post('init',(doc)=>{
    if(doc.video){
        doc.video=`http://localhost:7777/videos/${doc.video.filename}`
    }
})

module.exports=mongoose.model('video',videoSchema)