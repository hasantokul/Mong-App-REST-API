const MyError = require("../../helpers/error/Error")

const errorHandling = (err,req,res,next) => {
    
    const error = new MyError(err.message,err.status);
    
    console.log(err);
    
    return res.status(error.status).json({
        success : false,
        message : error.message 
    });
    
}

module.exports = {errorHandling};