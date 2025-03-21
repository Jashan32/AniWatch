import {Router} from "express";
import {animeModel} from "../../db.js";

const ahomeRouter = Router();
ahomeRouter.get("/ahome/:id", async function(req, res){
    const id = req.params.id; 
    const data = await animeModel.findById(id.toString())
    res.json({
        data: data
    })
})

export {
     ahomeRouter
}