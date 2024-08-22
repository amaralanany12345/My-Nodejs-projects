const mongoose=require('mongoose')

const hieraricalSubjectSchema=new mongoose.Schema({

    topSubject:{
        type:mongoose.Schema.ObjectId,
        ref:'subject'
    },
    treeOfSubject:[{
        subject:{
            type:mongoose.Schema.ObjectId,
            ref:'subject'
        },
    }],

},{timestamps:true})

module.exports=mongoose.model('hieraricalSubject',hieraricalSubjectSchema)
