const orderSchema=require('../models/orderSchema')
const apiError=require('../general/apiError')
const apiFeatures=require('../general/apiFeatures')
const handlers=require('./handlers')
const jwt=require('jsonwebtoken')
const cartModel=require('../models/cartModel')
const productModel=require('../models/productModel')
const userModel=require('../models/userModel')
const { updateOne } = require('../models/subCategoryModel')
const stripe=require('stripe')('sk_test_51Og9iJFbKEqUNwX1ei0oCH04bNgIeEsuuUpQYqR0yX7mGPJgO1E9E9A16W30TVC5XpCDtMgcm0YqUmmRK6bdORYl007qNzUr2C')

exports.createCashOrder = async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
    }
    if(!token){
       return next (new apiError ("token is invalid",401))
    }

    const decoded = jwt.verify(token,"abcdef")
    const currentUser= await userModel.findById(decoded.userId)
    
    const tax=0
    const shippingPrice=0
    const cart=await cartModel.findById(req.params.cartId)
    
    if(!cart){
        return next (new apiError('cart not found',404))
    }
    
    const cartPrice=cart.totalPriceAfterDicount? cart.totalPriceAfterDicount: cart.totalCartPrice
    
    const totalOrderPrice=cartPrice +tax +shippingPrice

    const order=await orderSchema.create({
        user:currentUser._id,
        cartItems:  cart.cartItems,
        totalOrderPrice
    })

    if(order){
        const bulkOption=cart.cartItems.map((item)=>({
            updateOne:{
                filter:{_id:item.product},
                update:{$inc:{quantity:-item.quantity ,sold: +item.quantity}}
            }
        }))
       
        await productModel.bulkWrite(bulkOption,{})
        await cartModel.findByIdAndDelete(req.params.cartId)
    }
    res.status(201).json({data:order})
}

exports.getAllOrder=async(req,res,next)=>{
    
}

exports.checkOutSession=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
    }
    if(!token){
       return next (new apiError ("token is invalid",401))
    }

    const decoded = jwt.verify(token,"abcdef")
    const currentUser= await userModel.findById(decoded.userId)
    

    const tax=0
    const shippingPrice=0
    const cart=await cartModel.findById(req.params.cartId)
    if(!cart){
        return next (new apiError('cart not found',404))
    }
    
    const cartPrice=cart.totalPriceAfterDicount? cart.totalPriceAfterDicount: cart.totalCartPrice
    
    const totalOrderPrice=cartPrice +tax +shippingPrice

    const session= await stripe.checkout.sessions.create({
        line_items:[{
            // name:currentUser.name,
            price:totalOrderPrice * 100,
            // currency:"usd",
            // quantity:1,
        }
    ],
    mode:"payment",
    success_url:`${req.protocol}://${req.get('host')}/orders`,
    cancel_url: `${req.protocol}://${req.get('host')}/carts`,
    customer_email:currentUser.email,
    client_reference_id:cart._id,
    })

    res.status(200).json({session})
}
