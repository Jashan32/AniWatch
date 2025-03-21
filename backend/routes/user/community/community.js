import { Router } from "express";
import { postModel, userModel } from "../../../db.js";
const postRouter = Router();
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

postRouter.post("/post", async (req, res) => {
    try {
        const token = req.headers.token
        const title = req.headers.title
        const post = req.headers.post
        const category = req.headers.category
        let gotMail = jwt.verify(token, JWT_SECRET)
        gotMail = gotMail.email
        const userdata = await userModel.findOne({ email: gotMail })

        if (userdata) {
            const name = userdata.name
            const profileImg = userdata.profileImg
            const x = await postModel.create({
                username: name,
                email: gotMail,
                title: title,
                post: post,
                profileImg: profileImg,
                category:category

            })
            res.json("message:done")
        }
    }
    catch (e) {
        res.json(e);
    }


})

postRouter.get("/getpost", async (req, res) => {
    try {
        const posts = await postModel.find().limit(10)
        res.json({ data: posts })
    }
    catch (e) {
        res.json({ message: e })
    }
})

export {
   postRouter
}