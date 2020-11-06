const MyError = require("../../helpers/error/Error");
const jwt = require("jsonwebtoken")
const errorHandler = require("../../helpers/error/errorHandler")
const User = require("../../models/User");

const authorizationControl = function(req,res,next){
    const token = req.headers.authorization.split(" ")[1];
    const {SECRET_KEY} = process.env
    if(!token){
        return next(new MyError("You are not allowed to access",400))
    }
    jwt.verify(token,SECRET_KEY,function(err,decoded){
        if(err){
            return next(new MyError("You are not allowed to access",400))
        }
        req.user = {
            id: decoded.id,
            name : decoded.name
        }
        next()
    })
    
}
const adminControl = errorHandler(async function(req,res,next){
    const id = req.user.id;
    const user = await User.findById(id);

    if(user.role !== "admin"){
        return next(new MyError("You need to be admin for being allowed to do this operation",401))
    }
    next()
})







module.exports = {authorizationControl,adminControl};