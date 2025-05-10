import jwt from "jsonwebtoken";
import { adminModel } from "../db.js";

export default async function admin(req, res, next) {
    if (req.method === "POST") {
        const token = req.body.jwttoken;
        const emailData = jwt.verify(token, process.env.JWT_SECRET);
        const email = emailData.email;
        const data = await adminModel.findOne({ email: email } )
            if (!data) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            req.user = data;
            next();
        
    }
    else if (req.method === "GET") {
        const token  = req.headers.jwttoken;
        const emailData = jwt.verify(token, process.env.JWT_SECRET);
        const email = emailData.email;
        const data = await adminModel.findOne({ email: email } )
        if (!data) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = data;
        next();

    }
    else {
        res.status(405).json({ error: "Method not allowed" });
    }
}