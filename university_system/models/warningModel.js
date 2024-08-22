const mongoose=require('mongoose')

const warningSchema=new mongoose.Schema({
    warining:{
        type:String,
    },
    date:{
        type:Date
    },
    student:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    subject:{
        type:mongoose.Schema.ObjectId,
        ref:'subject'
    },

},{timestamps:true})

module.exports=mongoose.model('warnings',warningSchema)