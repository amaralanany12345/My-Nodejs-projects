const mongoose=require('mongoose')

const assignMentSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,'name is required'],
    },
    instructor:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    classRoom:{
        type:mongoose.Schema.ObjectId,
        ref:'classRoom'
    },
    degree:{
        type:Number,
        required:[true,"degree is required"]
    },
    deadline:{
        type:Date,
        required:[true,'deadline is required'],
    },
    studentsComplete:[{
        student:{
            type:mongoose.Schema.ObjectId,
            ref:'user'
        },
        taskDelievered:{
            type:Object
        },
        date:{
            type:Date
        },
        penalty:{
            type:Boolean
        },
        degree:Number,
    }],

},{timestamps:true})

assignMentSchema.post("init",(doc)=>{
    if(doc.studentsComplete){
        for(let i=0;i<doc.studentsComplete.length;i++){
            doc.studentsComplete[i].taskDelievered=`http://localhost:1000/assignmnets/${doc.studentsComplete[i].taskDelievered.filename}`
        }
    }
})
assignMentSchema.post("save",(doc)=>{
    if(doc.studentsComplete){
        for(let i=0;i<doc.studentsComplete.length;i++){
            doc.studentsComplete[i].taskDelievered=`http://localhost:1000/assignmnets/${doc.studentsComplete[i].taskDelievered.filename}`
        }
    }
})
module.exports=mongoose.model('assignment',assignMentSchema)