const bcrypt = require("bcryptjs")


const checkPasswordMatches = function(password,hashedPassword){
    const match = bcrypt.compareSync(password,hashedPassword);
    return match
}

const checkInputsExist = function(email,password){
    return email && password
}


module.exports = {
    checkInputsExist,
    checkPasswordMatches
}