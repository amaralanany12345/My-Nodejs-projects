const path=require('path')
const cors=require('cors')
const express=require('express')
const dbConnection=require('./config/database')
const apiError=require('./general/apiError')

const authRoute=require('./routes/authRoute')
const classRoomRoute=require('./routes/classRoomRoute')
const assignmentRouteRoute=require('./routes/assignmentRoute')

const app=express()
dbConnection()

app.use(express.static(path.join(__dirname,'uploads')))
app.use(express.urlencoded({extended:true}))

app.use(express.json())
app.use(cors({origin:"*",methods:"*"}))

app.use('/api/auth',authRoute)
app.use('/api/classRoom',classRoomRoute)
app.use('/api/assignment',assignmentRouteRoute)

app.all("*", (req,res,next)=>{
    next(new apiError(`can't find this route ${req.originalUrl}`,400))
})

app.listen(1000,()=>{
    console.log('server is running ...')
})