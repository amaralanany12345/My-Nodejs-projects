const express = require('express');
const cors=require('cors')
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
const dbConnection=require('./config/database')
const path=require('path')

dbConnection()

const app = express();
app.use(express.static(path.join(__dirname,'uploads')))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({origin:'*',methods:'*'}))

const userRoute=require('./routes/userRoute')
const categoryRoute=require('./routes/categoryRoute')
const prodcutRoute=require('./routes/prodcutRoute')
const customerroute=require('./routes/customerroute')
const customerCartRoute=require('./routes/customerCartRoute')
const reciepRoute=require('./routes/reciepRoute')

app.use('/api/user',userRoute)
app.use('/api/category',categoryRoute)
app.use('/api/product',prodcutRoute)
app.use('/api/customer',customerroute)
app.use('/api/customerCart',customerCartRoute)
app.use('/api/reciep',reciepRoute)

const { Server } = require('socket.io');
const httpServer = require('http').createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {

});

httpServer.listen(3000, () => {
    console.log('server is running ...');
});
