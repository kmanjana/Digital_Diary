const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DigitalDiary');

const Post = mongoose.model('Post', {
    UserID : String,
    title: {
        type: String,
        required: true
    },
    category : String


    // content: {
    //     type: String,
    //     required: true
    // },
    // imagePath: { 
    //     type: String,
    //      required: true 
    //     },
    
    // postDate: {
    //         type: String,
    //         required: true
    //     },

    //     creator: { type: mongoose.Schema.Types.ObjectId,
    //          ref: "User", 
    //          required: true }
});


module.exports = Post