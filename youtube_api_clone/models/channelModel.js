const mongoose=require('mongoose')

const channelSchema=new mongoose.Schema({
    name:{
        type:String
    },
    admin:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    category:{
        type:String,
        enum:["music","sport","arts","general"],
        default:"general",
    },
    playLists:[{
        playlist:{
            type:mongoose.Schema.ObjectId,
            ref:'playlist'
        }
    }],
    videos:[{
        video:{
            // type:Object,
            type:mongoose.Schema.ObjectId,
            ref:'video'
        }
    }],
    subscribers:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'user'
        }
    }]

},{timestamps:true})

// channelSchema.post('init',(doc)=>{
//     if(doc.videos){
//         for (let i=0;i<doc.videos.length;i++){
//             doc.videos[i].video=`http://localhost:7777/videos/${doc.videos[i].video.filename}`
//         }
//     }
// })

module.exports=mongoose.model('channel',channelSchema)