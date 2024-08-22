const mongoose=require('mongoose')

const customerCartSchema=new mongoose.Schema({
    products:[{
        product:{
            type:mongoose.Schema.ObjectId,
            ref:'product'
        },
        quantity:{
            type:Number,
            default:1
        },
        price:Number,
    }],
    totalPrice:{
        type:Number,
    },
    customer:{
        type:mongoose.Schema.ObjectId,
        ref:'customer'
    }
},{timestamps:true})

module.exports=mongoose.model('customerCart',customerCartSchema)