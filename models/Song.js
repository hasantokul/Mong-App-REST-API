const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    
    name : {
        type: String,
        required : [true,"Please write the name of the song"],
        
    },
    album : {
        type : String,
        default : "unknown"
    },
    singer : {
        type : String,
        required : [true,"Please enter the singer who the song belongs"]
    },
    date : {
        type : String,
        default : "unknown"
    },
    
    likes : [
        {
            type : mongoose.Types.ObjectId,
            ref : "User",
            
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




module.exports = mongoose.model("Song",SongSchema);