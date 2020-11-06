const sendTokenWithResponse = (user,res) => {
    const {COOKIE_EXPIRY} = process.env;
    
    const token = user.produceTokenFromUser()
    
    res
    .status(201)
    .cookie("token", token, {
        expires : new Date(Date.now() * parseInt(COOKIE_EXPIRY) * 1000 * 60),
        httpOnly: true
        
    })
    .json({
        success : true,
        data : {
            name : user.name,
            email : user.email,
            role : user.role
        },
        token : token
    })
    
}


module.exports = {sendTokenWithResponse}