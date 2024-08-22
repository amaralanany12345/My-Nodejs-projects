const mongoose=require('mongoose')

const playlistSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    admin:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    videos:[{
        video:{
            type:Object,
            ref:'video'
        }
    }],
    channel:{
        type:mongoose.Schema.ObjectId,
        ref:'channel'
    }
    
},{timestamps:true})

playlistSchema.post('init',(doc)=>{
    if(doc.videos){
        for (let i=0;i<doc.videos.length;i++){
            doc.videos[i].video=`http://localhost:7777/videos/${doc.videos[i].video.filename}`
        }
    }
})

module.exports=mongoose.model('playlist',playlistSchema)