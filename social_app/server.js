const mongoose=require('mongoose')
const cors=require('cors')
const dpConnection=require('./config/database')
const apiError=require('./general/apiError')

const express=require(`express`)
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({origin:'*',methods:'*'}))

const userRoute=require('./routes/userRoute')
const authRoute=require('./routes/authRoute')
const postRoute=require('./routes/postRoute')
const commentRoute=require('./routes/commentRoute')
const likeRoute=require('./routes/likeRoute')
const commentLikeRoute=require('./routes/commentLlikeRoute')

dpConnection()

app.use('/api/v3/user',userRoute)
app.use('/api/v3/auth',authRoute)
app.use('/api/v3/post',postRoute)
app.use('/api/v3/comment',commentRoute)
app.use('/api/v3/like',likeRoute)
app.use('/api/v3/commentLike',commentLikeRoute)


app.all("*", (req,res,next)=>{
    next(new apiError(`can't find this route ${req.originalUrl}`,400))
})

// global error handling middleware

// app.use(errorMiddleWare)
app.listen(3333,()=>{
    console.log('server is running ...')
})