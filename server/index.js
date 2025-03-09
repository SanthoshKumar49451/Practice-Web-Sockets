import {createServer} from 'http'
import { Server } from 'socket.io'

const httpServer=createServer()
const io=new Server(httpServer,{
    cors:{
        origin:'http://localhost:5173'
    }
})
let crudData=[];

io.on('connection', (socket) => {
    console.log("Client connected");
    
    
    socket.emit('read', crudData);
    
    socket.on('data', (data) => {
        crudData.push(data);
        io.emit('read', crudData);
        console.log(crudData);
    });
})





httpServer.listen(3000,()=>{
    console.log("server running")
})