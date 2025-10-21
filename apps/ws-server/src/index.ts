import {WebSocketServer} from "ws";
import {prisma} from "@repo/db"


const wss = new WebSocketServer({port:3001});

wss.on("connection",async(socket)=>{
    console.log("New client connection ");

    const user = await prisma.user.create({
        data:{
            Username:"Murali2",
            email:"muralisudireddy@gmail.com",
            password:"rakvnj"
        }
    })

    socket.send(JSON.stringify({
        message:"Hi there ! welcome to socket connection",userId :user.id
    }))

    socket.on("message",(msg)=>{
        console.log('Reveived":',msg.toString());
        socket.send(`server received ${msg.toString()}`)
    })

    socket.on("close",()=>{
        console.log("connection closed")
    })
})

console.log("WebSocket server running on ws://localhost:3001");