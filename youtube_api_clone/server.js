const path=require('path')
const express=require('express')
const cors=require('cors')
const apiError=require('./general/apiError')
const dbConnection=require('./config/database')

const authRoute=require('./routes/authRoute')
const channelRoute=require('./routes/channelRoute')
const playlistRoute=require('./routes/playlistRoute')
const videoRoute=require('./routes/videoRoute')
const watchLaterRoute=require('./routes/watchLaterRoute')


const app=express()
dbConnection()

app.use(express.static(path.join(__dirname,'uploads')))
app.use(express.urlencoded({extended:true}))

app.use(express.json())
app.use(cors({origin:"*",methods:"*"}))

app.use('/api/auth',authRoute)
app.use('/api/channel',channelRoute)
app.use('/api/playlist',playlistRoute)
app.use('/api/video',videoRoute)
app.use('/api/watchLater',watchLaterRoute)

app.all("*", (req,res,next)=>{
    next(new apiError(`can't find this route ${req.originalUrl}`,400))
})

app.listen(7777,()=>{
    console.log('server is running')
})