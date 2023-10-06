const mongoose = require('mongoose');

exports.connect = async() => {
    try {
        await mongoose.connect('mongodb+srv://albertocansey582:GpejiMq0M201qT6s@cluster0.cpscziy.mongodb.net/live_chat?retryWrites=true&w=majority')
    } catch (error) {
        console.log(error)
    }
}