const express = require("express");
const { WebSocketServer} = require("ws");
const { homeRouter } = require("./routes/user/home")
const { ahomeRouter } = require("./routes/user/ahome")
const { adminRouter } = require("./routes/admin/admin")
const { watchRouter } = require("./routes/user/watch")
const { loginRouter } = require("./routes/user/login")
const { userRouter } = require("./routes/user/userdata")
require('dotenv').config(); 
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const { userModel } = require("./db")
const jwt = require('jsonwebtoken');
const jwtSecret = JWT_SECRET



const cors = require('cors');
const { registerRouter } = require("./routes/user/login");
app.use(cors());

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

const wss = new WebSocketServer({port:8080})
wss.on("connection", function (socket){
    sockets.push(socket)

    console.log("user Connected")
    
    socket.on("message", function(e){
        const res = JSON.parse(e.toString())
        const message = res.message
        const email = jwt.verify(res.token,jwtSecret)
        sender(email.email,message,res.token)
        
    })
    socket.on("close", function () {
        console.log("User Disconnected");
        sockets.splice(sockets.indexOf(socket), 1); })

})

app.use("/user/login", loginRouter)
app.use("/user/login", registerRouter)
app.use("/admin", adminRouter)
app.use("/user/home", homeRouter)
app.use("/user/ahome", ahomeRouter)
app.use("/user/watch", watchRouter)
app.use("/user", userRouter)

async function main() {
    await mongoose.connect(MONGO_URI)
    app.listen(PORT);
    console.log(`listening on port ${PORT}`)
}

main()