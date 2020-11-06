const errorHandler = require("../helpers/error/errorHandler");
const MyError = require("../helpers/error/Error");
const Movie = require("../models/Movie");
const User = require("../models/User");
const Comment = require("../models/Comment")

const listAllMovies = errorHandler(async function(req,res,next){
    const movies = await Movie.find().populate({path: "user",select: "name"})

    res
    .status(200)
    .json({
        success : true,
        movies : movies
    })
})

const likeMovie = errorHandler(async function(req,res,next){
    const {movie_id} = req.params;
    const id = req.user.id;
    const movie = await Movie.findById(movie_id);
    if(movie.likes.includes(id)){
        return next(new MyError("You have already liked this movie",400))
    }
    movie.likes.push(id);

    await movie.save()
    res
    .status(200)
    .json({
        success : true,
        data : movie
    })
})

const commentMovie = errorHandler(async function(req,res,next){
    const {movie_id} = req.params;
    const content = req.body;
    const comment = await Comment.create({
        ...content,
        user : req.user.id,
        movie: movie_id
    })
    const movie = await Movie.findById(movie_id).populate({path: "comments",select: "content user"})
    movie.comments.push(comment)

    await movie.save();

    res
    .status(200)
    .json({
        success : true,
        movie : movie
    })
})

const getMovieWithDetails = errorHandler(async function(req,res,next){
    const {movie_id} = req.params;
    const movie = await Movie.findById(movie_id).populate([
        {path: "comments",select: "content" ,populate:{path: "user",select: "name"}},
        {path: "likes",select: "name"},
        {path: "user",select: "name"}
    ])
    res
    .status(200)
    .json({
        success: true,
        movie : movie
    })
})


module.exports = {listAllMovies,likeMovie,getMovieWithDetails,commentMovie};
