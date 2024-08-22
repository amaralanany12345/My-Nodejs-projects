const customerCartModel = require('../models/customerCartModel')
const apiError=require('../general/apiError')
const customerModel = require('../models/customerModel')
const productModel = require('../models/productModel')
const reciepModel = require('../models/reciepModel')

exports.addCustomerCart=async(req,res,next)=>{
    const customerCart=await customerCartModel.create({
        customer:req.body.customerId,
    })
    res.status(201).json({data:customerCart})
}

exports.addProductToCustomerCart=async(req,res,next)=>{
    const customerCart=await customerCartModel.findById(req.params.customerCartId)
    if(!customerCart){
        return next (new apiError('customer cart is not found',404))
    }
    const product=await productModel.findById(req.body.productId)
    if(!product){
        return next (new apiError('product is not found',404))
    }
    product.stock-=req.body.quantity
    await product.save()
    let totalPrice=0
    const updatedCustomerCart=await customerCartModel.findByIdAndUpdate({_id:req.params.customerCartId},{$push:{products:{product:product._id,quantity:req.body.quantity,price:product.price}}},{new:true})
    for(let i=0;i<updatedCustomerCart.products.length;i++){
        totalPrice+=updatedCustomerCart.products[i].price*updatedCustomerCart.products[i].quantity
    }
    updatedCustomerCart.totalPrice=totalPrice
    await updatedCustomerCart.save()
    const customer=await customerModel.findById(customerCart.cutomer)
    res.status(200).json({data:updatedCustomerCart})
}

exports.deleteItemFromcutomerCart=async(req,res,next)=>{
    const customerCart=await customerCartModel.findById(req.params.customerCartId)
    if(!customerCart){
        return next (new apiError('customer cart is not found',404))
    }
    const product=await productModel.findById(req.body.productId)
    if(!product){
        return next (new apiError('product is not found',404))
    }
    const index=customerCart.products.findIndex((item)=>item.product.toString()==product._id.toString())
    if(index>-1){
        product.stock+=customerCart.products[index].quantity
        await product.save()
        customerCart.products.splice(index,1)
        let totalPrice=0
        for(let i=0;i<customerCart.products.length;i++){
            totalPrice+=customerCart.products[i].price*customerCart.products[i].quantity
        }
        customerCart.totalPrice=totalPrice
        await customerCart.save()
        res.status(200).json({data:customerCart})
    }
    else {
        return next (new apiError('this product is not found in this customer cart',404))
    }
}

exports.applyOrder=async(req,res,next)=>{
    const customerCart=await customerCartModel.findById(req.params.customerCartId)
    if(!customerCart){
        return next (new apiError('customer cart is not found',404))
    }
    const customer=await customerModel.findById(customerCart.customer)
    if(!customer){
        return next (new apiError('customer is not found',404))
    }
    
    customer.deserved+=customerCart.totalPrice
    customer.paid +=req.body.price
    customer.remaining=customer.deserved - customer.paid
    if(customer.remaining<0){
        return next (new apiError("remaining is less than zero",404))
    }
    await customer.save()
    const newRecipe=await reciepModel.create({
        products:customerCart.products,
        totalPrice:customerCart.totalPrice,
        customer:customer._id,
        deserved:customer.deserved,
        paid:customer.paid,
        remaining:customer.remaining
    })
    await customerCart.deleteOne({_id:req.params.customerCartId})
    res.status(200).json({data:customer})
}

