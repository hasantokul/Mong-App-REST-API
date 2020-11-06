const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    name : {
        type: String,
        required: [true,"Please enter the name of the movie"]
    },
    director : {
        type: String,
        default : "unknown"
    },
    cast : {
        type : String,
        required : [true,"Please enter the cast"]
    },
    date : {
        type : Number,
        required : [true,"PLease enter the date of the movie"]
    },
    likes : [
        {
            type : mongoose.Types.ObjectId,
            ref : "User"
        }
    ],
    comments : [
        {
            type : mongoose.Types.ObjectId,
            ref : "Comment"
        }
    ],
    user : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    }
})


module.exports = mongoose.model("Movie",MovieSchema);