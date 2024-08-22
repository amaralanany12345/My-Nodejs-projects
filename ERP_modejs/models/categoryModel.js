const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name of the category is required'],
    },
    products:[{
        product:{
            type:mongoose.Schema.ObjectId,
            ref:'product'
        }
    }],
    
},{timestamps:true})

module.exports=mongoose.model('category',categorySchema)