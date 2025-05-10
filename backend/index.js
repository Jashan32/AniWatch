import express from "express";
import {homeRouter} from "./routes/user/home.js"
import {ahomeRouter} from "./routes/user/ahome.js"
import {adminRouter} from "./routes/admin/admin.js"
import {watchRouter} from "./routes/user/watch.js"
import {loginRouter} from "./routes/user/login.js"
import {userRouter} from "./routes/user/userdata.js"
import {postRouter} from "./routes/user/community/community.js"
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const app = express();
app.use(express.json());
import mongoose from "mongoose";
import cors from 'cors';
import {registerRouter} from "./routes/user/login.js";
import wssSetup from "./websocket.js";
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
