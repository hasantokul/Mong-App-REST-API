const User = require("../models/User");
const errorHandler = require("../helpers/error/errorHandler")


const getUsers = errorHandler(async function(req,res,next){
    const users = await User.find().populate({path : "songsList moviesList",select : "name"})
    return res
    .status(200)
    .json({
        success : true,
        users : users
    })
})

const goProfilePage = errorHandler(async function(req,res,next){
    const id = req.user.id;

    const user = await User.findById(id).populate({path : "songsList moviesList",select : "name"})
    

    res
    .status(200)
    .json({
        success : true,
        profile_page : user
    })
})

const goUsersProfile = errorHandler(async function(req,res,next){
    const {user_id} = req.params;

    const user = await User.findById(user_id)
    .populate({path : "songsList moviesList",select : "name "})
    .populate("-secretKey")
    
    res
    .status(200)
    .json({
        success : true,
        profile_page : user
    })
})

module.exports = {getUsers,goProfilePage,goUsersProfile};