const mongoose=require('mongoose')
const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    course:{
        type:mongoose.Schema.ObjectId,
        ref:'course'
    },
    price:Number,

})

module.exports=mongoose.model('order',orderSchema)