import { Router } from "express";
import { userModel, pImgModel } from "../../db.js";
const loginRouter = Router();
const registerRouter = Router();
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
const reCaptchaSecret = RECAPTCHA_SECRET
const JWT_SECRET = process.env.JWT_SECRET;

loginRouter.post("/login", async function (req, res) {

    const token = req.body.token
    const email = req.body.email
    const password = req.body.password

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            secret: reCaptchaSecret,
            response: token,
        }),
    });
    const data = await response.json();

    if (data.success) {
        const user = await userModel.findOne({
            email: email,
        })
        if (user) {
            const storedPass = user.password;
            bcrypt.compare(password, storedPass, (err, isMatch) => {
                if (err) {
                    return;
                }

                if (isMatch) {

                    const jwtToken = jwt.sign({
                        email
                    }, JWT_SECRET)
                    res.json({
                        message: "login_sucessfull",
                        jwtToken: "\\" + jwtToken + "\\"
                    })
                } else {
                    res.json({
                        message: "Invalid email or password"
                    })
                }
            });
        }
        else {
            res.json({
                message: "User does not exist"
            })
        }
    }
    else {
        res.json({
            message: "captcha_failed"
        })
    }
})

registerRouter.post("/register", async function (req, res) {


    const requiredbody = z.object({
        token: z.string({ message: "Token is required" }),
        email: z.string().email({ message: "Invalid email format" }),
        name: z.string().max(35, { message: "Name must be 35 characters or less" }),
        password: z
            .string()
            .min(5, { message: "Password must be at least 5 characters" })
            .max(15, { message: "Password cannot be more than 15 characters" }),
    });

    const token = req.body.token
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password
    const hashedPass = await bcrypt.hash(password, 1)

    const reqBody = {
        token: req.body.token,
        email: req.body.email,
        name: req.body.name,
        password: password

    }

    const parsedReq = requiredbody.safeParse(reqBody)

    if (parsedReq.success) {
        const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                secret: reCaptchaSecret,
                response: token,
            }),
        });
        const data = await response.json();

        if (data.success) {
            const user = await userModel.findOne({
                email: email,

            })
            if (user) {
                res.json({
                    message: "email_elredy_exist"
                })
            }
            else {
                const imgData = await pImgModel.findById("67b35637feae7881443b748c")
                const imgData2 = imgData.imgs
                const imgLength = imgData2.length
                const imgNum = Math.floor(Math.random() * imgLength)
                const profileImg = imgData2[imgNum]

                const resp = await userModel.create({
                    name: name,
                    email: email,
                    password: hashedPass,
                    bookmarked: [],
                    profileImg: profileImg
                })
                const jwtToken = jwt.sign({
                    email
                }, JWT_SECRET)


                res.json({
                    message: "registered_sucessfully",
                    jwtToken: "\\" + jwtToken + "\\"
                })

            }
        }
        else {
            res.json({
                message: "captcha_failed"
            })
        }
    }
    else {

        const data2 = parsedReq.error.errors
        res.json({
            message: data2[0].message
        })
    }
})

export {
    loginRouter,
    registerRouter
}