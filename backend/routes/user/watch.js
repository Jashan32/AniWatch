import {Router} from "express";
import {episodeModel , animeModel} from "../../db.js";
const watchRouter = Router();

watchRouter.get("/watch/:id", async function(req, res){
    const id = req.params.id; 
    const response = await episodeModel.findOne({animeId:id})

    res.json({
        data: response
    })
})

watchRouter.get("/search/:id", async function(req, res){
    const id = req.params.id;
    const resp = await animeModel.find(
        { title: { $regex: id, $options: "i" } }
      )
      res.json({
        data: resp
      })
})

export  {
     watchRouter
}