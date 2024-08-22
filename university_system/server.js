const path=require('path')
const cors=require('cors')
const express=require('express')
const dbConnection=require('./config/database')
const apiError=require('./general/apiError')
dbConnection()


const app=express()

app.use(express.static(path.join(__dirname,'uploads')))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({origin:'*',methods:'*'}))

const authRoute=require('./routes/authRoute')
const subjectRoute=require('./routes/subjectroute')
const attendanceRoute=require('./routes/attendanceRoute')
const warningRoute=require('./routes/warningRoute')
const hieraricalSubjectRoute=require('./routes/hieraricalSubjectRoute')
const classWorkroute=require('./routes/classWorkroute')
const semesterRoute=require('./routes/semesterRoute')

app.use('/api/auth',authRoute)
app.use('/api/subject',subjectRoute)
app.use('/api/attendance',attendanceRoute)
app.use('/api/warning',warningRoute)
app.use('/api/hierarical',hieraricalSubjectRoute)
app.use('/api/classWork',classWorkroute)
app.use('/api/semester',semesterRoute)

app.all("*", (req,res,next)=>{
    next(new apiError(`can't find this route ${req.originalUrl}`,400))
})

app.listen(1234,()=>{
    console.log('server is running ...')
})