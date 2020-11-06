const express = require("express");
const router = express.Router()
const {authorizationControl} = require("../middlewares/authentication/authentication");

const {likeSong,listAllSongs,getSingleSong,commentSong} = require("../controllers/song")

router.get("/all",listAllSongs)
router.get("/like/:song_id",authorizationControl,likeSong)
router.get("/:song_id",authorizationControl,getSingleSong)
router.put("/:song_id/comment",authorizationControl,commentSong)



module.exports = router;