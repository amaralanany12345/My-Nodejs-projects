const path=require('path')

const express=require('express')
const mongoose = require('mongoose');
const cors=require("cors")
const apiError=require('./general/apiError')
const dbConnection=require('./config/database')
//Routes
const CategoryRoutes=require('./routes/categoryRoute')
const subCategoriesRoutes=require('./routes/subCategoryRoute')
const brandRoutes=require('./routes/brandRoute')
const productRoute=require('./routes/productRoute')
const userRoute=require('./routes/userRoute')
const authRoute=require('./routes/authRoute')
const couponRoute=require('./routes/couponRoute')
const cartRoute=require('./routes/cartRoute')
const orderRoute=require('./routes/orderRoute')

const errorMiddleWare=require(`./middleWare/errorMiddleWare`)
dbConnection()

// expresss 
const app=express()

//middle ware
app.use(express.static(path.join(__dirname,'uploads')))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({origin:'*',methods:'*'}))

app.use(`/api/v1/categories`,CategoryRoutes)
app.use(`/api/v1/subCategories`,subCategoriesRoutes)
app.use(`/api/v1/brands`,brandRoutes)
app.use(`/api/v1/products`,productRoute)
app.use(`/api/v1/users`,userRoute)
app.use(`/api/v1/auth`,authRoute)
app.use(`/api/v1/coupons`,couponRoute)
app.use(`/api/v1/carts`,cartRoute)
app.use(`/api/v1/orders`,orderRoute)


app.all("*", (req,res,next)=>{
    next(new apiError(`can't find this route ${req.originalUrl}`,400))
})

// global error handling middleware

app.use(errorMiddleWare)

app.listen(1111,()=>{
    console.log('server is running ...')
})