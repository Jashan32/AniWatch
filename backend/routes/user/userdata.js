const { Router } = require("express");
const { userModel } = require("../../db")
const userRouter = Router();
const jwt = require('jsonwebtoken');
const jwtSecret = "jwtSecret"

userRouter.get("/data", async (req, res)=>{
    const jwtToken = req.headers.jwttoken
    try {
        const decoded = jwt.verify(jwtToken, jwtSecret);
        const y = decoded.email
        const userdata = await userModel.findOne({
            email: y,
        })
        if(userdata){
            res.json({
                name:userdata.name,
                email:userdata.email,
                profileImg: userdata.profileImg,
            })

        }
        else{
            res.json({
                message:"data not found"
            })
        }

    } catch (err) {
        res.json({
            message:"error at verifing jwt"
        })
    }
})

module.exports = {
    userRouter: userRouter
}