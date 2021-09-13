const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DigitalDiary');

const User = mongoose.model('User', {
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },

    // password: {
    //     type: String,
    //     required: true
    // },
    username: String
});


module.exports = User