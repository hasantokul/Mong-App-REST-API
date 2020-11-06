const User = require("../models/User");
const errorHandler = require("../helpers/error/errorHandler")
const MyError = require("../helpers/error/Error");

const deleteUser = errorHandler(async function(req,res,next){
    const {user_id} = req.params;
    await User.findByIdAndDelete(user_id);
    res
    .status(200)
    .json({
        success : true,
        message : "Deleting succesful"
    })

})

const editUser = errorHandler(async function(req,res,next){
    const {user_id} = req.params;
    
    const infos = req.body;
    const user = await User.findByIdAndUpdate(user_id,infos,{
        
        new : true,
        runValidators : true
    });
    res
    .status(200)
    .json({
        success : true,
        message : "Editing succesful",
        data : user
        
    })

})


module.exports = {deleteUser,editUser}