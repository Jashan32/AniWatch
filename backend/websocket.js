import { WebSocketServer } from "ws"
const JWT_SECRET = process.env.JWT_SECRET;
import jwt from "jsonwebtoken"
import { userModel } from "./db.js";

const sockets =[]

async function sender(email,message,token){

    const user = await userModel.findOne({
        email: email,

    })
    const name = user.name
    const profileImg = user.profileImg
    const data = {name:name,message:message,profileImg:profileImg,token:token}
    console.log(data)
    sockets.map((x)=>x.send(JSON.stringify(data)))

}
export default function wssSetup(){


    const wss = new WebSocketServer({port:8080})
    wss.on("connection", function (socket){
        sockets.push(socket)
    
        console.log("user Connected")
        
        socket.on("message", function(e){
            const res = JSON.parse(e.toString())
            const message = res.message
            const email = jwt.verify(res.token,JWT_SECRET)
            sender(email.email,message,res.token)
            
        })
        socket.on("close", function () {
            console.log("User Disconnected");
            sockets.splice(sockets.indexOf(socket), 1); })
    
    })
}


