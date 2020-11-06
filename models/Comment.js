const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content : {
        type : String,
        required : [true,"Please write a comment"]
    },
    user : {
        type: mongoose.Types.ObjectId,
        ref : "User"
    },
    date : {
        type: Date,
        default: Date.now
    },
    song: {
        type: mongoose.Types.ObjectId,
        ref : "Song"
    },
    movie: {
        type: mongoose.Types.ObjectId,
        ref : "Movie"
    }
})

module.exports = mongoose.model("Comment",CommentSchema);