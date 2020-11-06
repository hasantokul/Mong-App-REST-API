const errorHandler = require("../helpers/error/errorHandler");
const MyError = require("../helpers/error/Error");
const Song = require("../models/Song");
const User = require("../models/User");
const Comment = require("../models/Comment");


const listAllSongs = errorHandler(async function(req,res,next){
    const songs = await Song.find();
    res
    .status(200)
    .json({
        success: true,
        songs : songs
    })
})


const likeSong = errorHandler(async function(req,res,next){
    const {song_id} = req.params;
    const user_id = req.user.id;

    const song = await Song.findById(song_id);

    if(song.likes.includes(user_id)){
        return next(new MyError("You have already liked this song",400))
    }
    song.likes.push(user_id);
    await song.save();
    
    res
    .status(200)
    .json({
        success : true,
        data : song
    });
});

const getSingleSong = errorHandler(async function(req,res,next){
    const {song_id} = req.params;
    const song = await Song.findById(song_id).populate([
        {path: "comments",select: "content" ,populate:{path: "user",select: "name"}},
        {path: "likes",select: "name"},
        {path: "user",select: "name"}
    ])

    res
    .status(200)
    .json({
        success : true,
        song : song
    });
});

const commentSong = errorHandler(async function(req,res,next){
    const {song_id} = req.params;
    const content = req.body;
    const comment = await Comment.create({
        ...content,
        user : req.user.id,
        song: song_id
    })
    const song = await Song.findById(song_id).populate({path: "comments",select: "content user"})
    song.comments.push(comment)

    await song.save();

    res
    .status(200)
    .json({
        success : true,
        song : song
    })
})



module.exports = {likeSong,listAllSongs,getSingleSong,commentSong};