const mongoose=require('mongoose')

const reciepSchema=new mongoose.Schema({
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
    },
    deserved:{
        type:Number,
        default:0
    },
    paid:{
        type:Number,
        date:Date,
        default:0
    },
    remaining:{
        type:Number,
        default:0,
    }
},{timestamps:true})

module.exports=mongoose.model('reciep',reciepSchema)