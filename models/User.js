const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    
    name : {
        type: String,
        required : [true,"Please write a name"],

    },
    email : {
        type : String,
        required : [true,"Please write a email"],
        unique : true,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
            
          } 
    },
    secretKey : {
        type : String,
        required : [true,"Please write your secret keyword"],
        unique : true,
        hide : true

    },
    role : {
        type : String,
        default : "user"
    },
    password : {
        type : String,
        required : [true,"Please write a password"],
        minlength : [8,"Password needs to be at least with 8 characters"],
        select : false
    },
    createdDate : {
        type : Date,
        default : Date.now
    },
    passwordToken:{
        type : String
    },
    songsList : [
        {
            type : mongoose.Types.ObjectId,
            ref : "Song"
            
        }
    ],
    moviesList : [
        {
            type : mongoose.Types.ObjectId,
            ref : "Movie"
            
        }
    ]
})

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.produceTokenFromUser = function(next){
    const data = {
        id : this._id,
        name : this.name
    }
    const {SECRET_KEY,JWT_EXPIRY} = process.env;
    const token = jwt.sign(
        data,
        SECRET_KEY,
        {expiresIn: JWT_EXPIRY}
    );
    return token
}




module.exports = mongoose.model("User",UserSchema)