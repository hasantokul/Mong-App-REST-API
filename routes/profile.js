const express = require("express");
const router = express.Router({mergeParams:true})
const {addSong,showSongsList,deleteSong,editSong,addMovie,showMoviesList,deleteMovie,editMovie} = require("../controllers/profile");
const {authorizationControl} = require("../middlewares/authentication/authentication");
const {songOwnerControl,movieOwnerControl} = require("../middlewares/owner/ownerControl");


router.post("/addsong",authorizationControl,addSong);
router.get("/songs",authorizationControl,showSongsList);
router.delete("/song/delete/:song_id",[authorizationControl,songOwnerControl],deleteSong);
router.put("/song/edit/:song_id",[authorizationControl,songOwnerControl],editSong);
router.post("/addmovie",authorizationControl,addMovie);
router.get("/movies",authorizationControl,showMoviesList);
router.delete("/movie/delete/:movie_id",[authorizationControl,movieOwnerControl],deleteMovie);
router.put("/movie/edit/:movie_id",[authorizationControl,movieOwnerControl],editMovie);




module.exports = router;