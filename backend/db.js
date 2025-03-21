const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { array, string } = require("zod");

const postSchema = new Schema({
    username:String,
    email:String,
    title:String,
    post:String,
    profileImg:String,
    createdAt: { type: Date, default: Date.now }
})

const pImgSchema = new Schema({
    imgs:Array
})

const userSchema = new Schema({
    name : String,
    email: String,
    password: String,
    bookmarked:Array,
    profileImg:String

});

const animeSchema = new Schema({
    title: String,
    description: String,
    imageUrl: String,
    bannerURL: String,
    totalep: Number, 
    type:String,
    avgTime: Number, 
});

const episodeSchema = new mongoose.Schema({

    animeId: { type: mongoose.Schema.Types.ObjectId, ref: "Anime", required: true },
    title: {type: Array},
    vURL_english: Array,
    vUrl_japanese: Array,
    subtitles:Array,

});

const categorySchema = new mongoose.Schema({

    category: String,
    max: Number,
    nData: Array,

})

const animeModel = mongoose.model("anime", animeSchema);
const episodeModel = mongoose.model("episodes", episodeSchema);
const categoryModel = mongoose.model("categories", categorySchema);
const userModel = mongoose.model("users", userSchema)
const pImgModel = mongoose.model("profileimgs", pImgSchema)
const postModel = mongoose.model("post", postSchema)

module.exports = {

    animeModel,
    episodeModel,
    categoryModel,
    userModel,
    pImgModel,
    postModel
}