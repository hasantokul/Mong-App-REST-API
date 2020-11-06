const express = require("express");
const router = express.Router()
const {listAllMovies,likeMovie,getMovieWithDetails,commentMovie} = require("../controllers/movie");
const {authorizationControl} = require("../middlewares/authentication/authentication");


router.get("/all",listAllMovies);
router.get("/like/:movie_id",authorizationControl,likeMovie)
router.get("/:movie_id",authorizationControl,getMovieWithDetails)
router.put("/:movie_id/comment",authorizationControl,commentMovie)


module.exports = router;