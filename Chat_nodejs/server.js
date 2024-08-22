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
const authRoute=require('./routes/authRoute')
const chatRoute=require('./routes/chatRoute')
const messageRoute=require('./routes/messageRoute')
const groupRoute=require('./routes/groupRoute')

app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/chat',chatRoute)
app.use('/api/message',messageRoute)
app.use('/api/group',groupRoute)

const { Server } = require('socket.io');
const userModel = require('./models/userModel');
const httpServer = require('http').createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
    
    socket.on('messages', (recieveData) => {
        io.emit('messages', recieveData);
    });

    socket.on('new message', (sendedData) => {
        io.emit('new message', sendedData);
    });

    socket.on('group messages', (newData) => {
        io.emit('group messages', newData);
    });

    socket.on('new group messages', (sendedData) => {
        io.emit('new group message', sendedData);

    });

});

httpServer.listen(3000, () => {
    console.log('server is running ...');
});
