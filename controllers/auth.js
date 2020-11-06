const User = require("../models/User");
const errorHandler = require("../helpers/error/errorHandler")
const {sendTokenWithResponse} = require("../helpers/authentication/tokenOperations");
const MyError = require("../helpers/error/Error");
const {checkPasswordMatches,checkInputsExist} = require("../helpers/database/databaseHelpers");
const crypto = require('crypto');
const nodemailer = require("nodemailer");




const register = errorHandler(async function(req,res,next){
    const {name,email,password,role,secretKey} = req.body;

    
    const user = await User.create({
        name,
        email,
        password,
        role,
        secretKey
    })
    sendTokenWithResponse(user,res);
    
})

const login = errorHandler(async function(req,res,next){
    
    const {email,password} = req.body;
    if(!checkInputsExist(email,password)){
        return next(new MyError("Please fill your inputs",400))
    }
    
    const user = await User.findOne({email}).select("+password")

    if(!user || !checkPasswordMatches(password,user.password)){
        return next(new MyError("user doesn't match",400))
    }
    
    
    sendTokenWithResponse(user,res);
    
})

const logout = errorHandler(async function(req,res,next){
    
    res
    .status(200)
    .cookie("token",null,{
        expires : new Date(Date.now()),
        httpOnly:true
    })
    .json({
        success : true,
        message : "Logout Successful"
    })
})

const passwordForgot = errorHandler(async function(req,res,next){
    const {email} = req.body;

    const user = await User.findOne({
        email : email
    })
    
    const algorithm = 'aes-256-ctr';
    const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(user.secretKey), cipher.final()]);

    
    const vector = iv.toString('hex')
    const token = encrypted.toString('hex')
    
    
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your email',
          pass: 'your password'
        }
    });

    const resetPasswordUrl = `http://localhost:<port>/api/auth/passwordreset?encryptedToken=${token}&vector=${vector}`;



    const emailTemplate = `
        
        <p>In this <a href = '${resetPasswordUrl}' target = '_blank'>link</a> you can access your temporary token</p>
        
    `

    var mailOptions = {
        from: 'your email',
        to: email,
        subject: 'Reset Password',
        html: emailTemplate
      };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return next(new MyError("Email could not be sent"))
        } 
    })


    res
    .status(200)
    .json({
        success : true,
        message : "email is sended check !"
    })
})


const passwordReset = errorHandler(async function(req,res,next){

    const {encryptedToken,vector} = req.params;
    const password = req.body;
    console.log(encryptedToken)
    
    const algorithm = 'aes-256-ctr';
    const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
    
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(vector, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(encryptedToken, 'hex')), decipher.final()]);

    decryptedKey = decrpyted.toString();

    const user = await User.findOne({
        secretKey : decryptedKey
    })
    console.log(user)
    user.password = password;
    await user.save()
    res
    .status(200)
    .json({
        success : true,
        message : "The password has been changed"
    })
    
})



module.exports = {register,login,logout,passwordForgot,passwordReset}

