const customerModel=require('../models/customerModel')
const apiError=require('../general/apiError')
const reciepModel = require('../models/reciepModel')

exports.addCustomer=async(req,res,next)=>{
    const customer=await customerModel.create({
        name:req.body.name,
        phone:req.body.phone
    })
    res.status(201).json({data:customer})
}

exports.getCustomers=async(req,res,next)=>{
    const customers=await customerModel.find()
    res.status(201).json({data:customers})
}

exports.getCustomerStatus=async(req,res,next)=>{
    const customer=await customerModel.findById(req.params.customerId)
    if(!customer){
        return next (new apiError('customer is not found',404))
    }
    res.status(200).json({data:customer})
}

exports.paymentOfExpenses=async(req,res,next)=>{
    const customer=await customerModel.findById(req.params.customerId)
    if(!customer){
        return next (new apiError('customer is not found',404))
    }
    customer.paid +=req.body.price
    customer.remaining=customer.deserved-customer.paid
    if(customer.remaining<0){
        return next (new apiError("remaining is less than zero",404))
    }
    await customer.save()
    
    res.status(200).json({data:customer})
}

