const express = require("express");
const { homeRouter } = require("./routes/user/home")
const { ahomeRouter } = require("./routes/user/ahome")
const { adminRouter } = require("./routes/admin/admin")
const { watchRouter } = require("./routes/user/watch")
const { loginRouter } = require("./routes/user/login")
const { userRouter } = require("./routes/user/userdata")
const {postRouter} = require("./routes/user/community/community")
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
const { default: wssSetup } = require("./websocket");
app.use(cors());


wssSetup()

app.use("/community", postRouter)
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