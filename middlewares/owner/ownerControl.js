const errorHandler = require("../../helpers/error/errorHandler");
const MyError = require("../../helpers/error/Error");
const Song = require("../../models/Song");
const Movie = require("../../models/Movie");

const songOwnerControl = errorHandler(async function(req,res,next){
    const {song_id} = req.params;
    const song = await Song.findById(song_id)
    if(!song){
        return next(new MyError("There is no song with this id",400))

    }
    
    if(song.user != req.user.id){
        return next(new MyError("This song doesn't belong to you, you can't do this operation",403))
    }
    next()
})

const movieOwnerControl = errorHandler(async function(req,res,next){
    const {movie_id} = req.params;
    const movie = await Movie.findById(movie_id)
    if(!movie){
        return next(new MyError("There is no movie with this id",400))

    }
    
    if(movie.user != req.user.id){
        return next(new MyError("This song doesn't belong to you, you can't do this operation",403))
    }
    next()
})

module.exports = {songOwnerControl,movieOwnerControl};