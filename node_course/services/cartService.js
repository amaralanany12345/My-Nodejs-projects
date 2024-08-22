const cartModel=require('../models/cartModel')
const productModel=require('../models/productModel')
const couponModel=require('../models/couponModel')
const userModel=require('../models/userModel')
const apiError=require('../general/apiError')
const apiFeatures=require('../general/apiFeatures')
const handlers=require('./handlers')
const jwt=require('jsonwebtoken')
const authService=require('../services/authService')

exports.getUserCart = async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
        // next();
    }
    if(!token){
       return next (new apiError ("token is invalid",401))
    }

    const decoded = jwt.verify(token,"abcdef")
    const currentUser= await userModel.findById(decoded.userId)
    
    const cart=await cartModel.findOne({user:currentUser._id})
    if(!cart){
        return next (new apiError("user not have cart",404))
    }
    res.status(200).json({numOfCartItem:cart.cartItems.length,data:cart})
}

// disc: create cart 
// route: post /api/v1/categories
// acess: private

exports.addCart= async (req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
        // next();
    }
    if(!token){
       return next (new apiError ("token is invalid",401))
    }

    const decoded = jwt.verify(token,"abcdef")
    const currentUser= await userModel.findById(decoded.userId)
    const {productId}=req.body
    
    const product=await productModel.findById(productId)
    
    let cart=await cartModel.findOne({user:currentUser._id})
    if(!cart){
        cart=cartModel.create({
            user:currentUser._id,
            cartItems:[{product:productId,price:product.price}]
        })
    }
    else {
        const productIndex=cart.cartItems.findIndex(
            (item)=> item.product.toString()==productId
            )
            if(productIndex>-1){
                const cartItem=cart.cartItems[productIndex]
                cartItem.quantity+=1;
                cart.cartItems[productIndex]=cartItem
            }
            else{
                const product=await productModel.findById(productId)

                cart.cartItems.push({product:productId,price:product.price})
            }
    }
    let total=0;
    for(let i=0;i<cart.cartItems.length;i++){
        total+=cart.cartItems[i].quantity * cart.cartItems[i].price
    }
    cart.totalCartPrice=total
    await cart.save();
    res.status(201).json({data:cart})
}


// disc:  update cart 
// route: post /api/v1/categories
// acess: private

exports.updateCartItemQuantity = async(req,res,next)=>{
    const {quantity}=req.body
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
    }
    if(!token){
       return next (new apiError ("token is invalid",401))
    }
    
    const decoded = jwt.verify(token,"abcdef")
    const currentUser= await userModel.findById(decoded.userId)
    const cart=await cartModel.findOne({user:currentUser._id})
    if(!cart){
        return next (new apiError('cart is not found',404))
    }

    let itemIndex=cart.cartItems.findIndex((item)=>item._id.toString() == req.params.itemId)
    if(itemIndex>-1){
        const cartItem=cart.cartItems[itemIndex]
        cartItem.quantity=quantity
        cart.cartItems[itemIndex]= cartItem
    }
    else {
        return next (new apiError(`there is no item for this id ${currentUser._id}`,404))
    }
    let total=0;
   
    for(let i=0;i<cart.cartItems.length;i++){
        total+=cart.cartItems[i].quantity * cart.cartItems[i].price
    }
    cart.totalCartPrice=total
    await cart.save();
    res.status(201).json({data:cart})

}

// disc:  delete specific cart 
// route: delete /api/v1/categories
// acess: private

exports.clearCart= async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
    }
    if(!token){
       return next (new apiError ("token is invalid",401))
    }
    
    const decoded = jwt.verify(token,"abcdef")
    const currentUser= await userModel.findById(decoded.userId)
    await cartModel.findOneAndDelete({user:currentUser._id})
    res.status(204).send("deleted")
    
}

exports.removeSpecificCartItem =async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
    }
    if(!token){
       return next (new apiError ("token is invalid",401))
    }

    const decoded = jwt.verify(token,"abcdef")
    const currentUser= await userModel.findById(decoded.userId)
    const cart=await cartModel.findOneAndUpdate({user:currentUser._id},{$pull:{cartItems:{_id:req.params.itemId}}},{new:true})
    let total=0;
    cart.cartItems.forEach((item)=>{
        total+=item.quantity * item.price
    })
    cart.totalCartPrice=total
    await cart.save();
    res.status(200).json({data:cart})
}

exports.applyCoupon=async(req,res,next)=>{
    const coupon=await couponModel.findOne({name:req.body.coupon,expire:{$gt:Date.now()}})
    if(!coupon){
        return next (new apiError('coupon is expired',404))
    }
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
    }
    if(!token){
       return next (new apiError ("token is invalid",401))
    }

    const decoded = jwt.verify(token,"abcdef")
    const currentUser= await userModel.findById(decoded.userId)
    const cart=await cartModel.findOne({user:currentUser._id})
    const totalPrice=cart.totalCartPrice
    const totalPriceAfterDiscount=totalPrice- (totalPrice*coupon.discount)/100
    cart.totalPriceAfterDicount=+totalPriceAfterDiscount
    await cart.save();
    res.status(200).json({data:cart})

}