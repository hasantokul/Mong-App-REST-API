const express = require("express");
const router = express.Router();
const auth = require("./auth")
const admin = require("./admin")
const user = require("./user")
const song = require("./song")
const movie = require("./movie")

router.use("/auth",auth);
router.use("/admin",admin);
router.use("/user",user);
router.use("/song",song);
router.use("/movie",movie);










module.exports = router;
