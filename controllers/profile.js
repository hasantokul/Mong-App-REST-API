const errorHandler = require("../helpers/error/errorHandler");
const MyError = require("../helpers/error/Error");
const Song = require("../models/Song");
const User = require("../models/User");
const Movie = require("../models/Movie");



const addSong = errorHandler(async function(req,res,next){
    
    const{name,album,singer,date} = req.body;
    const id = req.user.id;
    const song = await Song.create({
        name,
        album,
        singer,
        date,
        user : id
    })

    const user = await User.findById(id)
    
    user.songsList.push(song._id)

    await user.save()
    res
    .status(200)
    .json({
        success : true,
        data : song
    })

})

const deleteSong = errorHandler(async function(req,res,next){
    
    const {song_id} = req.params;

    await Song.findByIdAndDelete(song_id);

    const user = await User.findById(req.user.id);
    user.songsList.remove(song_id);

    await user.save()
    res
    .status(200)
    .json({
        success : true,
        message : "Deleting Successful"
    })
})

const editSong = errorHandler(async function(req,res,next){
    
    const {song_id} = req.params;

    const infos = req.body;
    console.log(infos)    
    const song = await Song.findByIdAndUpdate(song_id,{...infos},{
        
        new : true,
        runValidators : true
    });
    
    res
    .status(200)
    .json({
        success : true,
        message : "Editing Successful",
        data : song
    })
})

const showSongsList =  errorHandler(async function(req,res,next){
    const user = await User.findById(req.user.id).populate(
        {path: "songsList",select : "name singer comments user date likes"}
        
    )
    res
    .status(200)
    .json({
        success: true,
        songsList : user.songsList
    })
})

const addMovie =  errorHandler(async function(req,res,next){
    
    const infos = req.body;
    

    const movie = await Movie.create({
        ...infos,
        user : req.user.id
    })
    const user = await User.findById(req.user.id);

    user.moviesList.push(movie);
    await user.save()
    res
    .status(200)
    .json({
        success: true,
        data: movie
    })
})


const showMoviesList =  errorHandler(async function(req,res,next){
    const user = await User.findById(req.user.id)
    .populate(
        {path: "moviesList",select : "name cast user date likes director"}
    )
    res
    .status(200)
    .json({
        success: true,
        moviesList : user.moviesList
    })
})

const deleteMovie = errorHandler(async function(req,res,next){
    
    const {movie_id} = req.params;

    await Movie.findByIdAndDelete(movie_id);

    const user = await User.findById(req.user.id);
    user.songsList.remove(movie_id);

    await user.save()
    res
    .status(200)
    .json({
        success : true,
        message : "Deleting Successful"
    })
})

const editMovie = errorHandler(async function(req,res,next){
    
    const {movie_id} = req.params;

    const infos = req.body;
    console.log(infos)    
    const movie = await Movie.findByIdAndUpdate(movie_id,{...infos},{
        
        new : true,
        runValidators : true
    });
    
    res
    .status(200)
    .json({
        success : true,
        message : "Editing Successful",
        data : movie
    })
})

module.exports = {
    addSong,
    showSongsList,
    deleteSong,
    editSong,
    addMovie,
    showMoviesList,
    deleteMovie,
    editMovie
};