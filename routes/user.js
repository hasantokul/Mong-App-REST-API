const express = require("express");
const router = express.Router();
const {getUsers,goProfilePage,goUsersProfile} = require("../controllers/user");
const {authorizationControl} = require("../middlewares/authentication/authentication");
const profile = require("./profile");


router.get("/users",getUsers);
router.get("/profile",authorizationControl,goProfilePage);
router.get("/:user_id/profile",authorizationControl,goUsersProfile)
router.use("/profile",profile);






module.exports = router;