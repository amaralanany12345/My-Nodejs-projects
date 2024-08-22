const mongoose=require('mongoose')

const courseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    description:{
        type:String,
        required:[true,'discription is required'],
        minLength:[3,'too short discription of course'],
    },
    students:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'user'
        }
    }],
    instructor:{
            type:mongoose.Schema.ObjectId,
            ref:'user'
    },
    rate:{
        type:Number,
        min:[0.1,'too short rate number'],
        max:[5,'too long rate number']
    },
    videos:[{
        video:{
            type:Object
        }
    }],
    completed:Boolean,
    price:{
        type:Number,
        required:[true,'price is required']
    },
    priceAfterDiscount:Number
},{timestamps:true})

courseSchema.post('init',(doc)=>{
    if(doc.videos){
            for(let i=0;i<doc.videos.length;i++){
            doc.videos[i].video=`http://localhost:5000/course/${doc.videos[i].video.filename}`
        }
    }
})

courseSchema.post('save',(doc)=>{
    if(doc.videos){
            for(let i=0;i<doc.videos.length;i++){
            doc.videos[i].video=`http://localhost:5000/course/${doc.videos[i].video.filename}`
        }
    }
})

module.exports=mongoose.model('course',courseSchema)