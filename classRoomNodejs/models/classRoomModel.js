const mongoose=require('mongoose')

const classRoomSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name of the class is reauired']
    },
    instructor:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    students:[{
        student:{
            type:mongoose.Schema.ObjectId,
            ref:'user'
        }
    }],
    code:{
        type:String,
        required:[true,"code of the class room is required"],
        unique:[true,'code must be unique'],
        minLength:[7,"too short code"]
    },
    works:[{
        file:{
            type:Object
        }
    }],
    assignments:[{
        assignment:{
            type:mongoose.Schema.ObjectId,
            ref:'assignment'
        }
    }],
    losesAssignment:[{
        assignment:{
            type:mongoose.Schema.ObjectId,
            ref:'assignment'
        }
    }]
    
},{timestamps:true})

classRoomSchema.post("init",(doc)=>{
    if(doc.works){
        for(let i=0;i<doc.works.length;i++){
            doc.works[i].file=`http://localhost:1000/works/${doc.works[i].file.filename}`
        }
    }
})

classRoomSchema.post("save",(doc)=>{
    if(doc.works){
        for(let i=0;i<doc.works.length;i++){
            doc.works[i].file=`http://localhost:1000/works/${doc.works[i].file.filename}`
        }
    }
})

module.exports=mongoose.model('classRoom',classRoomSchema)