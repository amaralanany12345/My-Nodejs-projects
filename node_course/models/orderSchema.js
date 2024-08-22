const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:[true,'order must belong to user']
    },
    cartItems:[{
        product:{
            type:mongoose.Schema.ObjectId,
            ref:"product",
        },
        quantity:{
            type:Number,
        },
        price:Number,
    },],
    taxPrice:{
        type:Number,
        default:0
    },
    shippingPrice:{
        type:Number,
        default:0
    },
    totalOrderPrice:{
        type:Number,

    },
    payMentType:{
        type:String,
        enum:['cash','card'],
        default:'cash'
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    paidAt:Date,
    isDelivered:{
        type:Boolean,
        default:false
    },
    deliverdAt:Date
},{timestamps:true})

module.exports=mongoose.model('order',orderSchema)