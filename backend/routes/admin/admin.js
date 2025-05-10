import { Router } from "express";
import { animeModel, episodeModel, categoryModel } from "../../db.js";
const adminRouter = Router();
import admin from "../../middleware/admin.js";
adminRouter.use(admin);

adminRouter.get("/verify", async function (req, res) {
    res.json({
        message: "verified"
    })
})
    
adminRouter.post("/new-anime", async function (req, res) {
    const { title, description, imageUrl, bannerURL, avgTime, type } = req.body;
    const avgTimeInt = parseInt(avgTime)
    const alredyExist = await animeModel.findOne({ title: title });

    if (alredyExist) {
        res.json({
            message: "anime alredy exist"
        })
    }
    else {

        const course = await animeModel.create({
            title: title,
            description: description,
            imageUrl: imageUrl,
            bannerURL: bannerURL,
            totalep: 0,
            type: type,

            avgTime: avgTimeInt,
        }).then(
            res.json({
                message: "done"
            })
        )
    }
})

adminRouter.post("/new-episode", async function (req, res) {

    const { title, ep_title, vURL_english, vUrl_japanese, subtitles } = req.body;

    const anime = await animeModel.findOne({ title: title });
    const animeEp = await episodeModel.findOne({ animeId: anime._id });


    if (!anime) {
        res.json({
            message: "anime list not Found"
        })
    }
    else if (!animeEp) {
        const newEpisode = await episodeModel.create({
            animeId: anime._id,
            title: [ep_title],
            vURL_english: [vURL_english],
            vUrl_japanese: [vUrl_japanese],
            subtitles: [subtitles]

        });

    }
    else {
        const titleArray = animeEp.title
        const vURL_english_array = animeEp.vURL_english
        const vUrl_japanese_array = animeEp.vUrl_japanese
        const subtitlesArray = animeEp.subtitles

        if (titleArray.includes(ep_title)) {
            res.json({
                message: "episode title alredy exist"
            }
            )
        }
        else if (vURL_english_array.includes(vURL_english)) {
            res.json({
                message: "English video's Url alredy exist"
            })
        }
        else if (vUrl_japanese_array.includes(vUrl_japanese)) {
            res.json({
                message: "japanese video's Url alredy exist"
            })
        }
        else if (subtitlesArray.includes(subtitles)) {
            res.json({
                message: "subtitle's Url alredy exist"
            })
        }
        else {

            let tarray = animeEp.title
            tarray.push(ep_title)
            let varray_english = animeEp.vURL_english
            varray_english.push(vURL_english)
            let varray_japanese = animeEp.vUrl_japanese
            varray_japanese.push(vUrl_japanese)
            let sArray = animeEp.subtitles
            sArray.push(subtitles)

            const updatedUser = await episodeModel.findOneAndUpdate(
                { animeId: anime._id },   // Filter condition (replace "Some Title" with your criteria)
                {
                    $set: {
                        title: tarray,
                        subtitles: sArray,
                        vURL_english: varray_english,
                        vUrl_japanese: varray_japanese,
                    }
                }, // Fields to update
                { new: true }               // Return the updated document
            );
        }

    }

})

adminRouter.post("/set-tag", async function (req, res) {

    const { titleArray, tag } = req.body;

    let aName
    let status = true
    let errorName

    let idArray = []

    await Promise.all(
        titleArray.map(async (a) => {

            aName = await animeModel.findOne({ title: a });
            if (!aName) {
                errorName = a
                status = false
            }
            else {
                idArray.push(aName._id.toString())


            }
        })
    )

    if (status == false) {
        res.json({
            message: `Error: ${errorName} is not present in database`
        })
    }
    else {

        const catData = await categoryModel.findOne({ category: tag })
        const maxLength = catData.max;
        if (maxLength < idArray.length) {
            res.json({
                message: "max length of array reacjed"
            })
        }
        else {

            const updatedUser = await categoryModel.findOneAndUpdate(
                { category: tag },
                {
                    $set: {
                        nData: idArray
                    }
                },
                { new: true }
            );
        }
    }
})

adminRouter.get("/get-tag", async function (req, res) {
    const value = req.header("category_name");
    const givenCategory = await categoryModel.findOne({ category: value });

    if (!givenCategory) {
        return
    }
    if (givenCategory.nData.length == 0) {
        return
    }
    const cArray = givenCategory.nData;
    const aName = []
    let animedata
    let animename
    await Promise.all(
        cArray.map(async (a) => {
            animedata = await animeModel.findById(a.toString()),
                animename = animedata.title,
                aName.push(animename)


        })
    )

    if (!givenCategory) {
        res.json({
            message: "not Found"
        })
        return;
    }
    else {
        res.json({
            array: aName
        })
    }
})
export {
    adminRouter
}