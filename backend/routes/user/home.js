import { Router } from "express";
import { categoryModel, animeModel } from "../../db.js";
const homeRouter = Router();

homeRouter.get("/slider", async function (req, res) {

    const sliderArray = await categoryModel.findOne({ category: "spotlight" });
    const nData = sliderArray.nData
    const animedata = []

    await Promise.all(
        nData.map(async (x) => {
            animedata.push(await animeModel.findById(x.toString()))
        })
    )
    res.json({
        sliderArray: animedata
    })

})

homeRouter.get("/trendingList", async function (req, res) {

    const sliderArray = await categoryModel.findOne({ category: "trending" });
    const nData = sliderArray.nData
    const animedata = []

    await Promise.all(
        nData.map(async (x) => {
            animedata.push(await animeModel.findById(x.toString()))
        })
    )

    res.json({
        sliderArray: animedata
    })

})

homeRouter.get("/ctGrid", async function (req, res) {

    const top_airingData = []
    const most_popularData = []
    const most_favoriteData = []
    const latest_completedData = []

    const top_airing = await categoryModel.findOne({ category: "top_airing" });
    const nData1 = top_airing.nData

    await Promise.all(
        nData1.map(async (x) => {
            top_airingData.push(await animeModel.findById(x.toString()))
        })
    )

    const most_popular = await categoryModel.findOne({ category: "most_popular" });
    const nData2 = most_popular.nData

    await Promise.all(
        nData2.map(async (x) => {
            most_popularData.push(await animeModel.findById(x.toString()))
        })
    )

    const most_favorite = await categoryModel.findOne({ category: "most_favorite" });
    const nData3 = most_favorite.nData

    await Promise.all(
        nData3.map(async (x) => {
            most_favoriteData.push(await animeModel.findById(x.toString()))
        })
    )

    const latest_completed = await categoryModel.findOne({ category: "latest_completed" });
    const nData4 = latest_completed.nData

    await Promise.all(
        nData4.map(async (x) => {
            latest_completedData.push(await animeModel.findById(x.toString()))
        })
    )

    const resdata = {
        top_airingData: top_airingData,
        most_popularData: most_popularData,
        most_favoriteData: most_favoriteData,
        latest_completedData: latest_completedData
    }
    res.json({

        top_airing: top_airingData,
        most_popular: most_popularData,
        most_favorite: most_favoriteData,
        latest_completed: latest_completedData

    })

})


homeRouter.get("/category", async (req, res) => {
    try{

        const category = req.headers.category
        console.log(category)
    
        const latest_completed = await categoryModel.findOne({ category: category });
        const nData1 = latest_completed.nData;
    
        const categorydata = await Promise.all(
            nData1.map(async (x) => await animeModel.findById(x.toString()))
        );
    
        res.json({
            categorydata: categorydata
        })
    }
    catch(e){
        res.json({
            message:e
        })
    }

})


export  {homeRouter}