const express = require("express");
const router = express.Router();
const {register,login,logout,passwordForgot,passwordReset} = require("../controllers/auth");
const {authorizationControl} = require("../middlewares/authentication/authentication")

router.post("/register",register);
router.post("/login",login)
router.get("/logout",authorizationControl,logout);
router.get("/passwordforgot",passwordForgot);
router.put("/passwordreset",passwordReset);







module.exports = router;
