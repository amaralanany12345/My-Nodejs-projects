const orderModel=require('../models/orderModel')
const jwt=require('jsonwebtoken')
const courseModel=require('../models/courseModel')
const copounModel=require('../models/copounModel')
const userModel=require('../models/userModel')
const stripe=require('stripe')('sk_test_51Og9iJFbKEqUNwX1ei0oCH04bNgIeEsuuUpQYqR0yX7mGPJgO1E9E9A16W30TVC5XpCDtMgcm0YqUmmRK6bdORYl007qNzUr2C')
const apiError=require('../utils/apiError')

exports.buyCourse=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return next (new apiError('invalid token',404))
    }

    const decoded=jwt.verify(token,'abcdef')
    const currentUser=await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('iser is not found',404))
    }

    const course=await courseModel.findById(req.params.courseId)

    if(!course){
        return next (new apiError('course is not found',404))
    }
    const session= await stripe.checkout.sessions.create({
    //     line_items:[{
    //         // name:currentUser.name,
    //         price: 100,
    //         // currency:"usd",
    //         quantity:1,
    //     }
    // ],
    line_items: [{
        price_data: {
            currency: 'usd',
            product_data: {
                name: course.name,
                // Use the course name as the product name
            },
            unit_amount: course.price // Specify the price in cents (e.g., $1.00)
        },
        quantity: 1
    }],
    mode:"payment",
    success_url:`${req.protocol}://${req.get('host')}/course`,
    cancel_url: `${req.protocol}://${req.get('host')}/auth`,
    customer_email:currentUser.email,
    client_reference_id:course._id.toString(),
    })
    
    res.status(200).json({data:session})

}

exports.buyTheCourse=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return next (new apiError('invalid token',404))
    }

    const decoded=jwt.verify(token,'abcdef')
    const currentUser=await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('user is not found',404))
    }

    let course=await courseModel.findById(req.params.courseId)
    const coupon =await copounModel.findOne({name:req.body.coupon,expire:{$gt:Date.now()}})
    
    if(req.body.coupon){

        if(!coupon){
            return next (new apiError('coupon is not found',404))
        }
        
        const order=await orderModel.create({
            user:currentUser._id,
            course:course._id,
            price:course.price-coupon.discount
        })
        
        await courseModel.findByIdAndUpdate({_id:req.params.courseId},{$push:{students:{user:currentUser._id}}},{new:true})
        res.status(200).json({data:order})
    }
    
    else {
        const order=await orderModel.create({
            user:currentUser._id,
            course:course._id,
            price:course.price
        })
        await courseModel.findByIdAndUpdate({_id:req.params.courseId},{$push:{students:{user:currentUser._id}}},{new:true})        
        res.status(200).json({data:order})

    }
}