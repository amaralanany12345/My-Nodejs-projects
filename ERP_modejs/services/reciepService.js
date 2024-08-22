const apiError=require('../general/apiError')
const reciepModel=require('../models/reciepModel')
const cutomerModel=require('../models/customerModel')
const customerModel = require('../models/customerModel')

exports.paymentOfReciep=async(req,res,next)=>{
    const reciep=await reciepModel.findById(req.params.reciepId)
    if(!reciep){
        return next (new apiError('recipe is not found',404))
    }

    reciep.paid+=req.body.price
    reciep.remaining=reciep.deserved-reciep.paid
    await reciep.save()
    const customer=await customerModel.findById(reciep.customer)
    if(!customer){
        return next (new apiError('customer is not found',404))
    }
    customer.paid+=req.body.price
    customer.remaining=customer.deserved-customer.paid
    await customer.save()
    res.status(200).json({data:reciep})
}

