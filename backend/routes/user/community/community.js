const { Router } = require("express");
const { postModel, userModel } = require("../../../db")
const postRouter = Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

postRouter.post("/post", async (req, res)=>{
    try{
        const token = req.headers.token
        const title = req.headers.title
        const post = req.headers.post
        let gotMail = jwt.verify(token,JWT_SECRET)
        gotMail = gotMail.email
        const userdata = userModel.findOne({email:gotMail})

        if(userdata){
            const name = userdata.name
            const profileImg = userdata.profileImg
            const x = postModel.create({
                name:name,
                email:gotMail,
                title:title,
                post:post,
                profileImg:profileImg
    
            })
            res.json("message:done")
        }
    }
    catch(e){res.json(e)}


})
module.exports={
    postRouter : postRouter
}