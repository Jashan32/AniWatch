const {Router} = require("express");
const {animeModel} = require("../../db");

const ahomeRouter = Router();
ahomeRouter.get("/ahome/:id", async function(req, res){
    const id = req.params.id; 
    const data = await animeModel.findById(id.toString())
    res.json({
        data: data
    })
})

module.exports = {
    ahomeRouter: ahomeRouter
}