const cors=require('cors')
const express=require('express')
const path=require('path')
const dbConnection=require('./config/database')
const apiError=require('./utils/apiError')

const authRoute=require('./routes/authRoute')
const courseRoute=require('./routes/courseRoute')
const orderRoute=require('./routes/orderRoute')
const couponRoute=require('./routes/couponRoute')


const errorMiddleWare=require('./middelWare/errorMiddleWare')

dbConnection()

const app=express()

app.use(express.static(path.join(__dirname,'uploads')))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(cors({origin:'*',methods:'*'}))


app.use('/api/auth',authRoute)
app.use('/api/course',courseRoute)
app.use('/api/order',orderRoute)
app.use('/api/coupon',couponRoute)

app.all("*", (req,res,next)=>{
    next(new apiError(`can't find this route ${req.originalUrl}`,400))
})

app.use(errorMiddleWare)

app.listen(5000,()=>{
    console.log('server is running ...')
})
 