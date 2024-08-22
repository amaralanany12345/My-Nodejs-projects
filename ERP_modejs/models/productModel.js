const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name of product is required']
    },
    price:{
        type:Number,
        required:[true,'price of product is required']
    },
    stock:{
        type:Number,
        required:[true,'stock of the product is required']
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'category'
    },
    
},{timestamps:true})

module.exports=mongoose.model('product',productSchema)