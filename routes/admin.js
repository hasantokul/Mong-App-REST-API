const express = require("express");
const router = express.Router()
const {authorizationControl,adminControl} = require("../middlewares/authentication/authentication")
const {deleteUser,editUser} = require("../controllers/admin")

router.delete("/user/delete/:user_id",[authorizationControl,adminControl],deleteUser);
router.put("/user/edit/:user_id",[authorizationControl,adminControl],editUser);





module.exports = router;